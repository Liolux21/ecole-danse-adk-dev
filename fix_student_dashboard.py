import re

def fix_student_dashboard():
    with open('js/app.js', 'r', encoding='utf-8') as f:
        app_js = f.read()

    # 1. Fix isTeacher logic
    old_isteacher = "const isTeacher = user && (user.role === 'admin' || user.realRole === 'admin' || (c.prof && c.prof.includes(user.name)));"
    new_isteacher = "const isTeacher = user && (user.role === 'admin' || user.realRole === 'admin' || (user.role === 'prof' && c.prof && (c.prof.includes(user.name) || c.prof.includes(user.firstname))));"
    app_js = app_js.replace(old_isteacher, new_isteacher)
    
    # 2. Fix Présence button visibility
    old_presence = "if (user && user.role === 'parent' && studentId) {"
    new_presence = "if (user && (user.role === 'parent' || user.role === 'eleve' || user.role === 'student') && studentId) {"
    app_js = app_js.replace(old_presence, new_presence)
    
    # 3. Fix Mutuelle visibility
    old_mutuelle = """  const mutStatus = child.mutuelle || 'masque';
  const mutClass = mutStatus === 'remis' ? 'pill-approved' : (mutStatus === 'en_cours' ? 'pill-pending' : 'pill-rejected');
  const mutLabel = mutStatus === 'remis' ? '✅ Remis' : (mutStatus === 'en_cours' ? '⏳ En cours' : '❌ En attente');
  document.getElementById('parent-stat-mutuelle').innerHTML = (mutStatus === 'masque') ? '<span style="color:#aaa; font-size:0.85rem;">Masqué</span>' : `<span class="status-pill ${mutClass}">${mutLabel}</span>`;"""
  
    # Wait, the source code has encoding artifacts: "masque", "remis", "en_cours", "pill-approved", "pill-pending", "pill-rejected", "✅", "⏳", "❌", "Masqué"
    # Let me just use regex to replace it robustly.
    
    mutuelle_pattern = r"(const mutStatus = child\.mutuelle \|\| 'masque';[\s\S]*?)(document\.getElementById\('parent-stat-mutuelle'\)\.innerHTML = [^;]+;)"
    
    def replacer(match):
        return match.group(1) + """const mutEl = document.getElementById('parent-stat-mutuelle');
  if (mutStatus === 'masque') {
    if (mutEl && mutEl.parentElement) mutEl.parentElement.style.display = 'none';
  } else {
    if (mutEl && mutEl.parentElement) mutEl.parentElement.style.display = 'flex';
    mutEl.innerHTML = `<span class="status-pill ${mutClass}">${mutLabel}</span>`;
  }"""
        
    app_js = re.sub(mutuelle_pattern, replacer, app_js)
    
    with open('js/app.js', 'w', encoding='utf-8') as f:
        f.write(app_js)
        
    print("Fixed app.js")

fix_student_dashboard()
