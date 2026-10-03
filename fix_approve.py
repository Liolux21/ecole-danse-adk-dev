import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Define the old block
old_block = re.search(r'async function adminApprove\(id\) \{.*?\n\}\n\nasync function adminReject', js, re.DOTALL)

if old_block:
    old_code = old_block.group(0)
    
    new_code = \"\"\"async function adminApprove(id) {
  const btn = document.querySelector(#actions- .btn-approve);
  if(btn) { btn.disabled = true; btn.textContent = 'Création...'; }

  const ins = DATA.inscriptions.find(i => String(i.id) === String(id));
  if (!ins) return;

  try {
    const { doc, getDoc, setDoc } = await import('./firebase-config.js');
    const userRefCheck = doc(db, "users", ins.email);
    const userSnapCheck = await getDoc(userRefCheck);
    
    let isNewParent = false;
    const tempPassword = Math.random().toString(36).slice(-8);

    if (!userSnapCheck.exists()) {
      const created = await AUTH.createParentAccount(ins.email, tempPassword, ins.parentName);
      if (!created) {
        alert("Erreur critique: impossible de créer le compte parent (peut-être l'adresse email existe-t-elle déjà dans l'authentification sans profil associé ?).");
        if(btn) { btn.disabled = false; btn.textContent = '? Accepter'; }
        return;
      }
      isNewParent = true;
    }

    // Create the student in Firestore
    const studentId = "stu_" + Date.now();
    const [firstname, ...lastnameParts] = ins.childName.split(' ');

    const courseIds = [];
    if (ins.courses) {
        for (const courseName of ins.courses) {
            const courseObj = DATA.courses.find(c => c.name === courseName || courseName.includes(c.name));
            if (courseObj) courseIds.push(courseObj.id);
        }
    }

    const studentData = {
      firstname: firstname || ins.childName,
      lastname: lastnameParts.join(' '),
      age: parseInt(ins.age, 10),
      contactEmail: ins.email,
      courseIds: courseIds,
      parentId: ins.email,
      cotisation: 'en attente',
      mutuelle: 'attente',
      absences: [],
      avatar: https://i.pravatar.cc/150?u=
    };

    await setDoc(doc(db, "students", studentId), studentData);
    DATA.students.push({ id: studentId, ...studentData });

    const userRef = doc(db, "users", ins.email);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const userData = userSnap.data();
      const children = userData.childrenIds || [];
      if (!children.includes(studentId)) {
        await setDoc(userRef, { childrenIds: [...children, studentId] }, { merge: true });
      }
    }

    if (isNewParent) {
      try {
        await emailjs.send(
          "service_jooqt2m",
          "template_1mp1jad",
          {
            to_email: ins.email,
            to_name: ins.parentName,
            temp_password: tempPassword,
            login_link: window.location.href.split('?')[0]
          }
        );
        showToast('? Inscription acceptée et email envoyé !', 'success');
      } catch (emailError) {
        console.error("Erreur EmailJS:", emailError);
        alert(?? Le compte parent a été créé mais l'email n'a pas pu être envoyé.\\nMot de passe temporaire: );
      }
    } else {
      showToast('? Inscription acceptée, enfant ajouté au compte existant !', 'success');
    }

    await DATA.approveInscription(id);
    renderAdminInscriptions();
    document.getElementById('admin-stat-pending').textContent = DATA.getPendingInscriptions().length;
    document.getElementById('pending-badge').textContent = DATA.getPendingInscriptions().length;

  } catch(e) {
    console.error(e);
    alert("Erreur lors de l'approbation.");
    if(btn) { btn.disabled = false; btn.textContent = '? Accepter'; }
  }
}

async function adminReject\"\"\"

    js = js.replace(old_code, new_code)

    with open('js/app.js', 'w', encoding='utf-8') as f:
        f.write(js)
    print("Replaced adminApprove successfully!")
else:
    print("Could not find block!")
