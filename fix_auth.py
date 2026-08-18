import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Fix the auth replacement logic
old_auth = '''        try {
          const auth = getAuth();
          await createUserWithEmailAndPassword(auth, email, tempPassword);
        } catch(e) {'''

new_auth = '''        try {
          // Utilisation de l'API REST pour éviter la déconnexion automatique
          const apiKey = "AIzaSyBPOPRg9AxDqojhkskOIRO-4AHxvLICP7Q"; // Key from firebase-config.js
          const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password: tempPassword, returnSecureToken: false })
          });
          const data = await response.json();
          if (data.error) throw new Error(data.error.message);
        } catch(e) {'''

text = text.replace(old_auth, new_auth)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(text)
print("Auth fixed.")
