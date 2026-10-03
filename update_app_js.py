import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# 1. Update Inscription Card
js = js.replace(
    '<a href="mailto:${ins.email}" class="btn btn-outline btn-sm">💬 Contacter</a>',
    '<button onclick="window.openContactInscriptionModal(\'${ins.email}\', \'${ins.parentName}\')" class="btn btn-outline btn-sm">💬 Contacter</button>'
).replace(
    '<a href="mailto:${ins.email}" class="btn btn-outline btn-sm">o%? Contacter</a>',
    '<button onclick="window.openContactInscriptionModal(\'${ins.email}\', \'${ins.parentName}\')" class="btn btn-outline btn-sm">o%? Contacter</button>'
)

# 2. Add Contact Inscription Logic
if 'window.openContactInscriptionModal =' not in js:
    contact_logic = """
window.openContactInscriptionModal = function(email, parentName) {
    document.getElementById('contact-inscription-email').value = email;
    document.getElementById('contact-inscription-name').value = parentName;
    document.getElementById('contact-inscription-message').value = '';
    document.getElementById('modal-contact-inscription').classList.add('active');
};

window.sendContactInscription = async function() {
    const email = document.getElementById('contact-inscription-email').value;
    const name = document.getElementById('contact-inscription-name').value;
    const message = document.getElementById('contact-inscription-message').value;
    const btn = document.querySelector('#form-contact-inscription button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = "Envoi...";
    btn.disabled = true;

    try {
        await emailjs.send(
            "service_ADK", 
            "template_contact_inscription", // Remplacez par l'ID réel de votre template EmailJS pour la prise de contact
            {
                to_email: email,
                to_name: name,
                message: message
            }
        );
        showToast('Message envoyé avec succès !', 'success');
        closeModal('modal-contact-inscription');
    } catch (e) {
        console.error(e);
        showToast('Erreur lors de l\\'envoi du message', 'error');
    } finally {
        btn.textContent = originalText;
        btn.disabled = false;
    }
};
"""
    js = contact_logic + "\n" + js

# 3. Update renderAdminEleves (Mutuelle and Cotisation selects)
old_cotisation = """const cotSelect = `
            <select onchange="updateCotisation('${s.id}', this.value)" style="padding:0.2rem; font-size:0.8rem; border-radius:4px; border:1px solid var(--border);">
              <option value="en attente" ${s.cotisation === 'en attente' ? 'selected' : ''}>En attente</option>
              <option value="payǸe" ${s.cotisation === 'payǸe' ? 'selected' : ''}>PayǸe</option>
            </select>
          `;"""
new_cotisation = """const cotSelect = `
            <select onchange="updateCotisation('${s.id}', this.value)" style="padding:0.2rem; font-size:0.8rem; border-radius:4px; border:1px solid var(--border); margin-bottom: 5px; display: block; width: 100%;">
              <option value="en attente" ${(s.cotisation === 'en attente' || !s.cotisation) ? 'selected' : ''}>En attente</option>
              <option value="payee_cash" ${s.cotisation === 'payee_cash' ? 'selected' : ''}>Payée cash</option>
              <option value="payee_compte" ${s.cotisation === 'payee_compte' ? 'selected' : ''}>Payée compte</option>
            </select>
            <input type="date" value="${s.cotisationDate || ''}" onchange="updateCotisationDate('${s.id}', this.value)" style="padding:0.2rem; font-size:0.8rem; border-radius:4px; border:1px solid var(--border); width: 100%; box-sizing: border-box;">
          `;"""

old_mutuelle = """const mutSelect = `
            <select onchange="updateMutuelle('${s.id}', this.value)" style="padding:0.2rem; font-size:0.8rem; border-radius:4px; border:1px solid var(--border);">
              <option value="attente" ${s.mutuelle === 'attente' ? 'selected' : ''}>En attente</option>
              <option value="en cours" ${s.mutuelle === 'en cours' ? 'selected' : ''}>En cours</option>
              <option value="remis" ${s.mutuelle === 'remis' ? 'selected' : ''}>Remis</option>
            </select>
          `;"""
