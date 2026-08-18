import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    app = f.read()

# 1. Add Annonce functions
annonce_functions = """
// ==================== ANNONCES (BROADCAST) ====================

window.openAddAnnonceModal = function() {
  document.getElementById('form-add-annonce').reset();
  const targetSelect = document.getElementById('annonce-target');
  
  // Keep the first 3 options (All, Parents, Profs) and remove others if they exist
  while (targetSelect.options.length > 3) {
    targetSelect.remove(3);
  }
  
  // Add courses dynamically
  DATA.courses.forEach(c => {
    const opt = document.createElement('option');
    opt.value = "course_" + c.id;
    opt.textContent = `Cours: ${c.name || c.title} (${c.category || c.level || ''})`;
    targetSelect.appendChild(opt);
  });
  
  document.getElementById('modal-add-annonce').classList.add('active');
};

window.submitAddAnnonce = async function() {
  const btn = document.querySelector('#form-add-annonce button[type="submit"]');
  const originalText = btn.textContent;
  btn.textContent = "Publication...";
  btn.disabled = true;

  try {
    const firebase = await import('./firebase-config.js');
    const target = document.getElementById('annonce-target').value;
    const title = document.getElementById('annonce-title').value;
    const content = document.getElementById('annonce-content').value;

    await firebase.addDoc(firebase.collection(firebase.db, "announcements"), {
      target: target,
      title: title,
      content: content,
      timestamp: Date.now(),
      sender: "Administration ADK"
    });

    await DATA.syncFromFirebase();
    renderAdminAnnonces();
    closeModal('modal-add-annonce');
    showToast('Annonce publiée', 'success');
  } catch (err) {
    console.error(err);
    showToast('Erreur lors de la publication', 'error');
  } finally {
    btn.textContent = originalText;
    btn.disabled = false;
  }
};

window.deleteAnnonce = async function(id) {
  if (!confirm("Voulez-vous vraiment supprimer cette annonce ?")) return;
  try {
    const firebase = await import('./firebase-config.js');
    await firebase.deleteDoc(firebase.doc(firebase.db, "announcements", id));
    await DATA.syncFromFirebase();
    renderAdminAnnonces();
    showToast('Annonce supprimée', 'success');
  } catch (err) {
    console.error(err);
    showToast('Erreur', 'error');
  }
};

function renderAdminAnnonces() {
  const container = document.getElementById('admin-annonces-list');
  if (!container) return;
  
  if (!DATA.announcements || DATA.announcements.length === 0) {
    container.innerHTML = `<div style="text-align:center; padding:2rem; color:var(--text-muted); border:1px dashed var(--border); border-radius:8px;">Aucune annonce publiée.</div>`;
    return;
  }

  container.innerHTML = DATA.announcements.map(ann => {
    const date = new Date(ann.timestamp).toLocaleString('fr-FR', {day:'2-digit', month:'2-digit', year:'numeric', hour:'2-digit', minute:'2-digit'});
    let targetLabel = "Tous";
    if (ann.target === 'parents') targetLabel = "Tous les Parents";
    if (ann.target === 'profs') targetLabel = "Tous les Profs";
    if (ann.target.startsWith('course_')) {
      const cid = ann.target.replace('course_', '');
      const c = DATA.getCourseById(cid);
      targetLabel = c ? `Cours: ${c.name}` : `Cours supprimé`;
    }

    return `
      <div style="background:var(--dark-2); border:1px solid var(--border); border-radius:8px; padding:1.5rem; position:relative;">
        <button class="btn btn-outline btn-sm" style="position:absolute; top:1rem; right:1rem; color:#e74c3c; border-color:#e74c3c; padding:0.2rem 0.5rem;" onclick="deleteAnnonce('${ann.id}')">X</button>
        <div style="font-size:0.8rem; color:var(--gold); margin-bottom:0.5rem;">Cible: ${targetLabel} &bull; Le ${date}</div>
        <h4 style="margin:0 0 0.5rem 0;">${ann.title}</h4>
        <div style="white-space:pre-wrap; color:var(--text-muted); font-size:0.95rem;">${ann.content}</div>
      </div>
    `;
  }).join('');
}

function renderUserAnnonces(role) {
  const containerId = role === 'parent' ? 'parent-announcements-list' : 'prof-announcements-list';
  const wrapperId = role === 'parent' ? 'parent-announcements-container' : 'prof-announcements-container';
  const container = document.getElementById(containerId);
  const wrapper = document.getElementById(wrapperId);
  if (!container || !wrapper) return;

  // Determine user's course IDs
  let userCourseIds = [];
  if (role === 'parent') {
    const children = DATA.students.filter(s => (CURRENT_USER.childrenIds || []).includes(s.id));
    children.forEach(ch => {
      if (ch.courseIds) {
        ch.courseIds.forEach(cid => {
          if (!userCourseIds.includes(String(cid))) userCourseIds.push(String(cid));
        });
      }
    });
  } else if (role === 'prof') {
    userCourseIds = (CURRENT_USER.courseIds || []).map(String);
  }

  // Filter announcements
  const visibleAnnouncements = (DATA.announcements || []).filter(ann => {
    if (ann.target === 'all') return true;
    if (ann.target === 'parents' && role === 'parent') return true;
    if (ann.target === 'profs' && role === 'prof') return true;
    if (ann.target.startsWith('course_')) {
      const cid = ann.target.replace('course_', '');
      if (userCourseIds.includes(String(cid))) return true;
    }
    return false;
  });

  if (visibleAnnouncements.length === 0) {
    wrapper.style.display = 'none';
    return;
  }

  wrapper.style.display = 'block';
  container.innerHTML = visibleAnnouncements.map(ann => {
    const date = new Date(ann.timestamp).toLocaleString('fr-FR', {day:'2-digit', month:'2-digit', year:'numeric', hour:'2-digit', minute:'2-digit'});
    return `
      <div style="background:var(--dark-2); border-left:4px solid var(--gold); border-radius:4px; padding:1.5rem;">
        <div style="font-size:0.8rem; color:var(--gold); margin-bottom:0.5rem;">Administration ADK &bull; Le ${date}</div>
        <h4 style="margin:0 0 0.5rem 0;">${ann.title}</h4>
        <div style="white-space:pre-wrap; color:var(--text-muted); font-size:0.95rem;">${ann.content}</div>
      </div>
    `;
  }).join('');
}
"""

if 'window.openAddAnnonceModal' not in app:
    app += '\n' + annonce_functions

# 2. Add render calls
if 'renderAdminAnnonces()' not in app:
    app = app.replace('renderAdminGala();', 'renderAdminGala();\n    renderAdminAnnonces();')

if "renderUserAnnonces('parent');" not in app:
    # Inject into renderParentDashboard
    app = re.sub(r'(function renderParentDashboard\(\)\s*\{)', r'\1\n  renderUserAnnonces("parent");', app)

if "renderUserAnnonces('prof');" not in app:
    # Inject into renderProfDashboard
    app = re.sub(r'(function renderProfDashboard\(\)\s*\{)', r'\1\n  renderUserAnnonces("prof");', app)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(app)
print('app.js updated')
