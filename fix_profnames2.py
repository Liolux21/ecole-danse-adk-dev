content = open('js/app.js', 'r', encoding='utf-8').read()

# Fix 1: Update profNames list in migrateProfs2026
content = content.replace(
    "'Florence', 'Adam'",
    "'Florence Leyens', 'Adam Binoua'"
)

# Fix 2: Replace the buggy fixProfNames with a clean version
old_fn = """// Fix prof names in Firestore (one-time migration)
window.fixProfNames = async function() {
  const firebase = await import('./firebase-config.js');
  const updates = [
    { oldName: 'Florence', newName: 'Florence Leyens', email: 'florence@adk.local' },
    { oldName: 'Adam',     newName: 'Adam Binoua',    email: 'adam@adk.local' }
  ];
  let fixed = 0;
  for (const u of updates) {
    const docRef = firebase.doc(firebase.db, 'users', u.email);
    const snap   = await firebase.getDoc(firebase.db ? docRef : docRef);
    try {
      const existing = await firebase.getDoc(docRef);
      if (existing.exists()) {
        await firebase.updateDoc(docRef, { name: u.newName });
        fixed++;
      } else {
        console.warn('Compte introuvable:', u.email);
      }
    } catch(e) {
      console.error('Error updating', u.email, e);
    }
  }
  alert('✅ ' + fixed + '/2 comptes professeurs mis à jour dans Firebase !');
};"""

new_fn = """// Fix prof names in Firestore (one-time migration)
window.fixProfNames = async function() {
  const firebase = await import('./firebase-config.js');
  
  // Search all users and fix any that still have old single-name values
  const usersSnap = await firebase.getDocs(firebase.collection(firebase.db, 'users'));
  let fixed = 0;
  let details = [];
  
  for (const d of usersSnap.docs) {
    const data = d.data();
    if (data.name === 'Florence' || data.firstname === 'Florence') {
      await firebase.updateDoc(firebase.doc(firebase.db, 'users', d.id), {
        name: 'Florence Leyens',
        firstname: 'Florence',
        lastname: 'Leyens'
      });
      fixed++;
      details.push('Florence -> Florence Leyens (id: ' + d.id + ')');
    } else if (data.name === 'Adam' || data.firstname === 'Adam') {
      await firebase.updateDoc(firebase.doc(firebase.db, 'users', d.id), {
        name: 'Adam Binoua',
        firstname: 'Adam',
        lastname: 'Binoua'
      });
      fixed++;
      details.push('Adam -> Adam Binoua (id: ' + d.id + ')');
    }
  }
  
  if (fixed === 0) {
    alert('ℹ️ Aucun compte à corriger trouvé.\\n\\nLes comptes ont peut-être déjà été mis à jour, ou n\\'ont pas encore été créés.\\nUtilisez d\\'abord "Créer les profs manquants".');
  } else {
    alert('✅ ' + fixed + ' compte(s) mis à jour !\\n\\n' + details.join('\\n'));
  }
};"""

content = content.replace(old_fn, new_fn)

open('js/app.js', 'w', encoding='utf-8') .write(content)
print("Done")
