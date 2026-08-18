import re

with open('js/data.js', 'r', encoding='utf-8') as f:
    data = f.read()

old_getCourse = r"getCourseById\(id\)\s*\{\s*return this\.courses\.find\(c => c\.id === id\);\s*\}\,"
new_getCourse = r"getCourseById(id)             { return this.courses.find(c => String(c.id) === String(id)); },"

data = re.sub(old_getCourse, new_getCourse, data)

old_getStudent = r"getStudentById\(id\)\s*\{\s*return this\.students\.find\(s => s\.id === id\);\s*\}\,"
new_getStudent = r"getStudentById(id)            { return this.students.find(s => String(s.id) === String(id)); },"

data = re.sub(old_getStudent, new_getStudent, data)

old_getUser = r"getUserById\(id\)\s*\{\s*return this\.users\.find\(u => u\.id === id\);\s*\}\,"
new_getUser = r"getUserById(id)               { return this.users.find(u => String(u.id) === String(id)); },"

data = re.sub(old_getUser, new_getUser, data)

# Also check for courseIds.includes(cid)
old_getStudentsByCourse = r"getStudentsByCourse\(cid\)\s*\{\s*return this\.students\.filter\(s => s\.courseIds\.includes\(cid\)\);\s*\}\,"
new_getStudentsByCourse = r"getStudentsByCourse(cid)      { return this.students.filter(s => (s.courseIds||[]).map(String).includes(String(cid))); },"
data = re.sub(old_getStudentsByCourse, new_getStudentsByCourse, data)

with open('js/data.js', 'w', encoding='utf-8') as f:
    f.write(data)

print('js/data.js updated')
