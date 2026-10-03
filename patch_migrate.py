import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    content = f.read()

old_loop = """    for (let i = 0; i < STUDENTS.length; i += BATCH_SIZE) {
      const batch = STUDENTS.slice(i, i + BATCH_SIZE);
      btn.textContent = `Importation... ${i}/${STUDENTS.length}`;
      
      await Promise.all(batch.map(async (s) => {
        try {
          const docRef = firebase.doc(firebase.db, "students", s.id);
          const existing = await firebase.getDoc(docRef);
          if (existing.exists()) {
            skipped++;
            return;
          }
          
          await firebase.setDoc(docRef, {
            firstname: s.firstname,
            lastname: s.lastname,
            dob: s.dob,
            contactEmail: s.contactEmail,
            parentId: s.parentId,
            courseIds: s.courseIds,
            cotisation: s.cotisation,
            mutuelle: s.mutuelle,
            absences: s.absences,
            avatar: s.avatar
          });
          created++;
        } catch (err) {
          console.error("Error importing student", s.id, err);
          errors++;
        }
      }));
    }"""

new_loop = """    for (let i = 0; i < STUDENTS.length; i += BATCH_SIZE) {
      const batch = STUDENTS.slice(i, i + BATCH_SIZE);
      btn.textContent = `Mise à jour... ${i}/${STUDENTS.length}`;
      
      await Promise.all(batch.map(async (s) => {
        try {
          const docRef = firebase.doc(firebase.db, "students", s.id);
          const existing = await firebase.getDoc(docRef);
          
          await firebase.setDoc(docRef, s, { merge: true });

          if (existing.exists()) {
            skipped++;
          } else {
            created++;
          }
        } catch (err) {
          console.error("Error importing student", s.id, err);
          errors++;
        }
      }));
    }"""

content = content.replace(old_loop, new_loop)

old_alert = r"alert(`✅ Import terminé !\n\n✔ ${created} fiches créées\n⏭ ${skipped} fiches déjà existantes\n❌ ${errors} erreurs\n\nAucun email n'a été envoyé.`);"
new_alert = r"alert(`✅ Import / Mise à jour terminé !\n\n✔ ${created} fiches créées\n⏭ ${skipped} fiches mises à jour avec succès\n❌ ${errors} erreurs\n\nAucun email n'a été envoyé.`);"

content = content.replace(old_alert, new_alert)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(content)
print('js/app.js migrate fixed')
