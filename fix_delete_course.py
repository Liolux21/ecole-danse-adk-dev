import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

pattern = r'window\.deleteCourse = async function\(id\) \{\n\s*if \(confirm\("Êtes-vous sûr de vouloir supprimer ce cours \?"\)\) \{\n\s*const firebase = await import\(\'\./firebase-config\.js\'\);\n\s*await firebase\.deleteDoc\(firebase\.doc\(firebase\.db, "courses", id\)\);\n\s*await DATA\.syncFromFirebase\(\);\n\s*renderAdminCourses\(\);\n\s*\}\n\};'

replacement = r'''window.deleteCourse = async function(id) {
  if (confirm("Êtes-vous sûr de vouloir supprimer ce cours ?")) {
    const firebase = await import('./firebase-config.js');
    const course = DATA.getCourseById(id);
    const targetDocId = (course && course.docId) ? course.docId : String(id);
    await firebase.deleteDoc(firebase.doc(firebase.db, "courses", targetDocId));
    DATA.courses = DATA.courses.filter(c => String(c.id) !== String(id));
    renderAdminCourses();
  }
};'''

js = re.sub(pattern, replacement, js)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
