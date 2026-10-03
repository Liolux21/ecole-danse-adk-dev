import re

# 1. Update data.js getChildrenByParent
with open('js/data.js', 'r', encoding='utf-8') as f:
    js = f.read()

pattern_get = r'getChildrenByParent\(user\)       \{ \n      if \(!user\) return \[\];\n      return this\.students\.filter\(s => \{\n        return \(s\.parentId === user\.id\) \|\| \(s\.parentId === user\.email\) \|\| \(user\.childrenIds && \nuser\.childrenIds\.includes\(String\(s\.id\)\)\);\n      \}\);\n    \},'
replacement_get = '''getChildrenByParent(user) {
      if (!user) return [];
      const userEmail = (user.email || "").toLowerCase();
      return this.students.filter(s => {
        return (s.parentId === user.id) ||
               (s.parentId && s.parentId.toLowerCase() === userEmail) ||
               (s.contactEmail && s.contactEmail.toLowerCase() === userEmail) ||
               (user.childrenIds && user.childrenIds.includes(String(s.id)));
      });
    },'''
# Let's just do a regex replace in case the formatting is slightly off
js = re.sub(r'getChildrenByParent\(user\)[\s\S]*?\},', replacement_get, js)
with open('js/data.js', 'w', encoding='utf-8') as f:
    f.write(js)

# 2. Update app.js hasStudents
with open('js/app.js', 'r', encoding='utf-8') as f:
    app_js = f.read()

app_js = app_js.replace(
    'const hasStudents = DATA.students.some(s => (s.tutorEmail || "").toLowerCase() === userEmail || (s.email || "").toLowerCase() === userEmail || s.tutorId === user.id);',
    'const hasStudents = DATA.students.some(s => (s.contactEmail || "").toLowerCase() === userEmail || (s.email || "").toLowerCase() === userEmail || (s.parentId || "").toLowerCase() === userEmail);'
)

# 3. Add toLowerCase() for email in submitAddStudent
app_js = re.sub(
    r"const email = document\.getElementById\('add-student-email'\)\.value;",
    r"const email = document.getElementById('add-student-email').value.toLowerCase().trim();",
    app_js
)

# 4. Use VITRINE_DATA for Profs Avatars
pattern_avatar = r'(const pData = profTotals\[p\.id\] \|\| \{ total: 0, records: \[\] \};\n\s*const profName = p\.firstname \? `\$\{p\.firstname\} \$\{p\.lastname\}` : p\.name;)'
replacement_avatar = r'''\1
      let photoUrl = p.avatar || (p.gender === 'Féminin' ? '👩‍🏫' : '👨‍🏫');
      let avatarHtml = photoUrl.startsWith('http') || photoUrl.startsWith('assets/') ? `<img src="${photoUrl}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">` : photoUrl;
      const vitrineProf = window.VITRINE_DATA && window.VITRINE_DATA.professeurs ? window.VITRINE_DATA.professeurs[p.firstname || p.name] : null;
      if (vitrineProf && vitrineProf.avatar) {
          avatarHtml = `<img src="${vitrineProf.avatar}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`;
      }'''

app_js = re.sub(pattern_avatar, replacement_avatar, app_js)

# Replace the bubble rendering logic in renderAdminProfs
# Currently it looks like:
# <div style="width: 36px; height: 36px; border-radius: 50%; background-color: #f5e6e6; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; flex-shrink: 0;">${p.avatar || (p.gender === 'Féminin' ? '👩‍🏫' : '👨‍🏫')}</div>
pattern_render_avatar = r'<div style="width: 36px; height: 36px; border-radius: 50%; background-color: #f5e6e6; display: flex; align-items: center; justify-content: center; font-size: 1\.2rem; flex-shrink: 0;">\$\{p\.avatar \|\| \(p\.gender === \'Féminin\' \? \'👩‍🏫\' : \'👨‍🏫\'\)\}</div>'
replacement_render_avatar = r'<div style="width: 36px; height: 36px; border-radius: 50%; background-color: #f5e6e6; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; flex-shrink: 0; overflow: hidden;">${avatarHtml}</div>'
app_js = re.sub(pattern_render_avatar, replacement_render_avatar, app_js)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(app_js)
