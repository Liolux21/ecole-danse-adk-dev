import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

old_show = """  // Handle Prof <-> Parent switching
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
  }"""

new_show = """  // Handle Role Switching (Prof <-> Parent, Admin <-> Prof)
  if (user.role === 'admin') {
    let adminSwitchBtn = document.getElementById('admin-switch-btn');
    if (!adminSwitchBtn) {
      adminSwitchBtn = document.createElement('button');
      adminSwitchBtn.id = 'admin-switch-btn';
      adminSwitchBtn.className = 'btn btn-outline btn-sm';
      adminSwitchBtn.innerHTML = '🔄 Espace Prof (Appel)';
      adminSwitchBtn.onclick = () => {
        const profUser = { ...user, role: 'prof', realRole: 'admin' };
        showPortalDashboard(profUser);
      };
      const logoutBtn = document.getElementById('admin-logout');
      if (logoutBtn && logoutBtn.parentNode) {
        logoutBtn.parentNode.insertBefore(adminSwitchBtn, logoutBtn);
      }
    }
  } else if (user.role === 'prof') {
    let profToAdminBtn = document.getElementById('prof-to-admin-btn');
    if (user.realRole === 'admin') {
      if (!profToAdminBtn) {
        profToAdminBtn = document.createElement('button');
        profToAdminBtn.id = 'prof-to-admin-btn';
        profToAdminBtn.className = 'btn btn-outline btn-sm';
        profToAdminBtn.innerHTML = '🔄 Espace Admin';
        profToAdminBtn.onclick = () => {
          const originalUser = { ...user, role: 'admin' };
          delete originalUser.realRole;
          showPortalDashboard(originalUser);
        };
        const logoutBtn = document.getElementById('prof-logout');
        if (logoutBtn && logoutBtn.parentNode) {
          logoutBtn.parentNode.insertBefore(profToAdminBtn, logoutBtn);
        }
      }
    } else if (profToAdminBtn) {
      profToAdminBtn.remove();
    }

    const hasStudents = DATA.students.some(s => s.parentId === user.id || s.parentId === user.email || s.contactEmail === user.email);
    let switchBtn = document.getElementById('prof-switch-btn');
    if (hasStudents && user.realRole !== 'admin') {
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
  }"""

js = js.replace(old_show, new_show)

old_prof_dash = """  const taughtCourseIds = DATA.courses.filter(c => c.prof && c.prof.includes(user.name)).map(c => c.id);
    
    let selectedCourseId = taughtCourseIds[0] || null;"""

new_prof_dash = """  let taughtCourseIds = [];
    if (user.realRole === 'admin') {
      // Admin sees ALL courses when in Prof dashboard
      taughtCourseIds = DATA.courses.map(c => c.id);
    } else {
      taughtCourseIds = DATA.courses.filter(c => c.prof && c.prof.includes(user.name)).map(c => c.id);
    }
    
    let selectedCourseId = taughtCourseIds[0] || null;"""

js = js.replace(old_prof_dash, new_prof_dash)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