new_mutuelle = """const mutSelect = `
            <select onchange="updateMutuelle('${s.id}', this.value)" style="padding:0.2rem; font-size:0.8rem; border-radius:4px; border:1px solid var(--border); width: 100%;">
              <option value="masque" ${(s.mutuelle === 'masque' || !s.mutuelle) ? 'selected' : ''}>Masqué</option>
              <option value="attente" ${s.mutuelle === 'attente' ? 'selected' : ''}>En attente</option>
              <option value="en cours" ${s.mutuelle === 'en cours' ? 'selected' : ''}>En cours</option>
              <option value="remis" ${s.mutuelle === 'remis' ? 'selected' : ''}>Remis</option>
            </select>
          `;"""

js = js.replace(old_cotisation, new_cotisation).replace(old_mutuelle, new_mutuelle)

# 4. Add updateCotisationDate
if 'window.updateCotisationDate =' not in js:
    js = js.replace(
        "window.updateCotisation = function(studentId, value) {",
        "window.updateCotisationDate = async function(studentId, dateVal) {\n  const student = DATA.students.find(st => st.id === studentId);\n  if (student) {\n    student.cotisationDate = dateVal;\n    const firebase = await import('./firebase-config.js');\n    await firebase.updateDoc(firebase.doc(firebase.db, 'students', studentId), { cotisationDate: dateVal });\n  }\n};\nwindow.updateCotisation = function(studentId, value) {"
    )

# 5. Make updateMutuelle and updateCotisation save to Firestore immediately!
js = re.sub(
    r'window\.updateCotisation = function\(studentId, value\) \{\s*const student = DATA\.students\.find\(st => st\.id === studentId\);\s*if \(student\) student\.cotisation = value;\s*renderAdminEleves\(\);\s*\};',
    """window.updateCotisation = async function(studentId, value) {
  const student = DATA.students.find(st => st.id === studentId);
  if (student) {
    student.cotisation = value;
    const firebase = await import('./firebase-config.js');
    await firebase.updateDoc(firebase.doc(firebase.db, 'students', studentId), { cotisation: value });
  }
  renderAdminEleves();
};""",
    js
)

js = re.sub(
    r'window\.updateMutuelle = function\(studentId, value\) \{\s*const student = DATA\.students\.find\(st => st\.id === studentId\);\s*if \(student\) student\.mutuelle = value;\s*renderAdminEleves\(\);\s*\};',
    """window.updateMutuelle = async function(studentId, value) {
  const student = DATA.students.find(st => st.id === studentId);
  if (student) {
    student.mutuelle = value;
    const firebase = await import('./firebase-config.js');
    await firebase.updateDoc(firebase.doc(firebase.db, 'students', studentId), { mutuelle: value });
  }
  renderAdminEleves();
};""",
    js
)

# 6. Update openAddStudentModal to fill the new fields
old_open_modal = """      document.getElementById('add-student-firstname').value = student.firstname;
      document.getElementById('add-student-lastname').value = student.lastname;
      document.getElementById('add-student-age').value = student.age;
      document.getElementById('add-student-email').value = student.contactEmail || '';"""

new_open_modal = """      document.getElementById('add-student-firstname').value = student.firstname || '';
      document.getElementById('add-student-lastname').value = student.lastname || '';
      document.getElementById('add-student-dob').value = student.dob || '';
      document.getElementById('add-student-email').value = student.contactEmail || '';
      document.getElementById('add-student-tutor-firstname').value = student.tutorFirstname || '';
      document.getElementById('add-student-tutor-lastname').value = student.tutorLastname || '';
      document.getElementById('add-student-tutor-phone').value = student.tutorPhone || '';"""

js = js.replace(old_open_modal, new_open_modal)

# Precheck checkboxes
old_checkboxes = """        const checkboxes = container.querySelectorAll('.course-checkbox');
          checkboxes.forEach(chk => {
            chk.checked = false; // Reset first
            // You can add logic here to pre-check if student is in course
          });"""

new_checkboxes = """        const checkboxes = container.querySelectorAll('.course-checkbox');
          const studentCourses = student.courseIds || [];
          checkboxes.forEach(chk => {
            chk.checked = studentCourses.includes(chk.value);
          });"""

js = js.replace(old_checkboxes, new_checkboxes)

