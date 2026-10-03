import re

with open('portail.html', 'r', encoding='utf-8') as f:
    content = f.read()

replacement = """<div style="background: #ffffff; padding: 1.5rem; border-radius: var(--radius); box-shadow: 0 4px 15px rgba(0,0,0,0.05); margin-bottom: 1.5rem; border-left: 4px solid #e74c3c;">
<h4 style="color: #e74c3c; margin-bottom: 1rem;">Zone Dangereuse : Remise à Zéro</h4>
<p style="font-size: 0.9rem; margin-bottom: 1rem;">Cliquez ici pour effacer toutes les annonces/notifications et toutes les conversations de la messagerie.</p>
<button class="btn btn-primary" style="background-color: #e74c3c; border-color: #e74c3c;" onclick="window.resetNotificationsAndMessages()" id="btn-reset-data">Tout remettre à zéro (Notifications & Messagerie)</button>
</div>
<h4 style="color: #9C5858; margin-bottom: 1rem;">Saison actuelle"""

content = re.sub(r'<h4 style="color: #9C5858; margin-bottom: 1rem;">Saison actuelle', replacement, content)

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(content)

with open('js/app.js', 'r', encoding='utf-8') as f:
    app_content = f.read()

reset_fn = """
window.resetNotificationsAndMessages = async function() {
  const btn = document.getElementById('btn-reset-data');
  if(!confirm("ÊTES-VOUS ABSOLUMENT SÛR de vouloir supprimer toutes les notifications et tous les messages ? Cette action est irréversible.")) return;
  if(!confirm("Confirmation finale : Tout effacer ?")) return;
  
  try {
    btn.textContent = "Effacement en cours...";
    btn.disabled = true;
    
    const firebase = await import('./firebase-config.js');
    
    // 1. Delete Announcements
    const annSnap = await firebase.getDocs(firebase.collection(firebase.db, "announcements"));
    for (let d of annSnap.docs) {
      await firebase.deleteDoc(firebase.doc(firebase.db, "announcements", d.id));
    }
    
    // 2. Delete Conversations (which also hides the messages)
    const convSnap = await firebase.getDocs(firebase.collection(firebase.db, "conversations"));
    for (let d of convSnap.docs) {
      // Technically we should delete subcollections but deleting the main doc makes it invisible to queries
      // We will do both for cleanliness
      const msgSnap = await firebase.getDocs(firebase.collection(firebase.db, "conversations", d.id, "messages"));
      for (let m of msgSnap.docs) {
        await firebase.deleteDoc(firebase.doc(firebase.db, "conversations", d.id, "messages", m.id));
      }
      await firebase.deleteDoc(firebase.doc(firebase.db, "conversations", d.id));
    }
    
    // Clear local data
    window.DATA.announcements = [];
    
    alert("Les notifications et la messagerie ont été remises à zéro avec succès.");
    location.reload();
  } catch(e) {
    console.error(e);
    alert("Erreur: " + e.message);
    btn.textContent = "Erreur. Réessayez.";
    btn.disabled = false;
  }
};
"""

app_content += reset_fn

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(app_content)
