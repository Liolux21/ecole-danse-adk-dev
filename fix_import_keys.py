import re

with open('import_and_print.html', 'r', encoding='utf-8') as f:
    im_html = f.read()

# Fix keys to match app.js
old_add_doc = """                const studentRef = await addDoc(collection(db, 'students'), {
                    firstName: student.studentFirstName,
                    lastName: student.studentLastName,
                    dob: student.dob,
                    parentEmail: email,
                    coursesRaw: student.coursesRaw,
                    status: 'actif',
                    createdAt: new Date().toISOString()
                });"""

new_add_doc = """                const studentRef = await addDoc(collection(db, 'students'), {
                    firstname: student.studentFirstName,
                    lastname: student.studentLastName,
                    dob: student.dob,
                    contactEmail: email,
                    parentId: email,
                    coursesRaw: student.coursesRaw,
                    status: 'actif',
                    saison: "2026-2027",
                    createdAt: new Date().toISOString()
                });"""
im_html = im_html.replace(old_add_doc, new_add_doc)

with open('import_and_print.html', 'w', encoding='utf-8') as f:
    f.write(im_html)
