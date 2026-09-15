const { onDocumentCreated, onDocumentUpdated } = require("firebase-functions/v2/firestore");
const { setGlobalOptions } = require("firebase-functions/v2");
const admin = require("firebase-admin");
admin.initializeApp();

// Configuration globale pour utiliser l'Europe (évite les erreurs de régions croisées)
setGlobalOptions({ region: "europe-west1" });

exports.onAnnouncementCreated = onDocumentCreated("announcements/{annonceId}", async (event) => {
  const snap = event.data;
  if (!snap) return;
  
  const annonce = snap.data();
    console.log("Nouvelle annonce détectée :", annonce.title);

    const db = admin.firestore();
    const target = annonce.target;
    
    let tokens = [];

    // Récupérer les utilisateurs concernés selon la cible
    try {
      if (target === "all") {
        const usersSnap = await db.collection("users").get();
        usersSnap.forEach(doc => {
          const user = doc.data();
          if (user.fcmTokens && Array.isArray(user.fcmTokens)) {
            tokens.push(...user.fcmTokens);
          }
        });
      } else if (target === "parents") {
        const usersSnap = await db.collection("users").where("role", "==", "parent").get();
        usersSnap.forEach(doc => {
          const user = doc.data();
          if (user.fcmTokens && Array.isArray(user.fcmTokens)) {
            tokens.push(...user.fcmTokens);
          }
        });
      } else if (target === "profs") {
        const usersSnap = await db.collection("users").where("role", "==", "prof").get();
        usersSnap.forEach(doc => {
          const user = doc.data();
          if (user.fcmTokens && Array.isArray(user.fcmTokens)) {
            tokens.push(...user.fcmTokens);
          }
        });
      } else if (target.startsWith("prof_course_")) {
        const courseId = target.replace("prof_course_", "");
        
        // 1. Trouver les profs de ce cours
        const profsSnap = await db.collection("users").where("role", "==", "prof").get();
        profsSnap.forEach(doc => {
          const u = doc.data();
          if (u.courseIds && (u.courseIds.includes(courseId) || u.courseIds.includes(Number(courseId)))) {
            if (u.fcmTokens) tokens.push(...u.fcmTokens);
          }
        });
      } else if (target.startsWith("course_")) {
        const courseId = target.replace("course_", "");
        
        // 1. Trouver les profs de ce cours
        const profsSnap = await db.collection("users").where("role", "==", "prof").get();
        profsSnap.forEach(doc => {
          const u = doc.data();
          if (u.courseIds && (u.courseIds.includes(courseId) || u.courseIds.includes(Number(courseId)))) {
            if (u.fcmTokens) tokens.push(...u.fcmTokens);
          }
        });

        // 2. Trouver les élèves de ce cours (pour alerter leurs parents)
        const studentsSnap = await db.collection("students").where("courseIds", "array-contains", Number(courseId)).get();
        const studentIds = [];
        studentsSnap.forEach(doc => studentIds.push(doc.id));
        
        // On récupère aussi les cours sous forme de string car parfois ils sont enregistrés en string
        const studentsSnap2 = await db.collection("students").where("courseIds", "array-contains", courseId).get();
        studentsSnap2.forEach(doc => {
          if (!studentIds.includes(doc.id)) studentIds.push(doc.id);
        });

        // 3. Trouver les parents de ces élèves
        if (studentIds.length > 0) {
          const parentsSnap = await db.collection("users").where("role", "==", "parent").get();
          parentsSnap.forEach(doc => {
            const u = doc.data();
            if (u.childrenIds && u.childrenIds.some(cid => studentIds.includes(String(cid)))) {
              if (u.fcmTokens) tokens.push(...u.fcmTokens);
            }
          });
        }
      }

      // Nettoyer les doublons de tokens
      tokens = [...new Set(tokens)];

      if (tokens.length === 0) {
        console.log("Aucun token FCM trouvé pour cette cible.");
        return null;
      }

      console.log(`Envoi de la notification à ${tokens.length} appareils.`);

      // Préparer le message FCM
      const payload = {
        notification: {
          title: annonce.title,
          body: annonce.content
        },
        data: {
          annonceId: event.params.annonceId
        },
        tokens: tokens
      };

      // Envoyer le message
      const response = await admin.messaging().sendEachForMulticast(payload);
      
      console.log(response.successCount + " messages envoyés avec succès, " + response.failureCount + " échecs.");
      
      // Nettoyer les tokens invalides (désinstallations, etc.)
      if (response.failureCount > 0) {
        const failedTokens = [];
        response.responses.forEach((resp, idx) => {
          if (!resp.success) {
            const errCode = resp.error.code;
            if (errCode === 'messaging/invalid-registration-token' || errCode === 'messaging/registration-token-not-registered') {
              failedTokens.push(tokens[idx]);
            }
          }
        });
        
        if (failedTokens.length > 0) {
          // Note: On pourrait parcourir les users pour supprimer ces failedTokens de leurs fcmTokens.
          // C'est complexe sans savoir à qui ils appartiennent, mais faisable en requêtant Firebase.
          console.log("Tokens invalides détectés :", failedTokens.length);
        }
      }

      return null;
    } catch (error) {
      console.error("Erreur d'envoi de la notification Push :", error);
      return null;
    }
  });


