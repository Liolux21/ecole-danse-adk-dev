content = open('js/app.js', 'r', encoding='utf-8').read()

fix_fn = """
// Fix prof names in Firestore (one-time migration)
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
};
"""

content = content + '\n' + fix_fn
open('js/app.js', 'w', encoding='utf-8').write(content)
print("Done")
