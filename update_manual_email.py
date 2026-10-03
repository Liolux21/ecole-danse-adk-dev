import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    content = f.read()

old_html = '''        <div style="display: flex; gap: 0.5rem; justify-content: flex-end; margin-top: 0.2rem;">
          <button class="btn btn-outline btn-sm" onclick="openAddStudentModal('${s.id}')">✏️ Modifier</button>
          <button class="btn btn-outline btn-sm" style="color:#e74c3c;border-color:#e74c3c;" onclick="deleteStudent('${s.id}')">🗑️ Supprimer</button>
        </div>'''

new_html = '''        <div style="display: flex; gap: 0.5rem; justify-content: flex-end; margin-top: 0.2rem;">
          <button class="btn btn-outline btn-sm" onclick="sendParentAuthEmail('${s.id}', event)">✉️ Envoyer accès</button>
          <button class="btn btn-outline btn-sm" onclick="openAddStudentModal('${s.id}')">✏️ Modifier</button>
          <button class="btn btn-outline btn-sm" style="color:#e74c3c;border-color:#e74c3c;" onclick="deleteStudent('${s.id}')">🗑️ Supprimer</button>
        </div>'''

content = content.replace(old_html, new_html)

old_submit_start = '''    const manageParentAccount = async (parentEmail, parentName) => {
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
                login_link: "https://annedkdanse.be/portail/"
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
    }'''

new_submit_start = '''    const linkParentWithoutEmail = async (parentEmail, parentName) => {
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
        await setDoc(userRef, {
          id: parentEmail,
          email: parentEmail,
          name: `${parentName} (Parent)`,
          role: "parent",
          childrenIds: [targetId]
        });
      }
    };

    // On lie uniquement Firestore (les emails seront envoyés manuellement via le bouton "Envoyer accès")
    await linkParentWithoutEmail(email, `${tutorFirstname || prenom} ${tutorLastname || nom}`);
    if (email2) {
      await linkParentWithoutEmail(email2, `Parent 2 - ${prenom} ${nom}`);
    }'''

content = content.replace(old_submit_start, new_submit_start)

# Now add the sendParentAuthEmail function to the global scope at the end
new_func = '''
window.sendParentAuthEmail = async function(studentId, event) {
  const student = window.DATA.getStudentById(studentId);
  if (!student) return;
  const btn = event.currentTarget;
  const originalText = btn.innerHTML;
  btn.textContent = "⏳ Envoi...";
  btn.disabled = true;

  try {
    const firebase = await import('./firebase-config.js');
    const { doc, getDoc, setDoc } = firebase;

    const processParent = async (parentEmail, parentName) => {
      if (!parentEmail) return;
      const userRef = doc(firebase.db, "users", parentEmail);
      let createdAuth = true;
      let tempPassword = Math.random().toString(36).slice(-8);

      try {
        const apiKey = firebase.firebaseConfig.apiKey;
        const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: parentEmail, password: tempPassword, returnSecureToken: false })
        });
        const data = await response.json();
        if (data.error) {
          if (data.error.message === 'EMAIL_EXISTS') { 
            createdAuth = false;
            window.showToast(`Info: ${parentEmail} a déjà un compte.`, 'info');
          } else {
            throw new Error(data.error.message);
          }
        }
      } catch(e) {
        console.warn(e);
        window.showToast(`Erreur Auth pour ${parentEmail}`, 'error');
        return;
      }

      if (createdAuth) {
        const userSnap = await getDoc(userRef);
        if (!userSnap.exists()) {
          await setDoc(userRef, {
            id: parentEmail,
            email: parentEmail,
            name: `${parentName} (Parent)`,
            role: "parent",
            childrenIds: [studentId]
          });
        }
        try {
          await emailjs.send("service_ADK", "template_ADK_Compte", {
            to_email: parentEmail,
            to_name: parentName,
            temp_password: tempPassword,
            login_link: "https://annedkdanse.be/portail/"
          });
          window.showToast(`✅ Email envoyé à ${parentEmail}`, 'success');
        } catch (emailError) {
          console.error("Erreur EmailJS:", emailError);
          alert(`L'email n'a pas pu être envoyé à ${parentEmail}.\\nMot de passe: ${tempPassword}`);
        }
      }
    };

    if (!student.contactEmail && !student.contactEmail2) {
      window.showToast('Aucun email parent défini pour cet élève', 'error');
      return;
    }
    await processParent(student.contactEmail, `${student.tutorFirstname || student.firstname} ${student.tutorLastname || student.lastname}`);
    if (student.contactEmail2) {
      await processParent(student.contactEmail2, `Parent 2 - ${student.firstname} ${student.lastname}`);
    }
  } catch(err) {
    console.error(err);
    window.showToast("Une erreur est survenue", "error");
  } finally {
    btn.innerHTML = originalText;
    btn.disabled = false;
  }
};
'''

content += new_func

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated successfully")
