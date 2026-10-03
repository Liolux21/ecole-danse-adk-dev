import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    content = f.read()

old_logic = '''      const userEmail = (user.email || "").toLowerCase();
      const hasStudents = DATA.students.some(s => (s.parentId || "").toLowerCase() === userEmail || (s.contactEmail || "").toLowerCase() === userEmail);
      let switchBtn = document.getElementById('prof-switch-btn');
      if (hasStudents && user.realRole !== 'admin') {'''

new_logic = '''      const children = DATA.getChildrenByParent(user);
      const hasStudents = children.length > 0;
      let switchBtn = document.getElementById('prof-switch-btn');
      if (hasStudents && user.realRole !== 'admin') {'''

if old_logic in content:
    content = content.replace(old_logic, new_logic)
    with open('js/app.js', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Replaced!")
else:
    print("Not found!")
