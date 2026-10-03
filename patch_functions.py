import re

with open('functions/index.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Update import
content = content.replace(
    'const { onDocumentCreated } = require("firebase-functions/v2/firestore");',
    'const { onDocumentCreated, onDocumentUpdated } = require("firebase-functions/v2/firestore");'
)

# New functions to append
new_functions = """
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

exports.onStudentUpdated = onDocumentUpdated("students/{studentId}", async (event) => {
  const before = event.data.before.data();
  const after = event.data.after.data();
  if (!before || !after) return null;

  const absencesBefore = before.absences || [];
  const absencesAfter = after.absences || [];

  if (absencesAfter.length > absencesBefore.length) {
    try {
      const studentId = event.params.studentId;
      const studentName = after.firstname || after.name || "Votre enfant";
      
      const db = admin.firestore();
      let tokens = [];
      const parentsSnap = await db.collection("users").where("role", "==", "parent").get();
      
      parentsSnap.forEach(doc => {
        const u = doc.data();
        if (u.childrenIds && u.childrenIds.some(cid => String(cid) === studentId)) {
          if (u.fcmTokens) tokens.push(...u.fcmTokens);
        }
      });

      tokens = [...new Set(tokens)];
      if (tokens.length === 0) return null;

      const payload = {
        notification: {
          title: "Nouvelle absence signalée",
          body: `Une absence a été encodée pour ${studentName}.`
        },
        data: {
          type: "absence",
          studentId: studentId
        },
        tokens: tokens
      };

      await admin.messaging().sendEachForMulticast(payload);
      console.log(`[Absence Push] Envoyé à ${tokens.length} appareils.`);
    } catch(e) {
      console.error("Erreur Push Absence:", e);
    }
  }
  return null;
});
"""

content += "\n" + new_functions

with open('functions/index.js', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated functions/index.js")