# 7. Update submitAddStudent to save new fields
old_submit_read = """      const prenom = document.getElementById('add-student-firstname').value;
      const nom = document.getElementById('add-student-lastname').value;
      const age = document.getElementById('add-student-age').value;
      const email = document.getElementById('add-student-email').value;"""

new_submit_read = """      const prenom = document.getElementById('add-student-firstname').value;
      const nom = document.getElementById('add-student-lastname').value;
      const dob = document.getElementById('add-student-dob').value;
      const email = document.getElementById('add-student-email').value;
      const tutorFirstname = document.getElementById('add-student-tutor-firstname').value;
      const tutorLastname = document.getElementById('add-student-tutor-lastname').value;
      const tutorPhone = document.getElementById('add-student-tutor-phone').value;"""

js = js.replace(old_submit_read, new_submit_read)

old_submit_data = """      const studentData = {
        firstname: prenom,
        lastname: nom,
        age: parseInt(age, 10),
        contactEmail: email,
        courseIds: selectedCourses
      };"""

new_submit_data = """      const studentData = {
        firstname: prenom,
        lastname: nom,
        dob: dob,
        tutorFirstname: tutorFirstname,
        tutorLastname: tutorLastname,
        tutorPhone: tutorPhone,
        contactEmail: email,
        courseIds: selectedCourses
      };"""

js = js.replace(old_submit_data, new_submit_data)

# 8. Fix deleteStudent (so if it fails on user, it doesn't crash)
old_delete = """      // 2. Clean up parent users
      const parentUsers = DATA.users.filter(u => u.childrenIds && u.childrenIds.includes(id));
      for (const parent of parentUsers) {
        const newChildrenIds = parent.childrenIds.filter(cid => cid !== id);
        if (newChildrenIds.length === 0 && parent.role === 'parent') {
          // Supprime le profil Parent de Firestore s'il n'a plus d'enfant
          await firebase.deleteDoc(firebase.doc(firebase.db, "users", parent.id));
        } else {
          await firebase.updateDoc(firebase.doc(firebase.db, "users", parent.id), {
            childrenIds: newChildrenIds
          });
        }
      }"""

new_delete = """      // 2. Clean up parent users safely
      const parentUsers = DATA.users.filter(u => u.childrenIds && u.childrenIds.includes(id));
      for (const parent of parentUsers) {
        try {
            const newChildrenIds = parent.childrenIds.filter(cid => cid !== id);
            if (newChildrenIds.length === 0 && parent.role === 'parent') {
              // Tentative de suppression (peut Ǹchouer sans rgles Firestore adaptǸes)
              await firebase.deleteDoc(firebase.doc(firebase.db, "users", parent.id));
            } else {
              await firebase.updateDoc(firebase.doc(firebase.db, "users", parent.id), {
                childrenIds: newChildrenIds
              });
            }
        } catch(err) {
            console.error("Impossible de nettoyer le parent (permissions ?):", err);
        }
      }"""

js = js.replace(old_delete, new_delete)

# 9. Excel Export Function
if 'window.exportStudentsExcel =' not in js:
    export_fn = """
window.exportStudentsExcel = function() {
    if (!DATA.students || DATA.students.length === 0) {
        alert("Aucun élève à exporter.");
        return;
    }
    
    // Create CSV content
    let csvContent = "data:text/csv;charset=utf-8,\\uFEFF";
    csvContent += "Prenom,Nom,Date de naissance,Email Parent,Prenom Tuteur,Nom Tuteur,Telephone Tuteur,Mutuelle,Cotisation,Date Cotisation\\n";
    
    DATA.students.forEach(st => {
        const row = [
            `"${st.firstname || ''}"`,
            `"${st.lastname || ''}"`,
            `"${st.dob || ''}"`,
            `"${st.contactEmail || ''}"`,
            `"${st.tutorFirstname || ''}"`,
            `"${st.tutorLastname || ''}"`,
            `"${st.tutorPhone || ''}"`,
            `"${st.mutuelle || 'masque'}"`,
            `"${st.cotisation || 'en attente'}"`,
            `"${st.cotisationDate || ''}"`
        ];
        csvContent += row.join(",") + "\\n";
    });
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "eleves_adk.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
"""
    js = js + "\n" + export_fn

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
