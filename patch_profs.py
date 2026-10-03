import re

with open('portail.html', 'r', encoding='utf-8') as f:
    content = f.read()

replacement = """<div style="background: #ffffff; padding: 1.5rem; border-radius: var(--radius); box-shadow: 0 4px 15px rgba(0,0,0,0.05); margin-bottom: 1.5rem; border-left: 4px solid var(--gold);">
<h4 style="color: #9C5858; margin-bottom: 1rem;">Mise à jour du Planning & Professeurs 26-27</h4>
<p style="font-size: 0.9rem; margin-bottom: 1rem;">1. Cliquez ici pour synchroniser le nouveau planning vers la base de données. Attention: Cela écrasera la liste des cours actuelle.</p>
<button class="btn btn-primary" onclick="window.migrateCourses2026()" id="btn-migrate-courses" style="margin-bottom: 1rem;">Synchroniser le planning</button>

<p style="font-size: 0.9rem; margin-bottom: 1rem;">2. Cliquez ici pour générer automatiquement les comptes Professeurs manquants dans la base de données.</p>
<button class="btn btn-primary" onclick="window.migrateProfs2026()" id="btn-migrate-profs">Créer les profs manquants</button>
</div>
<h4 style="color: #9C5858; margin-bottom: 1rem;">Saison actuelle"""

content = re.sub(r'<div style="background: #ffffff; padding: 1\.5rem; border-radius: var\(--radius\); box-shadow: 0 4px 15px rgba\(0,0,0,0\.05\); margin-bottom: 1\.5rem; border-left: 4px solid var\(--gold\);">[\s\S]*?<h4 style="color: #9C5858; margin-bottom: 1rem;">Saison actuelle', replacement, content)

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(content)

with open('js/app.js', 'r', encoding='utf-8') as f:
    app_content = f.read()

migrate_profs_fn = """
window.migrateProfs2026 = async function() {
  const btn = document.getElementById('btn-migrate-profs');
  if(!confirm("Êtes-vous sûr de vouloir créer les professeurs manquants ?")) return;
  
  try {
    btn.textContent = "Création en cours...";
    btn.disabled = true;
    
    const firebase = await import('./firebase-config.js');
    
    const profNames = [
      'Janis Romain', 'Jeanne Lefèvre', 'Loreen Poncelet', 'Maeva Delgoffe', 'Margaux Hubert',
      'Maurine Baudon', 'Pauline Gérard', 'Zoé Lambert', 'Jade Nélis', 'Daisy Theunissen',
      'Corentin Milosevic', 'Charlotte Varoquaux', 'Andrew Schmitz', 'Clémentine Mamdy', 'Lili Maury',
      'Florence', 'Adam'
    ];
    
    let createdCount = 0;
    
    for (let fullName of profNames) {
      // Check if exists
      const exists = window.DATA.users.find(u => u.role === 'prof' && (u.name === fullName || (u.firstname && u.name.includes(u.firstname))));
      if (!exists) {
        const parts = fullName.split(' ');
        const firstname = parts[0];
        const lastname = parts.slice(1).join(' ');
        const dummyEmail = `${firstname.toLowerCase().replace(/é|è|ê/g, 'e')}@adk.local`;
        
        const profData = {
          role: 'prof',
          firstname: firstname,
          lastname: lastname,
          name: fullName,
          dob: '',
          email: dummyEmail,
          phone: '',
          hasTutor: false,
          avatar: '👨‍🏫'
        };
        
        await firebase.setDoc(firebase.doc(firebase.collection(firebase.db, "users"), dummyEmail), profData);
        createdCount++;
      }
    }
    
    alert(`${createdCount} professeurs ont été créés avec succès. Veuillez rafraîchir la page.`);
    location.reload();
  } catch(e) {
    console.error(e);
    alert("Erreur: " + e.message);
    btn.textContent = "Erreur. Réessayez.";
    btn.disabled = false;
  }
};
"""

app_content += migrate_profs_fn

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(app_content)
