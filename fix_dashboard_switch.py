import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# We need to inject the logic into `showPortalDashboard`
old_show = """function showPortalDashboard(user) {
  document.getElementById('portal-login-wrapper').style.display = 'none';
  document.querySelectorAll('.dashboard-panel').forEach(p => p.classList.remove('active'));
  const panel = document.getElementById(`panel-${user.role}`);
  if (panel) panel.classList.add('active');

  const avatarEl = document.getElementById(`${user.role}-avatar`);
  if (avatarEl) {
    if (user.avatarUrl) {
      avatarEl.style.backgroundImage = `url(${user.avatarUrl})`;
      avatarEl.style.backgroundSize = 'cover';
      avatarEl.style.backgroundPosition = 'center';
      avatarEl.textContent = '';
    } else {
      avatarEl.style.backgroundImage = 'none';
      avatarEl.textContent = user.avatar || (user.name ? user.name[0] : 'U');
    }
  }

  if (user.role === 'admin')  renderAdminDashboard(user);
  if (user.role === 'prof')   renderProfDashboard(user);
  if (user.role === 'parent') renderParentDashboard(user);"""

new_show = """function showPortalDashboard(user) {
  document.getElementById('portal-login-wrapper').style.display = 'none';
  document.querySelectorAll('.dashboard-panel').forEach(p => p.classList.remove('active'));
  const panel = document.getElementById(`panel-${user.role}`);
  if (panel) panel.classList.add('active');

  const avatarEl = document.getElementById(`${user.role}-avatar`);
  if (avatarEl) {
    if (user.avatarUrl) {
      avatarEl.style.backgroundImage = `url(${user.avatarUrl})`;
      avatarEl.style.backgroundSize = 'cover';
      avatarEl.style.backgroundPosition = 'center';
      avatarEl.textContent = '';
    } else {
      avatarEl.style.backgroundImage = 'none';
      avatarEl.textContent = user.avatar || (user.name ? user.name[0] : 'U');
    }
  }

  // Handle Prof <-> Parent switching
  if (user.role === 'prof') {
    const hasStudents = DATA.students.some(s => s.parentId === user.id || s.parentId === user.email || s.contactEmail === user.email);
    let switchBtn = document.getElementById('prof-switch-btn');
    if (hasStudents) {
      if (!switchBtn) {
        switchBtn = document.createElement('button');
        switchBtn.id = 'prof-switch-btn';
        switchBtn.className = 'btn btn-outline btn-sm';
        switchBtn.innerHTML = '🔄 Espace Élève';
        switchBtn.onclick = () => {
          const parentUser = { ...user, role: 'parent', realRole: 'prof' };
          showPortalDashboard(parentUser);
        };
        const logoutBtn = document.getElementById('prof-logout');
        if (logoutBtn && logoutBtn.parentNode) {
          logoutBtn.parentNode.insertBefore(switchBtn, logoutBtn);
        }
      }
    } else if (switchBtn) {
      switchBtn.remove();
    }
  } else if (user.role === 'parent') {
    let parentSwitchBtn = document.getElementById('parent-switch-btn');
    if (user.realRole === 'prof' || user.realRole === 'admin') {
      if (!parentSwitchBtn) {
        parentSwitchBtn = document.createElement('button');
        parentSwitchBtn.id = 'parent-switch-btn';
        parentSwitchBtn.className = 'btn btn-outline btn-sm';
        parentSwitchBtn.innerHTML = user.realRole === 'prof' ? '🔄 Espace Prof' : '🔄 Espace Admin';
        parentSwitchBtn.onclick = () => {
          const originalUser = { ...user, role: user.realRole };
          delete originalUser.realRole;
          showPortalDashboard(originalUser);
        };
        const logoutBtn = document.getElementById('parent-logout');
        if (logoutBtn && logoutBtn.parentNode) {
          logoutBtn.parentNode.insertBefore(parentSwitchBtn, logoutBtn);
        }
      }
    } else if (parentSwitchBtn) {
      parentSwitchBtn.remove();
    }
  }

  if (user.role === 'admin')  renderAdminDashboard(user);
  if (user.role === 'prof')   renderProfDashboard(user);
  if (user.role === 'parent') renderParentDashboard(user);"""

js = js.replace(old_show, new_show)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
