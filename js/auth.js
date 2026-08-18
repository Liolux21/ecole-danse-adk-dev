import { auth, db, signInWithEmailAndPassword, signOut, onAuthStateChanged, sendPasswordResetEmail, doc, getDoc } from './firebase-config.js';

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
