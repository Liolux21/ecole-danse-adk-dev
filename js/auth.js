import { auth, db, signInWithEmailAndPassword, signOut, onAuthStateChanged, sendPasswordResetEmail, doc, getDoc, updateEmail, updatePassword, reauthenticateWithCredential, EmailAuthProvider, setDoc, updateDoc, deleteDoc } from './firebase-config.js';

const AUTH = {
  currentUser: null,

  init() {
    return new Promise((resolve) => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          try {
            // Dans notre modèle de migration, on a utilisé l'email comme ID de document pour plus de facilité
            // ou on peut faire une query pour trouver l'utilisateur par email.
            // Vu qu'on a mis l'email comme ID dans migrate.html :
            const docRef = doc(db, "users", user.email);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              this.currentUser = { ...docSnap.data(), uid: user.uid };
            } else {
              console.warn("Utilisateur authentifié mais pas trouvé dans Firestore.");
              this.currentUser = { email: user.email, role: 'eleve' }; // Fallback
            }
          } catch(e) {
            console.error("Erreur de récupération profil Firestore", e);
            this.currentUser = null;
          }
        } else {
          this.currentUser = null;
        }
        resolve(this.currentUser !== null);
      });
    });
  },

  async login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      const docRef = doc(db, "users", user.email);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.currentUser = { ...docSnap.data(), uid: user.uid };
        return this.currentUser;
      }
      return null;
    } catch (e) {
      console.error("Login error:", e);
      return null;
    }
  },


  async resetPassword(email) {
    try {
      await sendPasswordResetEmail(auth, email);
      return true;
    } catch(e) {
      console.error("Reset password error:", e);
      return false;
    }
  },

  async updateUserProfile(currentPassword, newEmail, newPassword, newTelephone, newAvatarBase64) {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("Non authentifié");

      // Si email ou password change, on doit réauthentifier
      if (newEmail !== user.email || newPassword) {
        if (!currentPassword) throw new Error("Le mot de passe actuel est requis pour changer l'email ou le mot de passe.");
        const credential = EmailAuthProvider.credential(user.email, currentPassword);
        await reauthenticateWithCredential(user, credential);
      }

      // 1. Mettre à jour Firebase Auth
      if (newPassword) {
        await updatePassword(user, newPassword);
      }
      if (newEmail !== user.email) {
        await updateEmail(user, newEmail);
      }

      // 2. Mettre à jour Firestore
      const userRef = doc(db, "users", this.currentUser.email);
      const updates = {};
      if (newEmail !== this.currentUser.email) updates.email = newEmail;
      if (newTelephone !== undefined) updates.telephone = newTelephone;
      if (newAvatarBase64 !== undefined) updates.avatarUrl = newAvatarBase64;
      
      // Si l'email a changé, il faut théoriquement déplacer le document puisque l'ID = email
      if (newEmail !== this.currentUser.email) {
         // Create new doc, delete old one
         const newRef = doc(db, "users", newEmail);
         await setDoc(newRef, { ...this.currentUser, ...updates, email: newEmail });
         await deleteDoc(userRef);
      } else {
         await updateDoc(userRef, updates);
      }

      // 3. Mettre à jour l'état local
      this.currentUser = { ...this.currentUser, ...updates };
      return true;
    } catch(e) {
      console.error("Update profile error:", e);
      throw e;
    }
  },

  async requestPushNotificationPermission() {
    if (!this.currentUser) return;
    try {
      const { getMessagingInstance, getToken, updateDoc, doc, db } = await import('./firebase-config.js');
      const messaging = await getMessagingInstance();
      if (!messaging) {
        console.warn("Push notifications not supported on this device.");
        return; // Non supporté
      }

      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        const token = await getToken(messaging, { 
          vapidKey: 'BO9WQ1i37mx9MQmAcTWu6LAuq6vaC8z1DB-j8V-NpfMXjQhE-QzsxoTMf8iukJzNsZr3MUFFzF1IEX_xkRjXbWo' 
        });
        if (token) {
          // Sauvegarder dans Firestore
          const docId = this.currentUser.email || String(this.currentUser.id);
          const fcmTokens = this.currentUser.fcmTokens || [];
          if (!fcmTokens.includes(token)) {
            fcmTokens.push(token);
            await updateDoc(doc(db, "users", docId), { fcmTokens: fcmTokens });
            this.currentUser.fcmTokens = fcmTokens;
            console.log("Token FCM enregistré !");
          }
        }
      }
    } catch (e) {
      console.error("Erreur FCM permission:", e);
    }
  },

  async logout() {
    try {
      await signOut(auth);
      this.currentUser = null;
    } catch(e) {
      console.error("Logout error", e);
    }
  },

  isAuthenticated() { return this.currentUser !== null; },
  hasRole(role)      { return this.currentUser?.role === role; },
  getRole()          { return this.currentUser?.role || null; },
  getName()          { return this.currentUser?.name || ''; },
};

window.AUTH = AUTH;
