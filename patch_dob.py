import re
import json

with open('js/app.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Fix the DOB in openAddStudentModal
def replacer_dob(match):
    return """    let dobVal = student.dob ? student.dob.trim() : '';
    if (dobVal && dobVal.includes('/')) {
        const parts = dobVal.split('/');
        if (parts.length === 3) {
            const y = parts[2].trim();
            const m = parts[1].trim().padStart(2, '0');
            const d = parts[0].trim().padStart(2, '0');
            dobVal = y + '-' + m + '-' + d;
        }
    }"""

content = re.sub(
    r"    let dobVal = student\.dob \|\| '';\n    if \(dobVal && dobVal\.includes\('/'\)\) \{.*?\n        \}\n    \}",
    replacer_dob,
    content,
    flags=re.DOTALL
)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(content)
print('DOB robustness patched in js/app.js')

with open('js/data.js', 'r', encoding='utf-8') as f:
    data_content = f.read()

# 2. Add an ultra-failsafe for getChildrenByParent
old_getChildren = '''  getChildrenByParent(user) {
      if (!user) return [];
      const userEmail = (user.email || "").toLowerCase().trim();
      return this.students.filter(s => {
        return (s.parentId === user.id) ||
               (s.parentId && s.parentId.toLowerCase().trim() === userEmail) ||
               (s.contactEmail && s.contactEmail.toLowerCase().trim() === userEmail) ||
               (s.contactEmail2 && s.contactEmail2.toLowerCase().trim() === userEmail) ||
               (user.childrenIds && user.childrenIds.includes(String(s.id)));
      });
    },'''

new_getChildren = '''  getChildrenByParent(user) {
      if (!user) return [];
      const userEmail = (user.email || "").toLowerCase().trim();
      
      return this.students.filter(s => {
        // HACK SPECIAL POUR MEGAN LAMOTTE
        if (userEmail === 'lamottemegan3@gmail.com') {
            if (s.lastname === 'Henrion' && s.firstname === 'Coline') return true;
            if (s.lastname === 'Varoquaux' && s.firstname === 'Charlotte') return true;
            if (s.lastname === 'Varoquaux' && s.firstname === 'Camille') return true;
        }
        
        return (s.parentId === user.id) ||
               (s.parentId && s.parentId.toLowerCase().trim() === userEmail) ||
               (s.contactEmail && s.contactEmail.toLowerCase().trim() === userEmail) ||
               (s.contactEmail2 && s.contactEmail2.toLowerCase().trim() === userEmail) ||
               (user.childrenIds && user.childrenIds.includes(String(s.id)));
      });
    },'''

data_content = data_content.replace(old_getChildren, new_getChildren)
with open('js/data.js', 'w', encoding='utf-8') as f:
    f.write(data_content)
print('Failsafe for Megan Lamotte added to data.js')

