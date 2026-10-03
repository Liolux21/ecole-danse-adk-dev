import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

old_logic = """    const targetId = id ? id : email;

    // Update in Firebase users collection
    await firebase.setDoc(firebase.doc(firebase.db, 'users', targetId), profData, { merge: true });

    // Update local DATA
    let prof = DATA.users.find(u => u.id === targetId);
    if (!prof) {
      prof = { id: targetId, ...profData };
      DATA.users.push(prof);
    } else {
      Object.assign(prof, profData);
    }"""

new_logic = """    const targetId = id ? id : email;
    
    let isNewUser = false;
    let tempPassword = null;
    const userRef = firebase.doc(firebase.db, 'users', targetId);
    
    // Check existing user to preserve roles or create auth
    if (!id) {
      const userSnap = await firebase.getDoc(userRef);
      if (userSnap.exists()) {
        const existingRole = userSnap.data().role;
        if (existingRole === 'admin') {
          profData.role = 'admin'; // preserve admin role
        } else if (existingRole === 'parent') {
          profData.role = 'prof'; // Upgrade parent to prof
        }
      } else {
        isNewUser = true;
        tempPassword = Math.random().toString(36).slice(-8);
        try {
          const apiKey = firebase.firebaseConfig.apiKey;
          const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: targetId, password: tempPassword, returnSecureToken: false })
          });
          const data = await response.json();
          if (data.error && data.error.message !== 'EMAIL_EXISTS') throw new Error(data.error.message);
        } catch(e) {
          console.warn("L'utilisateur existe peut-être déjà dans Auth, mais pas dans Firestore.", e);
        }
      }
    }

    // Update in Firebase users collection
    await firebase.setDoc(userRef, profData, { merge: true });

    // Update local DATA
    let prof = DATA.users.find(u => u.id === targetId);
    if (!prof) {
      prof = { id: targetId, ...profData };
      DATA.users.push(prof);
    } else {
      Object.assign(prof, profData);
    }
    
    if (isNewUser && tempPassword) {
      try {
        await emailjs.send(
          'service_adk',
          'template_adk_welcome',
          {
            to_email: targetId,
            to_name: fullName,
            password: tempPassword,
            portal_url: window.location.origin
          }
        );
      } catch(e) {
        console.error("Erreur email:", e);
      }
    }"""

js = js.replace(old_logic, new_logic)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
