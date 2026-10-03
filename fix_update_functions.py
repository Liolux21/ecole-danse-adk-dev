import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Replace updateMutuelle
js = re.sub(
    r'window\.updateMutuelle = async function\(studentId, value\) \{.*?\};\n',
    """window.updateMutuelle = async function(studentId, value) {
    try {
      const student = DATA.students.find(st => st.id === studentId);
      if (!student) {
        alert("Erreur: Etudiant non trouvé! ID=" + studentId);
        return;
      }
      student.mutuelle = value;
      const firebase = await import('./firebase-config.js');
      await firebase.updateDoc(firebase.doc(firebase.db, 'students', studentId), { mutuelle: value });
      renderAdminEleves();
    } catch (e) {
      alert("Erreur Mutuelle: " + e.message);
    }
  };\n""",
    js, flags=re.DOTALL
)

# Replace updateCotisation
js = re.sub(
    r'window\.updateCotisation = async function\(studentId, value\) \{.*?\};\n',
    """window.updateCotisation = async function(studentId, value) {
    try {
      const student = DATA.students.find(st => st.id === studentId);
      if (!student) {
        alert("Erreur: Etudiant non trouvé! ID=" + studentId);
        return;
      }
      student.cotisation = value;
      const firebase = await import('./firebase-config.js');
      await firebase.updateDoc(firebase.doc(firebase.db, 'students', studentId), { cotisation: value });
      renderAdminEleves();
    } catch (e) {
      alert("Erreur Cotisation: " + e.message);
    }
  };\n""",
    js, flags=re.DOTALL
)

# Replace updateCotisationDate
js = re.sub(
    r'window\.updateCotisationDate = async function\(studentId, dateVal\) \{.*?\};\n',
    """window.updateCotisationDate = async function(studentId, dateVal) {
    try {
      const student = DATA.students.find(st => st.id === studentId);
      if (!student) {
        alert("Erreur: Etudiant non trouvé! ID=" + studentId);
        return;
      }
      student.cotisationDate = dateVal;
      const firebase = await import('./firebase-config.js');
      await firebase.updateDoc(firebase.doc(firebase.db, 'students', studentId), { cotisationDate: dateVal });
    } catch (e) {
      alert("Erreur Date: " + e.message);
    }
  };\n""",
    js, flags=re.DOTALL
)

# Update CSS for masque
css_masque = """.select-masque { background-color: #f1f3f5; color: #adb5bd; }"""
# Wait, I can just inject it in style.css or keep the inline style.
# I already added inline style for masque: background-color: ${mutStatus === 'masque' ? '#e0e0e0' : ''}

# Bump cache
with open('portail.html', 'r', encoding='utf-8') as pf:
    html = pf.read()
html = re.sub(r'src="js/app.js\?v=\d+"', 'src="js/app.js?v=27"', html)
with open('portail.html', 'w', encoding='utf-8') as pf:
    pf.write(html)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
