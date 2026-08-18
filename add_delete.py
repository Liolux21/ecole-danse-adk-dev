import re

# 1. Update firebase-config.js
with open('js/firebase-config.js', 'r', encoding='utf-8') as f:
    fc = f.read()
if 'deleteDoc' not in fc:
    fc = fc.replace('updateDoc, addDoc', 'updateDoc, addDoc, deleteDoc')
    fc = fc.replace('export { \n  app, auth, db', 'export { \n  deleteDoc, app, auth, db')
    with open('js/firebase-config.js', 'w', encoding='utf-8') as f:
        f.write(fc)

# 2. Update app.js
with open('js/app.js', 'r', encoding='utf-8') as f:
    app = f.read()

# Add delete button to renderAdminEleves
old_td = "<td><button class=\"btn btn-outline btn-sm\" onclick=\"openAddStudentModal('${s.id}')\">Modifier</button></td>"
new_td = """<td style="display:flex;gap:0.5rem;align-items:center;height:100%;">
        <button class="btn btn-outline btn-sm" onclick="openAddStudentModal('${s.id}')">Modifier</button>
        <button class="btn btn-outline btn-sm" style="color:#e74c3c;border-color:#e74c3c;padding:0.2rem 0.5rem;" onclick="deleteStudent('${s.id}')">X</button>
      </td>"""
if old_td in app:
    app = app.replace(old_td, new_td)
else:
    print("Could not find td to replace")

# Add deleteStudent function
del_func = """
window.deleteStudent = async function(id) {
  if (!confirm('Êtes-vous sûr de vouloir supprimer cet élève ? (Action irréversible)')) return;
  try {
    const firebase = await import('./firebase-config.js');
    await firebase.deleteDoc(firebase.doc(firebase.db, "students", id));
    await DATA.syncFromFirebase();
    renderAdminEleves();
    showToast('Élève supprimé', 'success');
  } catch(e) {
    console.error(e);
    showToast('Erreur lors de la suppression', 'error');
  }
};
"""
if 'window.deleteStudent' not in app:
    app = app + del_func

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(app)

print('Added deleteStudent')