exports.onMessageCreated = onDocumentCreated("conversations/{conversationId}/messages/{messageId}", async (event) => {
  const snap = event.data;
  if (!snap) return null;
  const msg = snap.data();
  if (msg.isSystemMessage) return null;

  const db = admin.firestore();
  
  try {
    const convDoc = await db.collection("conversations").doc(event.params.conversationId).get();
    if (!convDoc.exists) return null;
    const conv = convDoc.data();

    let tokens = [];

    if (conv.isGroup) {
      const targetGroup = conv.targetGroup || "";
      if (targetGroup.startsWith("course_")) {
        const courseId = targetGroup.replace("course_", "");
        
        // Profs
        const profsSnap = await db.collection("users").where("role", "==", "prof").get();
        profsSnap.forEach(doc => {
          const u = doc.data();
          if (u.email !== msg.senderId && u.courseIds && (u.courseIds.includes(courseId) || u.courseIds.includes(Number(courseId)))) {
            if (u.fcmTokens) tokens.push(...u.fcmTokens);
          }
        });

        // Students & Parents
        const studentsSnap = await db.collection("students").where("courseIds", "array-contains", Number(courseId)).get();
        const studentIds = [];
        studentsSnap.forEach(doc => studentIds.push(doc.id));
        const studentsSnap2 = await db.collection("students").where("courseIds", "array-contains", courseId).get();
        studentsSnap2.forEach(doc => {
          if (!studentIds.includes(doc.id)) studentIds.push(doc.id);
        });

        if (studentIds.length > 0) {
          const parentsSnap = await db.collection("users").where("role", "==", "parent").get();
          parentsSnap.forEach(doc => {
            const u = doc.data();
            if (u.email !== msg.senderId && u.childrenIds && u.childrenIds.some(cid => studentIds.includes(String(cid)))) {
              if (u.fcmTokens) tokens.push(...u.fcmTokens);
            }
          });
        }
      }
      
      // Explicit participants
      if (conv.participants && Array.isArray(conv.participants)) {
        const explicitlyAdded = conv.participants.filter(p => p !== msg.senderId);
        if (explicitlyAdded.length > 0) {
          // split into chunks of 10 for 'in' query
          for (let i = 0; i < explicitlyAdded.length; i += 10) {
             const chunk = explicitlyAdded.slice(i, i + 10);
             const addedSnap = await db.collection("users").where("email", "in", chunk).get();
             addedSnap.forEach(doc => {
               if (doc.data().fcmTokens) tokens.push(...doc.data().fcmTokens);
             });
          }
        }
      }
    } else {
      // 1-to-1 chat
      if (!conv.participants) return null;
      const recipients = conv.participants.filter(p => p !== msg.senderId);
      if (recipients.length === 0) return null;
      
      for (let i = 0; i < recipients.length; i += 10) {
         const chunk = recipients.slice(i, i + 10);
         const usersSnap = await db.collection("users").where("email", "in", chunk).get();
         usersSnap.forEach(doc => {
           if (doc.data().fcmTokens) tokens.push(...doc.data().fcmTokens);
         });
      }
    }

    tokens = [...new Set(tokens)];
    if (tokens.length === 0) return null;

    const senderName = msg.senderName || "Nouveau message";
    let bodyText = msg.text || (msg.fileUrl ? "Fichier joint" : "");
    if (bodyText.length > 100) bodyText = bodyText.substring(0, 100) + '...';

    const payload = {
      notification: {
        title: conv.isGroup ? (conv.customName || "Message de groupe") : senderName,
        body: conv.isGroup ? `${senderName}: ${bodyText}` : bodyText
      },
      data: {
        type: "chat",
        conversationId: event.params.conversationId
      },
      tokens: tokens
    };

    const response = await admin.messaging().sendEachForMulticast(payload);
    console.log(`[Chat Push] Envoyé à ${tokens.length} appareils. Succès: ${response.successCount}`);
    
  } catch(e) {
    console.error("Erreur Push Message:", e);
  }
  return null;
});

