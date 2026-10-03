with open('js/app.js', 'r', encoding='utf-8') as f:
    content = f.read()

robust_migrate_profs = r"""window.migrateProfs2026 = async function() {
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
    
    // Fetch all users directly from DB to be absolutely sure
    const usersSnap = await firebase.getDocs(firebase.collection(firebase.db, "users"));
    const allDbUsers = [];
    usersSnap.forEach(d => allDbUsers.push(d.data()));
    
    for (let fullName of profNames) {
      // Check if a prof with this exact name already exists in DB
      const exists = allDbUsers.find(u => u.role === 'prof' && u.name === fullName);
      
      if (!exists) {
        const parts = fullName.split(' ');
        const firstname = parts[0];
        const lastname = parts.slice(1).join(' ');
        
        // Remove accents safely for email
        const cleanFirstName = firstname.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        const cleanLastName = lastname.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s+/g, '');
        const dummyEmail = `${cleanFirstName}${cleanLastName ? '.' + cleanLastName : ''}@adk.local`;
        
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

import re
match = re.search(r'window\.migrateProfs2026 = async function\(\) \{[\s\S]*?btn\.disabled = false;\s*\}\s*\};', content)
if match:
    content = content[:match.start()] + robust_migrate_profs + content[match.end():]
else:
    print("WARNING: Could not find block to replace!")

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(content)
