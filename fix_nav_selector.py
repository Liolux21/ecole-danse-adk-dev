import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

nav_old = """window.openAdminHours = function() {
  document.querySelectorAll('#admin-panel .tab-content').forEach(c => c.classList.remove('active'));
  const hoursTab = document.getElementById('tab-admin-hours');
  if (hoursTab) hoursTab.classList.add('active');
};

window.closeAdminHours = function() {
  document.querySelectorAll('#admin-panel .tab-content').forEach(c => c.classList.remove('active'));
  const profsTab = document.getElementById('tab-profs');
  if (profsTab) profsTab.classList.add('active');
};"""

nav_new = """window.openAdminHours = function() {
  document.querySelectorAll('#panel-admin .tab-content').forEach(c => c.classList.remove('active'));
  const hoursTab = document.getElementById('tab-admin-hours');
  if (hoursTab) {
    hoursTab.classList.add('active');
    // Ensure renderAdminHours is called so data is loaded
    if (typeof window.renderAdminHours === 'function') {
      window.renderAdminHours();
    }
  }
};

window.closeAdminHours = function() {
  document.querySelectorAll('#panel-admin .tab-content').forEach(c => c.classList.remove('active'));
  const profsTab = document.getElementById('tab-profs');
  if (profsTab) profsTab.classList.add('active');
};"""

js = js.replace(nav_old, nav_new)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
