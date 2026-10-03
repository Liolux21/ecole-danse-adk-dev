import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    content = f.read()

delete_student_code = """
window.deleteStudent = async function(studentId) {
  if (!confirm("Êtes-vous sûr de vouloir supprimer cet élève définitivement ?")) return;
  
  try {
    const firebase = await import('./firebase-config.js');
    await firebase.deleteDoc(firebase.doc(firebase.db, "students", studentId));
    
    // Update local DATA
    window.DATA.students = window.DATA.students.filter(s => s.id !== studentId);
    
    window.showToast('✅ Élève supprimé avec succès', 'success');
    window.renderAdminEleves();
  } catch (error) {
    console.error("Erreur lors de la suppression :", error);
    alert("Erreur lors de la suppression : " + error.message);
  }
};
"""

# Append to window exports section
content = content.replace("window.showToast = showToast;", "window.showToast = showToast;\n" + delete_student_code)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(content)
