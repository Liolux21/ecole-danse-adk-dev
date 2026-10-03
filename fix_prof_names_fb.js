// Script de migration à exécuter une seule fois via la console du navigateur
// (ou via un bouton admin temporaire)

window.fixProfNames = async function() {
  const firebase = await import('./firebase-config.js');
  
  const updates = [
    { oldName: 'Florence', newName: 'Florence Leyens', email: 'florence@adk.local' },
    { oldName: 'Adam',     newName: 'Adam Binoua',    email: 'adam@adk.local' }
  ];
  
  let fixed = 0;
  for (const u of updates) {
    const docRef = firebase.doc(firebase.db, 'users', u.email);
    const snap   = await firebase.getDoc(docRef);
    if (snap.exists()) {
      await firebase.updateDoc(docRef, { name: u.newName });
      console.log(`✅ ${u.oldName} -> ${u.newName}`);
      fixed++;
    } else {
      console.warn(`⚠️ Compte ${u.email} introuvable`);
    }
  }
  alert(`✅ ${fixed}/2 comptes mis à jour !`);
};
