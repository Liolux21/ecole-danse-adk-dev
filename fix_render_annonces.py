import re

def fix_render_user_annonces():
    with open('js/app.js', 'r', encoding='utf-8') as f:
        app_js = f.read()

    # 1. Update the function signature and currentUser reference
    old_func = """function renderUserAnnonces(role) {
  const containerId = role === 'parent' ? 'parent-announcements-list' : 'prof-announcements-list';
  const wrapperId = role === 'parent' ? 'parent-announcements-container' : 'prof-announcements-container';
  const fullContainerId = role === 'parent' ? 'parent-notifications-full-list' : 'prof-notifications-full-list';
  const badgeId = role === 'parent' ? 'parent-notif-badge' : 'prof-notif-badge';
  
  const container = document.getElementById(containerId);
  const wrapper = document.getElementById(wrapperId);
  const fullContainer = document.getElementById(fullContainerId);
  const badge = document.getElementById(badgeId);
  
  if (!container || !wrapper || !fullContainer) return;

  const currentUser = window.AUTH.currentUser;"""
  
    new_func = """function renderUserAnnonces(role, userCtx) {
  const containerId = role === 'parent' ? 'parent-announcements-list' : 'prof-announcements-list';
  const wrapperId = role === 'parent' ? 'parent-announcements-container' : 'prof-announcements-container';
  const fullContainerId = role === 'parent' ? 'parent-notifications-full-list' : 'prof-notifications-full-list';
  const badgeId = role === 'parent' ? 'parent-notif-badge' : 'prof-notif-badge';
  
  const container = document.getElementById(containerId);
  const wrapper = document.getElementById(wrapperId);
  const fullContainer = document.getElementById(fullContainerId);
  const badge = document.getElementById(badgeId);
  
  if (!container || !wrapper || !fullContainer) return;

  const currentUser = userCtx || window.AUTH.currentUser;"""

    if old_func in app_js:
        app_js = app_js.replace(old_func, new_func)
    else:
        print("COULD NOT FIND FUNCTION DEF")

    # 2. Update the calls
    app_js = app_js.replace("renderUserAnnonces('prof');", "renderUserAnnonces('prof', user);")
    app_js = app_js.replace("renderUserAnnonces('parent');", "renderUserAnnonces('parent', user);")

    with open('js/app.js', 'w', encoding='utf-8') as f:
        f.write(app_js)
    
    print("Fixed renderUserAnnonces")

fix_render_user_annonces()
