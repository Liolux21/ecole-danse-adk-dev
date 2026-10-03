import re

with open('js/data.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Replace all `.push({ id: doc.id, ...doc.data() })` with `.push({ docId: doc.id, id: doc.id, ...doc.data() })`
# This ensures that even if `doc.data()` overwrites `id`, `docId` is preserved.
js = js.replace('this.users.push({ id: doc.id, ...doc.data() });', 'this.users.push({ docId: doc.id, id: doc.id, ...doc.data() });')
js = js.replace('this.students.push({ id: doc.id, ...sData });', 'this.students.push({ docId: doc.id, id: doc.id, ...sData });')
js = js.replace('this.courses.push({ id: doc.id, ...doc.data() });', 'this.courses.push({ docId: doc.id, id: doc.id, ...doc.data() });')
js = js.replace('this.inscriptions.push({ id: doc.id, ...doc.data() });', 'this.inscriptions.push({ docId: doc.id, id: doc.id, ...doc.data() });')

with open('js/data.js', 'w', encoding='utf-8') as f:
    f.write(js)
