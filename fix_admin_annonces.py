import re

def fix_admin_annonces():
    with open('js/app.js', 'r', encoding='utf-8') as f:
        app_js = f.read()

    # The corrupted block in renderAdminAnnonces:
    old_admin = """    if (ann.target.startsWith('course_')) {
      const cid = ann.target.replace('course_', '');
      const c = DATA.getCourseById(cid);
      targetLabel = c ? `Cours: ${c.name}
      if (ann.target.startsWith('prof_course_') && role === 'prof') {
        const cid = ann.target.replace('prof_course_', '');
        if (userCourseIds.includes(String(cid))) return true;
      }` : `Cours supprimé`;
    }"""
    
    # Wait, the character is `Cours supprimǸ` because of encoding! I will use regex!
    
    match_str = r"if \(ann\.target\.startsWith\('course_'\)\) \{\s*const cid = ann\.target\.replace\('course_', ''\);\s*const c = DATA\.getCourseById\(cid\);\s*targetLabel = c \? `Cours: \$\{c\.name\}[\s\S]*?` : `Cours supprim[^`]+`;\s*\}"
    
    new_admin = """if (ann.target.startsWith('course_')) {
      const cid = ann.target.replace('course_', '');
      const c = DATA.getCourseById(cid);
      targetLabel = c ? `Cours: ${c.name}` : `Cours supprimé`;
    }
    if (ann.target.startsWith('prof_course_')) {
      const cid = ann.target.replace('prof_course_', '');
      const c = DATA.getCourseById(cid);
      targetLabel = c ? `Prof du cours: ${c.name}` : `Prof du cours supprimé`;
    }"""
    
    app_js = re.sub(match_str, new_admin, app_js)
    
    with open('js/app.js', 'w', encoding='utf-8') as f:
        f.write(app_js)
        
    print("Fixed admin annonces")

fix_admin_annonces()
