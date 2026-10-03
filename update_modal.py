import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update openAddStudentModal
old_open = '''    document.getElementById('add-student-email').value = student.contactEmail || '';
    
    if (container) {'''

new_open = '''    document.getElementById('add-student-email').value = student.contactEmail || '';
    const email2Input = document.getElementById('add-student-email2');
    if (email2Input) email2Input.value = student.contactEmail2 || '';
    
    if (container) {'''

content = content.replace(old_open, new_open)

# 2. Update submitAddStudent body
old_submit = '''    const email = document.getElementById('add-student-email').value.toLowerCase().trim();
    const checkboxes = document.querySelectorAll('#add-student-courses .course-checkbox:checked');
      const selectedCourses = Array.from(checkboxes).map(chk => chk.value);

    const targetId = isNew ? "stu_" + Date.now() : studentId;
    const studentData = {
      firstname: prenom,
      lastname: nom,
      dob: dob,
        age: (dob ? (new Date().getFullYear() - new Date(dob).getFullYear() - ((new Date().getMonth() - new Date(dob).getMonth() < 0 || (new Date().getMonth() === new Date(dob).getMonth() && new Date().getDate() < new Date(dob).getDate())) ? 1 : 0)) : 0),
        tutorFirstname: tutorFirstname,
        tutorLastname: tutorLastname,
        tutorPhone: tutorPhone,
      contactEmail: email,
      courseIds: selectedCourses
    };
    if (isNew) {
      studentData.absences = [];
      studentData.avatar = `https://i.pravatar.cc/150?u=${targetId}`;
    }
    
    await setDoc(doc(db, "students", targetId), studentData, { merge: true });

    let tempPassword = null;
    if (isNew) {
      const userRef = doc(db, "users", email);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        const children = userData.childrenIds || [];
        if (!children.includes(targetId)) {
          await setDoc(userRef, { childrenIds: [...children, targetId] }, { merge: true });
        }
      } else {
        tempPassword = Math.random().toString(36).slice(-8);
        try {
          // Utilisation de l'API REST pour éviter la déconnexion automatique
          const apiKey = "AIzaSyBPOPRg9AxDqojhkskOIRO-4AHxvLICP7Q"; // Key from firebase-config.js
          const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password: tempPassword, returnSecureToken: false })
          });
          const data = await response.json();
          if (data.error) throw new Error(data.error.message);
        } catch(e) {
          console.warn("L'utilisateur existe peut-être déjà dans Auth, mais pas dans Firestore.", e);
        }
        
        await setDoc(userRef, {
          id: email,
          email: email,
          name: `${prenom} ${nom} (Parent)`,
          role: "parent",
          childrenIds: [targetId]
        });
      }
    }

    await DATA.syncFromFirebase();
    if (AUTH.hasRole('admin')) {
      showPortalDashboard(AUTH.currentUser);
    }

    closeModal('modal-add-student');
    document.getElementById('form-add-student').reset();
    showToast(isNew ? '✅ Élève ajouté avec succès' : '✅ Élève modifié avec succès', 'success');

    if (isNew && tempPassword) {
      try {
        await emailjs.send(
          "service_ADK",
          "template_ADK_Compte",
          {
            to_email: email,
            to_name: `${prenom} ${nom}`,
            temp_password: tempPassword,
            login_link: "https://liolux21.github.io/ecole-danse-adk-dev/portail.html"
          }
        );
        showToast('✉️ Email envoyé au parent avec succès !', 'success');
      } catch (emailError) {
        console.error("Erreur EmailJS:", emailError);
        alert(`⚠️ Le compte a été créé mais l'email n'a pas pu être envoyé.
Mot de passe temporaire: ${tempPassword}

(N'oublie pas de configurer EmailJS !)`);
      }
    }'''

new_submit = '''    const email = document.getElementById('add-student-email').value.toLowerCase().trim();
    const email2Input = document.getElementById('add-student-email2');
    const email2 = email2Input ? email2Input.value.toLowerCase().trim() : "";
    
    const checkboxes = document.querySelectorAll('#add-student-courses .course-checkbox:checked');
      const selectedCourses = Array.from(checkboxes).map(chk => chk.value);

    const targetId = isNew ? "stu_" + Date.now() : studentId;
    const studentData = {
      firstname: prenom,
      lastname: nom,
      dob: dob,
        age: (dob ? (new Date().getFullYear() - new Date(dob).getFullYear() - ((new Date().getMonth() - new Date(dob).getMonth() < 0 || (new Date().getMonth() === new Date(dob).getMonth() && new Date().getDate() < new Date(dob).getDate())) ? 1 : 0)) : 0),
        tutorFirstname: tutorFirstname,
        tutorLastname: tutorLastname,
        tutorPhone: tutorPhone,
      contactEmail: email,
      contactEmail2: email2,
      courseIds: selectedCourses
    };
    if (isNew) {
      studentData.absences = [];
      studentData.avatar = `https://i.pravatar.cc/150?u=${targetId}`;
    }
    
    await setDoc(doc(db, "students", targetId), studentData, { merge: true });

    const manageParentAccount = async (parentEmail, parentName) => {
      if (!parentEmail) return;
      const userRef = doc(db, "users", parentEmail);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        const children = userData.childrenIds || [];
        if (!children.includes(targetId)) {
          await setDoc(userRef, { childrenIds: [...children, targetId] }, { merge: true });
        }
      } else {
        let tempPassword = Math.random().toString(36).slice(-8);
        let createdAuth = true;
        try {
          const apiKey = "AIzaSyBPOPRg9AxDqojhkskOIRO-4AHxvLICP7Q"; // Key from firebase-config.js
          const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: parentEmail, password: tempPassword, returnSecureToken: false })
          });
          const data = await response.json();
          if (data.error) {
             if (data.error.message === 'EMAIL_EXISTS') { createdAuth = false; }
             else throw new Error(data.error.message);
          }
        } catch(e) {
          console.warn("L'utilisateur existe peut-être déjà dans Auth, mais pas dans Firestore.", e);
        }
        
        await setDoc(userRef, {
          id: parentEmail,
          email: parentEmail,
          name: `${parentName} (Parent)`,
          role: "parent",
          childrenIds: [targetId]
        });
        
        if (createdAuth) {
          try {
            await emailjs.send(
              "service_ADK",
              "template_ADK_Compte",
              {
                to_email: parentEmail,
                to_name: parentName,
                temp_password: tempPassword,
                login_link: "https://liolux21.github.io/ecole-danse-adk-dev/portail.html"
              }
            );
            showToast(`✉️ Email envoyé à ${parentEmail} avec succès !`, 'success');
          } catch (emailError) {
            console.error("Erreur EmailJS:", emailError);
          }
        }
      }
    };

    // On check/crée les DEUX parents s'ils sont renseignés (même en mode "modification" si un parent 2 est ajouté par après)
    await manageParentAccount(email, `${tutorFirstname || prenom} ${tutorLastname || nom}`);
    if (email2) {
      await manageParentAccount(email2, `Parent 2 - ${prenom} ${nom}`);
    }

    await DATA.syncFromFirebase();
    if (AUTH.hasRole('admin')) {
      showPortalDashboard(AUTH.currentUser);
    }

    closeModal('modal-add-student');
    document.getElementById('form-add-student').reset();
    showToast(isNew ? '✅ Élève ajouté avec succès' : '✅ Élève modifié avec succès', 'success');'''

content = content.replace(old_submit, new_submit)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done.")
