import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

old_update_mutuelle = """window.updateMutuelle = async function(studentId, value) {
    const student = DATA.students.find(st => st.id === studentId);
    if (student) {
      student.mutuelle = value;
      const firebase = await import('./firebase-config.js');
      await firebase.updateDoc(firebase.doc(firebase.db, 'students', studentId), { mutuelle: value });
    }
    renderAdminEleves();
  };"""

new_update_mutuelle = """window.updateMutuelle = async function(studentId, value) {
    try {
      const student = DATA.students.find(st => st.id === studentId);
      if (student) {
        student.mutuelle = value;
        const firebase = await import('./firebase-config.js');
        await firebase.updateDoc(firebase.doc(firebase.db, 'students', studentId), { mutuelle: value });
      }
      renderAdminEleves();
    } catch (e) {
      console.error(e);
      alert("Erreur lors de la mise à jour de la mutuelle: " + e.message);
    }
  };"""

js = js.replace(old_update_mutuelle, new_update_mutuelle)

old_update_cotisation = """window.updateCotisation = async function(studentId, value) {
    const student = DATA.students.find(st => st.id === studentId);
    if (student) {
      student.cotisation = value;
      const firebase = await import('./firebase-config.js');
      await firebase.updateDoc(firebase.doc(firebase.db, 'students', studentId), { cotisation: value });
    }
    renderAdminEleves();
  };"""

new_update_cotisation = """window.updateCotisation = async function(studentId, value) {
    try {
      const student = DATA.students.find(st => st.id === studentId);
      if (student) {
        student.cotisation = value;
        const firebase = await import('./firebase-config.js');
        await firebase.updateDoc(firebase.doc(firebase.db, 'students', studentId), { cotisation: value });
      }
      renderAdminEleves();
    } catch (e) {
      console.error(e);
      alert("Erreur lors de la mise à jour de la cotisation: " + e.message);
    }
  };"""

js = js.replace(old_update_cotisation, new_update_cotisation)

old_update_cot_date = """window.updateCotisationDate = async function(studentId, dateVal) {
    const student = DATA.students.find(st => st.id === studentId);
    if (student) {
      student.cotisationDate = dateVal;
      const firebase = await import('./firebase-config.js');
      await firebase.updateDoc(firebase.doc(firebase.db, 'students', studentId), { cotisationDate: dateVal });
    }
  };"""

new_update_cot_date = """window.updateCotisationDate = async function(studentId, dateVal) {
    try {
      const student = DATA.students.find(st => st.id === studentId);
      if (student) {
        student.cotisationDate = dateVal;
        const firebase = await import('./firebase-config.js');
        await firebase.updateDoc(firebase.doc(firebase.db, 'students', studentId), { cotisationDate: dateVal });
      }
    } catch (e) {
      console.error(e);
      alert("Erreur lors de la mise à jour de la date: " + e.message);
    }
  };"""

js = js.replace(old_update_cot_date, new_update_cot_date)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
