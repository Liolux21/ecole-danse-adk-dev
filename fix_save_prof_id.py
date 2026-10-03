import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

old_loop = """      if (profChanged) {
        c.prof = newProfString;
        try {
          await firebase.updateDoc(firebase.doc(firebase.db, 'courses', String(c.id)), { prof: c.prof });
        } catch (e) {
          console.warn("Could not update course in Firebase: ", c.id, e);
          // If it doesn't exist, we could create it, but usually courses should exist.
        }
      }"""

new_loop = """      if (profChanged) {
        c.prof = newProfString;
        try {
          const targetDocId = c.docId || String(c.id);
          await firebase.updateDoc(firebase.doc(firebase.db, 'courses', targetDocId), { prof: c.prof });
        } catch (e) {
          console.warn("Could not update course in Firebase: ", c.id, e);
        }
      }"""

js = js.replace(old_loop, new_loop)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
