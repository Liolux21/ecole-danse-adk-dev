import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    app = f.read()

# 1. Add markAnnonceAsRead globally
mark_read_fn = '''
window.markAnnonceAsRead = async function(annonceId) {
  if (!AUTH.currentUser) return;
  const user = AUTH.currentUser;
  if (!user.readAnnouncements) {
    user.readAnnouncements = [];
  }
  if (!user.readAnnouncements.includes(annonceId)) {
    user.readAnnouncements.push(annonceId);
    try {
      const firebase = await import('./firebase-config.js');
      await firebase.updateDoc(firebase.doc(firebase.db, "users", user.id), {
        readAnnouncements: user.readAnnouncements
      });
      // Synchronisation optionnelle, mais le currentUser est mis à jour
      if (user.role === 'prof') renderUserAnnonces('prof');
      if (user.role === 'parent') renderUserAnnonces('parent');
    } catch (e) {
      console.error("Erreur markAnnonceAsRead:", e);
    }
  }
};
'''
if 'window.markAnnonceAsRead' not in app:
    app = app.replace('window.deleteAnnonce = async function(id) {', mark_read_fn + '\nwindow.deleteAnnonce = async function(id) {')

# 2. Update renderUserAnnonces
new_renderUserAnnonces = '''
function renderUserAnnonces(role) {
  const containerId = role === 'parent' ? 'parent-announcements-list' : 'prof-announcements-list';
  const wrapperId = role === 'parent' ? 'parent-announcements-container' : 'prof-announcements-container';
  const fullContainerId = role === 'parent' ? 'parent-notifications-full-list' : 'prof-notifications-full-list';
  const badgeId = role === 'parent' ? 'parent-notif-badge' : 'prof-notif-badge';
  
  const container = document.getElementById(containerId);
  const wrapper = document.getElementById(wrapperId);
  const fullContainer = document.getElementById(fullContainerId);
  const badge = document.getElementById(badgeId);
  
  if (!container || !wrapper || !fullContainer) return;

  const currentUser = window.AUTH.currentUser;
  const readAnnouncements = currentUser.readAnnouncements || [];

  // Determine user's course IDs
  let userCourseIds = [];
  if (role === 'parent') {
    const children = DATA.students.filter(s => (currentUser.childrenIds || []).includes(s.id));
    children.forEach(ch => {
      if (ch.courseIds) {
        ch.courseIds.forEach(cid => {
          if (!userCourseIds.includes(String(cid))) userCourseIds.push(String(cid));
        });
      }
    });
  } else if (role === 'prof') {
    userCourseIds = (currentUser.courseIds || []).map(String);
  }

  // Filter announcements aimed at this user
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

  const unreadAnnouncements = visibleAnnouncements.filter(ann => !readAnnouncements.includes(ann.id));

  // Update Badge
  if (badge) {
    if (unreadAnnouncements.length > 0) {
      badge.style.display = 'inline-block';
      badge.textContent = unreadAnnouncements.length;
    } else {
      badge.style.display = 'none';
    }
  }

  // 1. MAIN DASHBOARD (Unread only)
  if (unreadAnnouncements.length === 0) {
    wrapper.style.display = 'none';
  } else {
    wrapper.style.display = 'block';
    container.innerHTML = unreadAnnouncements.map(ann => {
      const date = new Date(ann.timestamp).toLocaleString('fr-FR', {day:'2-digit', month:'2-digit', year:'numeric', hour:'2-digit', minute:'2-digit'});
      return `
        <div class="parent-notification-banner" style="display:flex; flex-direction:column; align-items:flex-start; gap:0.5rem; margin-bottom:0; position:relative;">
          <button onclick="markAnnonceAsRead('${ann.id}')" class="btn btn-outline btn-sm" style="position:absolute; top:1rem; right:1rem; border-color:#9C5858; color:#9C5858; padding:0.2rem 0.5rem; font-size:0.8rem;">✓ Lu</button>
          <div style="font-size:0.8rem; color:var(--primary); font-weight:600;">Administration ADK &bull; Le ${date}</div>
          <h4 style="margin:0; color:var(--primary); font-size:1.1rem; padding-right: 3rem;">${ann.title}</h4>
          <div style="white-space:pre-wrap; color:var(--text-light); font-size:0.95rem; line-height:1.4;">${ann.content}</div>
        </div>
      `;
    }).join('');
  }

  // 2. FULL NOTIFICATIONS TAB (All)
  if (visibleAnnouncements.length === 0) {
    fullContainer.innerHTML = '<div style="text-align:center; padding:2rem; color:var(--text-muted);">Aucune notification.</div>';
  } else {
    fullContainer.innerHTML = visibleAnnouncements.map(ann => {
      const date = new Date(ann.timestamp).toLocaleString('fr-FR', {day:'2-digit', month:'2-digit', year:'numeric', hour:'2-digit', minute:'2-digit'});
      const isRead = readAnnouncements.includes(ann.id);
      const styleOpacity = isRead ? 'opacity:0.6;' : 'opacity:1;';
      const readBtn = !isRead ? `<button onclick="markAnnonceAsRead('${ann.id}')" class="btn btn-outline btn-sm" style="position:absolute; top:1rem; right:1rem; border-color:#9C5858; color:#9C5858; padding:0.2rem 0.5rem; font-size:0.8rem;">✓ Lu</button>` : '';

      return `
        <div class="parent-notification-banner" style="display:flex; flex-direction:column; align-items:flex-start; gap:0.5rem; margin-bottom:0; position:relative; ${styleOpacity}">
          ${readBtn}
          <div style="font-size:0.8rem; color:var(--primary); font-weight:600;">Administration ADK &bull; Le ${date}</div>
          <h4 style="margin:0; color:var(--primary); font-size:1.1rem; padding-right: 3rem;">${ann.title}</h4>
          <div style="white-space:pre-wrap; color:var(--text-light); font-size:0.95rem; line-height:1.4;">${ann.content}</div>
        </div>
      `;
    }).join('');
  }
}
'''
app = re.sub(r'function renderUserAnnonces\(role\) \{.*?\}\n', new_renderUserAnnonces, app, flags=re.DOTALL)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(app)

print('app.js updated')
