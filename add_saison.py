import re

# 1. Update app.js
with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Add saison to approveInscription studentData
old_approve_studentData = """      const studentData = {
        firstname: firstname || ins.childName,
        lastname: lastnameParts.join(' '),
        age: parseInt(ins.age, 10) || 0,
        contactEmail: emailKey,
        courseIds: courseIds,
        parentId: emailKey,
        cotisation: 'en attente',
        mutuelle: 'attente',
        absences: [],
        avatar: `https://i.pravatar.cc/150?u=${studentId}`
      };"""

new_approve_studentData = """      const studentData = {
        firstname: firstname || ins.childName,
        lastname: lastnameParts.join(' '),
        age: parseInt(ins.age, 10) || 0,
        contactEmail: emailKey,
        courseIds: courseIds,
        parentId: emailKey,
        cotisation: 'en attente',
        mutuelle: 'attente',
        absences: [],
        avatar: `https://i.pravatar.cc/150?u=${studentId}`,
        saison: "2026-2027"
      };"""
js = js.replace(old_approve_studentData, new_approve_studentData)

# Add saison to submitAddStudent studentData
old_submit_studentData = """      const studentData = {
        firstname: prenom,
        lastname: nom,
        dob: dob,
        age: age,
        tutorFirstname: tutorFirstname,
        tutorLastname: tutorLastname,
        tutorPhone: tutorPhone,
        contactEmail: email,
        courseIds: selectedCourses,
        parentId: email,
        absences: isNew ? [] : (DATA.getStudentById(studentId)?.absences || [])
      };"""

new_submit_studentData = """      const studentData = {
        firstname: prenom,
        lastname: nom,
        dob: dob,
        age: age,
        tutorFirstname: tutorFirstname,
        tutorLastname: tutorLastname,
        tutorPhone: tutorPhone,
        contactEmail: email,
        courseIds: selectedCourses,
        parentId: email,
        saison: "2026-2027",
        absences: isNew ? [] : (DATA.getStudentById(studentId)?.absences || [])
      };"""
js = js.replace(old_submit_studentData, new_submit_studentData)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)

# Bump cache
with open('portail.html', 'r', encoding='utf-8') as pf:
    html = pf.read()
html = re.sub(r'src="js/app.js\?v=\d+"', 'src="js/app.js?v=31"', html)
with open('portail.html', 'w', encoding='utf-8') as pf:
    pf.write(html)

# 2. Update import_and_print.html
with open('import_and_print.html', 'r', encoding='utf-8') as f:
    im_html = f.read()

# Fix keys to match app.js
old_add_doc = """                const studentRef = await addDoc(collection(db, 'students'), {
                    firstName: student.studentFirstName,
                    lastName: student.studentLastName,
                    dob: student.dob,
                    parentEmail: email,
                    coursesRaw: student.coursesRaw,
                    createdAt: serverTimestamp()
                });"""

new_add_doc = """                const studentRef = await addDoc(collection(db, 'students'), {
                    firstname: student.studentFirstName,
                    lastname: student.studentLastName,
                    dob: student.dob,
                    contactEmail: email,
                    parentId: email,
                    coursesRaw: student.coursesRaw,
                    saison: "2026-2027",
                    createdAt: serverTimestamp()
                });"""
im_html = im_html.replace(old_add_doc, new_add_doc)

with open('import_and_print.html', 'w', encoding='utf-8') as f:
    f.write(im_html)
