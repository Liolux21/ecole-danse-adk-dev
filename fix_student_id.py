import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Replace find() with getStudentById in all three update functions
js = js.replace(
    'const student = DATA.students.find(st => st.id === studentId);',
    'const student = DATA.getStudentById(studentId);'
)

# And if `studentId` is an integer (e.g. 3) then firebase updateDoc to doc('students', '3') will be fine since doc requires string.
# But just to be safe, `String(studentId)` should be used.
js = js.replace(
    "await firebase.updateDoc(firebase.doc(firebase.db, 'students', studentId),",
    "await firebase.updateDoc(firebase.doc(firebase.db, 'students', String(studentId)),"
)

# Bump cache version just in case
with open('portail.html', 'r', encoding='utf-8') as pf:
    html = pf.read()
html = re.sub(r'src="js/app.js\?v=\d+"', 'src="js/app.js?v=28"', html)
with open('portail.html', 'w', encoding='utf-8') as pf:
    pf.write(html)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
