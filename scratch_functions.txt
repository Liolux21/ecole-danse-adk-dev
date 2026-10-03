const { onDocumentCreated } = require("firebase-functions/v2/firestore");
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
