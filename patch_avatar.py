import re

with open('js/auth.js', 'r', encoding='utf-8') as f:
    content = f.read()

old_import = "import { auth, db, signInWithEmailAndPassword, signOut, onAuthStateChanged, sendPasswordResetEmail, doc, getDoc, updateEmail, updatePassword, reauthenticateWithCredential, EmailAuthProvider, setDoc, updateDoc, deleteDoc, firebaseConfig, createUserWithEmailAndPassword } from './firebase-config.js';"
new_import = "import { auth, db, storage, storageRef, uploadBytes, getDownloadURL, signInWithEmailAndPassword, signOut, onAuthStateChanged, sendPasswordResetEmail, doc, getDoc, updateEmail, updatePassword, reauthenticateWithCredential, EmailAuthProvider, setDoc, updateDoc, deleteDoc, firebaseConfig, createUserWithEmailAndPassword } from './firebase-config.js';"
content = content.replace(old_import, new_import)

old_profile = """      // 2. Mettre à jour Firestore
      const userRef = doc(db, "users", this.currentUser.email);
      const updates = {};
      if (newEmail !== this.currentUser.email) updates.email = newEmail;
      if (newTelephone !== undefined) updates.telephone = newTelephone;
      if (newAvatarBase64 !== undefined) updates.avatarUrl = newAvatarBase64;"""

new_profile = """      // 2. Mettre à jour Firestore
      const userRef = doc(db, "users", this.currentUser.email);
      const updates = {};
      if (newEmail !== this.currentUser.email) updates.email = newEmail;
      if (newTelephone !== undefined) updates.telephone = newTelephone;
      
      if (newAvatarBase64 && newAvatarBase64.startsWith('data:image')) {
        try {
          const response = await fetch(newAvatarBase64);
          const blob = await response.blob();
          const ext = newAvatarBase64.split(';')[0].split('/')[1] || 'jpg';
          const fileRef = storageRef(storage, `avatars/${this.currentUser.email}_${Date.now()}.${ext}`);
          await uploadBytes(fileRef, blob);
          const downloadUrl = await getDownloadURL(fileRef);
          updates.avatarUrl = downloadUrl;
        } catch (uploadErr) {
          console.error("Erreur upload avatar Storage :", uploadErr);
          throw new Error("Erreur lors de l'upload de l'image de profil. " + uploadErr.message);
        }
      } else if (newAvatarBase64 !== undefined) {
         updates.avatarUrl = newAvatarBase64;
      }"""

content = content.replace(old_profile, new_profile)

with open('js/auth.js', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated auth.js")
