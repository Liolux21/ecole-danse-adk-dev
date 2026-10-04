
// Hack auto delete Eden 2
setTimeout(async () => {
  if (window.AUTH && window.AUTH.currentUser && window.AUTH.currentUser.email === 'lionel.henrion@gmail.com') {
    try {
      const firebase = await import('./firebase-config.js');
      const studentsSnap = await firebase.getDocs(firebase.collection(firebase.db, 'students'));
      let found = false;
      studentsSnap.forEach(async (docSnap) => {
        const d = docSnap.data();
        if (d.firstname?.toLowerCase() === 'eden' && d.lastname?.toLowerCase() === 'hazard') {
          await firebase.deleteDoc(firebase.doc(firebase.db, 'students', docSnap.id));
          found = true;
        }
      });
      if (found) {
        window.showToast('✅ Eden Hazard a été complètement supprimé !');
        setTimeout(() => location.reload(), 3000);
      }
    } catch(e) {}
  }
}, 3000);
