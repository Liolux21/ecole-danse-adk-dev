import re

with open('js/auth.js', 'r', encoding='utf-8') as f:
    js = f.read()

# 1. Add mustChangePassword to createParentAccount
js = js.replace('role: "parent",\n          childrenIds: []', 'role: "parent",\n          childrenIds: [],\n          mustChangePassword: true')

# 2. Add updateUserPassword method to AUTH object
new_method = """
    async resetPassword(email) {
      try {
        await sendPasswordResetEmail(auth, email);
        return true;
      } catch(e) {
        console.error("Reset password error:", e);
        return false;
      }
    },

    async forceChangePassword(newPassword) {
      try {
        if (!auth.currentUser) return false;
        await updatePassword(auth.currentUser, newPassword);
        // Update Firestore
        await updateDoc(doc(db, "users", this.currentUser.id), {
          mustChangePassword: false
        });
        this.currentUser.mustChangePassword = false;
        return true;
      } catch(e) {
        console.error("Force password change error:", e);
        throw e;
      }
    },
"""

js = re.sub(r'async resetPassword\(email\) \{.*?\},\n', new_method, js, flags=re.DOTALL)

with open('js/auth.js', 'w', encoding='utf-8') as f:
    f.write(js)
