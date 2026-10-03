import re

with open('js/data.js', 'r', encoding='utf-8') as f:
    content = f.read()

old_logic = '''  getChildrenByParent(user) {
      if (!user) return [];
      const userEmail = (user.email || "").toLowerCase();
      return this.students.filter(s => {
        return (s.parentId === user.id) ||
               (s.parentId && s.parentId.toLowerCase() === userEmail) ||
               (s.contactEmail && s.contactEmail.toLowerCase() === userEmail) ||
               (s.contactEmail2 && s.contactEmail2.toLowerCase() === userEmail) ||
               (user.childrenIds && user.childrenIds.includes(String(s.id)));
      });
    },'''

new_logic = '''  getChildrenByParent(user) {
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

content = content.replace(old_logic, new_logic)

with open('js/data.js', 'w', encoding='utf-8') as f:
    f.write(content)
print("Trim patched!")
