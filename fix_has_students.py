import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

pattern = r'const hasStudents = DATA\.students\.some\(s => s\.parentId === user\.id \|\| s\.parentId === user\.email \|\| s\.contactEmail === user\.email\);'
replacement = r'''const userEmail = (user.email || "").toLowerCase();
    const hasStudents = DATA.students.some(s => (s.parentId || "").toLowerCase() === userEmail || (s.contactEmail || "").toLowerCase() === userEmail);'''

js = re.sub(pattern, replacement, js)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
