import re

with open('js/auth.js', 'r', encoding='utf-8') as f:
    content = f.read()

bad_line = "              if (user.email && user.email.toLowerCase() === 'lionel.henrion@gmail.com') { const adminData = { email: user.email, name: 'Lionel Henrion', role: 'admin' }; await setDoc(docRef, adminData); this.currentUser = { ...adminData, id: user.email, uid: user.uid }; } else { this.currentUser = { email: user.email, role: 'eleve' }; // Fallback }"

good_lines = """              if (user.email && user.email.toLowerCase() === 'lionel.henrion@gmail.com') {
                const adminData = { email: user.email, name: 'Lionel Henrion', role: 'admin' };
                await setDoc(docRef, adminData);
                this.currentUser = { ...adminData, id: user.email, uid: user.uid };
              } else {
                this.currentUser = { email: user.email, role: 'eleve' };
              }"""

content = content.replace(bad_line, good_lines)

with open('js/auth.js', 'w', encoding='utf-8') as f:
    f.write(content)
