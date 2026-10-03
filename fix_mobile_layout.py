import re

# 1. Modify portail.html
with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Reduce title font size
html = html.replace('font-size: clamp(2rem, 8vw, 3.5rem);', 'font-size: clamp(1.6rem, 5vw, 2.5rem);')

# Add id to subtitle
html = html.replace('<p class="vitrine-subtitle reveal reveal-delay-1" style="margin-bottom: 3rem; text-align: center;">Connectez-vous', '<p id="portal-subtitle" class="vitrine-subtitle reveal reveal-delay-1" style="margin-bottom: 3rem; text-align: center;">Connectez-vous')

# Add dash-header-actions class
html = html.replace('<div style="display:flex; gap:0.5rem;">\n                <button class="btn btn-outline btn-sm" onclick="openProfileModal()">', '<div class="dash-header-actions" style="display:flex; gap:0.5rem;">\n                <button class="btn btn-outline btn-sm" onclick="openProfileModal()">')

# Make sure all dash-header-actions are matched if it wasn't exact. Let's do regex to be safe:
# Find: <div style="display:flex; gap:0.5rem;"> followed by button openProfileModal
pattern_actions = r'(<div style="display:flex; gap:0.5rem;">\s*<button class="btn btn-outline btn-sm" onclick="openProfileModal\(\)">)'
html = re.sub(pattern_actions, r'<div class="dash-header-actions" style="display:flex; gap:0.5rem;">\n                <button class="btn btn-outline btn-sm" onclick="openProfileModal()">', html)
# Actually, the string replacement above might fail due to exact spacing, so regex is better:
html = re.sub(r'<div style="display:flex; gap:0.5rem;">(\s*<button class="btn btn-outline btn-sm" onclick="openProfileModal\(\)">)', r'<div class="dash-header-actions" style="display:flex; gap:0.5rem;">\1', html)


# Add CSS for dash-header-actions
css_media = """    @media (max-width: 768px) {
      .dash-header-actions {
        flex-direction: column;
        align-items: stretch;
      }
      .dash-header-actions button {
        width: 100%;
        margin-bottom: 0.25rem;
      }
    }"""
if 'dash-header-actions' not in html[:html.find('</style>')]:
    html = html.replace('</style>', css_media + '\n  </style>')

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(html)

# 2. Modify js/app.js
with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Hide subtitle when showing dashboard
show_dashboard_old = """function showPortalDashboard(user) {
  if (!user) return;
  document.getElementById('portal-login-wrapper').style.display = 'none';
  document.getElementById('portal-dashboard-wrapper').style.display = 'block';"""

show_dashboard_new = """function showPortalDashboard(user) {
  if (!user) return;
  document.getElementById('portal-login-wrapper').style.display = 'none';
  document.getElementById('portal-dashboard-wrapper').style.display = 'block';
  const subtitle = document.getElementById('portal-subtitle');
  if (subtitle) subtitle.style.display = 'none';"""

if 'subtitle.style.display' not in js:
    js = js.replace(show_dashboard_old, show_dashboard_new)

# Show subtitle on logout
logout_old = """      document.getElementById('portal-login-wrapper').style.display = 'flex';
      document.getElementById('portal-dashboard-wrapper').style.display = 'none';"""

logout_new = """      document.getElementById('portal-login-wrapper').style.display = 'flex';
      document.getElementById('portal-dashboard-wrapper').style.display = 'none';
      const subtitle = document.getElementById('portal-subtitle');
      if (subtitle) subtitle.style.display = 'block';"""

if 'subtitle.style.display = \'block\'' not in js:
    js = js.replace(logout_old, logout_new)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
