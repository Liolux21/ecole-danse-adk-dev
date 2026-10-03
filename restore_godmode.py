import re

with open('js/auth.js', 'r', encoding='utf-8') as f:
    content = f.read()

fallback = """            if (docSnap.exists()) {
              this.currentUser = { ...docSnap.data(), id: docSnap.id, uid: user.uid };
            } else {
              if (user.email && user.email.toLowerCase() === 'lionel.henrion@gmail.com') {
                const adminData = { email: user.email, name: 'Lionel Henrion', role: 'admin' };
                await setDoc(docRef, adminData);
                this.currentUser = { ...adminData, id: user.email, uid: user.uid };
              } else {
                console.warn("Utilisateur authentifié mais pas trouvé dans Firestore.");
                this.currentUser = { email: user.email, role: 'eleve' }; // Fallback
              }
            }"""

content = re.sub(r'if \(docSnap\.exists\(\)\) \{[\s\S]*?\} else \{[\s\S]*?\} // Fallback\n            \}', fallback, content)

with open('js/auth.js', 'w', encoding='utf-8') as f:
    f.write(content)
