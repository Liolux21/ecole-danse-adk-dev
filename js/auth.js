// =============================================
// ÉCOLE DE DANSE ADK — Authentification
// =============================================

const AUTH = {

  currentUser: null,

  // Initialise depuis localStorage
  init() {
    try {
      const saved = localStorage.getItem('adk_user');
      if (saved) {
        this.currentUser = JSON.parse(saved);
        return true;
      }
    } catch(e) { this.logout(); }
    return false;
  },

  // Connexion
  login(email, password) {
    const user = DATA.users.find(u =>
      u.email.toLowerCase() === email.toLowerCase().trim() &&
      u.password === password
    );
    if (user) {
      this.currentUser = { ...user };
      localStorage.setItem('adk_user', JSON.stringify(this.currentUser));
      return user;
    }
    return null;
  },

  // Déconnexion
  logout() {
    this.currentUser = null;
    localStorage.removeItem('adk_user');
  },

  isAuthenticated() { return this.currentUser !== null; },
  hasRole(role)      { return this.currentUser?.role === role; },
  getRole()          { return this.currentUser?.role || null; },
  getName()          { return this.currentUser?.name || ''; },
};

window.AUTH = AUTH;
