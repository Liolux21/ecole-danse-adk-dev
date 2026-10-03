import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    content = f.read()

# I will replace the entire Handle Role Switching block
start_marker = "// Handle Role Switching (Prof <-> Parent, Admin <-> Prof)"
end_marker = "  if (user.role === 'admin')  renderAdminDashboard(user);"

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

new_block = """// Handle Role Switching (Prof <-> Parent, Admin <-> Prof)
  const isGodMode = user.email && user.email.toLowerCase() === 'lionel.henrion@gmail.com';
  
  if (isGodMode) {
    const logoutBtnId = user.role === 'admin' ? 'admin-logout' : (user.role === 'prof' ? 'prof-logout' : 'parent-logout');
    const logoutBtn = document.getElementById(logoutBtnId);
    
    if (logoutBtn && logoutBtn.parentNode) {
      // Remove any existing standard switchers
      ['admin-switch-btn', 'prof-to-admin-btn', 'prof-switch-btn', 'parent-switch-btn', 'god-mode-container'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.remove();
      });

      const godContainer = document.createElement('div');
      godContainer.id = 'god-mode-container';
      godContainer.style.display = 'flex';
      godContainer.style.gap = '0.5rem';
      
      const roles = [
        { role: 'admin', label: '👑 Admin' },
        { role: 'prof', label: '👨‍🏫 Prof' },
        { role: 'parent', label: '👨‍👩‍👧 Élève' }
      ];
      
      roles.forEach(r => {
        if (r.role !== user.role) {
          const btn = document.createElement('button');
          btn.className = 'btn btn-outline btn-sm dash-switch-btn';
          btn.style.fontSize = '0.7rem';
          btn.style.borderColor = '#e74c3c';
          btn.style.color = '#e74c3c';
          btn.innerHTML = r.label;
          btn.onclick = () => {
            const newUser = { ...user, role: r.role, isGodMode: true };
            if (r.role !== 'admin') newUser.realRole = 'admin';
            else delete newUser.realRole;
            showPortalDashboard(newUser);
          };
          godContainer.appendChild(btn);
        }
      });
      
      logoutBtn.parentNode.insertBefore(godContainer, logoutBtn);
    }
  } else {
    // Normal Role Switching
    if (user.role === 'admin') {
      let adminSwitchBtn = document.getElementById('admin-switch-btn');
      if (!adminSwitchBtn) {
        adminSwitchBtn = document.createElement('button');
        adminSwitchBtn.id = 'admin-switch-btn';
        adminSwitchBtn.className = 'btn btn-outline btn-sm dash-switch-btn';
          adminSwitchBtn.style.fontSize = '0.7rem';
          adminSwitchBtn.style.minWidth = '115px';
          
        adminSwitchBtn.innerHTML = '🔄 Espace Prof';
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
          profToAdminBtn.className = 'btn btn-outline btn-sm dash-switch-btn';
            profToAdminBtn.style.fontSize = '0.7rem';
            profToAdminBtn.style.minWidth = '115px';
            
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

      const userEmail = (user.email || "").toLowerCase();
      const hasStudents = DATA.students.some(s => (s.parentId || "").toLowerCase() === userEmail || (s.contactEmail || "").toLowerCase() === userEmail);
      let switchBtn = document.getElementById('prof-switch-btn');
      if (hasStudents && user.realRole !== 'admin') {
        if (!switchBtn) {
          switchBtn = document.createElement('button');
          switchBtn.id = 'prof-switch-btn';
          switchBtn.className = 'btn btn-outline btn-sm dash-switch-btn';
            switchBtn.style.fontSize = '0.7rem';
            switchBtn.style.minWidth = '115px';
            
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
          parentSwitchBtn.className = 'btn btn-outline btn-sm dash-switch-btn';
            parentSwitchBtn.style.fontSize = '0.7rem';
            parentSwitchBtn.style.minWidth = '115px';
            
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
  }

"""

content = content[:start_idx] + new_block + content[end_idx:]

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(content)
