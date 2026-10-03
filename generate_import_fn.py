import json

# Load the students data
students = json.load(open('students_to_import.json', encoding='utf-8'))

# Generate JS with the students array embedded
# We'll create a function migrateStudents2026 that writes all students to Firestore
# WITHOUT creating Firebase auth accounts (no email sent!)

js_students = json.dumps(students, ensure_ascii=False)

js_code = f"""
// =============================================
// IMPORT ÉLÈVES 2026-2027 (sans envoi d'email)
// =============================================
window.migrateStudents2026 = async function() {{
  const btn = document.getElementById('btn-migrate-students');
  if (!confirm("Importer les {len(students)} fiches élèves 2026-2027 ?\\n\\nAucun email ne sera envoyé. Cette opération peut prendre 1-2 minutes.")) return;

  btn.textContent = "Importation en cours...";
  btn.disabled = true;

  try {{
    const firebase = await import('./firebase-config.js');
    
    const STUDENTS = {js_students};
    
    let created = 0;
    let skipped = 0;
    let errors = 0;
    const BATCH_SIZE = 10;

    for (let i = 0; i < STUDENTS.length; i += BATCH_SIZE) {{
      const batch = STUDENTS.slice(i, i + BATCH_SIZE);
      btn.textContent = `Importation... ${{i}}/${{STUDENTS.length}}`;
      
      await Promise.all(batch.map(async (s) => {{
        try {{
          const docRef = firebase.doc(firebase.db, "students", s.id);
          const existing = await firebase.getDoc(docRef);
          if (existing.exists()) {{
            skipped++;
            return;
          }}
          
          await firebase.setDoc(docRef, {{
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
          }});
          created++;
        }} catch (err) {{
          console.error("Error importing student", s.id, err);
          errors++;
        }}
      }}));
    }}
    
    // Update local DATA
    window.DATA.students = [];
    const snap = await firebase.getDocs(firebase.collection(firebase.db, "students"));
    snap.forEach(d => window.DATA.students.push({{ id: d.id, ...d.data() }}));
    
    alert(`✅ Import terminé !\\n\\n✔ ${{created}} fiches créées\\n⏭ ${{skipped}} fiches déjà existantes\\n❌ ${{errors}} erreurs\\n\\nAucun email n'a été envoyé.`);
    window.renderAdminEleves();
  }} catch(e) {{
    console.error(e);
    alert("Erreur : " + e.message);
  }} finally {{
    btn.textContent = "Importer les élèves 2026-2027";
    btn.disabled = false;
  }}
}};
"""

with open('student_import_fn.js', 'w', encoding='utf-8') as f:
    f.write(js_code)

print("Done!")
print(f"Function generated for {len(students)} students")
