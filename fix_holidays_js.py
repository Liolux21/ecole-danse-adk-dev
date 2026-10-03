import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

pattern = r'window\.deleteCourse = async function\(id\) \{.*?\n\};'

replacement = r'''window.deleteCourse = async function(id) {
  if (confirm("Êtes-vous sûr de vouloir supprimer ce cours ?")) {
    const firebase = await import('./firebase-config.js');
    const course = DATA.getCourseById(id);
    const targetDocId = (course && course.docId) ? course.docId : String(id);
    await firebase.deleteDoc(firebase.doc(firebase.db, "courses", targetDocId));
    DATA.courses = DATA.courses.filter(c => String(c.id) !== String(id));
    renderAdminCourses();
  }
};

window.renderHolidays = function() {
    const list = document.getElementById('settings-holidays-list');
    if (!list) return;
    if (!DATA.settings.holidays || DATA.settings.holidays.length === 0) {
        list.innerHTML = '<div class="empty-state">Aucun congé enregistré.</div>';
        return;
    }
    
    function formatDateFR(dateStr) {
      if (!dateStr) return '';
      const parts = dateStr.split('-');
      if (parts.length !== 3) return dateStr;
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }

    list.innerHTML = DATA.settings.holidays.map((h, index) => `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.8rem; border-bottom: 1px solid var(--border-color); background: #fdfdfd; border-radius: var(--radius); margin-bottom: 0.5rem;">
            <div>
                <strong style="color: #9C5858;">${h.name}</strong><br>
                <small style="color: var(--text-muted);">Du ${formatDateFR(h.start)} au ${formatDateFR(h.end)}</small>
            </div>
            <button class="btn btn-outline btn-sm" style="color:#e74c3c;border-color:#e74c3c;" onclick="deleteHoliday(${index})">Supprimer</button>
        </div>
    `).join('');
};

window.addHoliday = async function() {
    const name = document.getElementById('new-holiday-name').value;
    const start = document.getElementById('new-holiday-start').value;
    const end = document.getElementById('new-holiday-end').value;
    if (!name || !start || !end) {
        showToast("Veuillez remplir tous les champs du congé.", "error");
        return;
    }
    
    if(!DATA.settings.holidays) DATA.settings.holidays = [];
    DATA.settings.holidays.push({ name, start, end });
    
    try {
        const firebase = await import('./firebase-config.js');
        await firebase.setDoc(firebase.doc(firebase.db, 'settings', 'general'), DATA.settings, { merge: true });
        
        document.getElementById('new-holiday-name').value = '';
        document.getElementById('new-holiday-start').value = '';
        document.getElementById('new-holiday-end').value = '';
        
        renderHolidays();
        showToast("Congé ajouté avec succès", "success");
    } catch(err) {
        console.error(err);
        showToast("Erreur lors de l'ajout", "error");
    }
};

window.deleteHoliday = async function(index) {
    if(!confirm("Voulez-vous vraiment supprimer ce congé ?")) return;
    DATA.settings.holidays.splice(index, 1);
    try {
        const firebase = await import('./firebase-config.js');
        await firebase.setDoc(firebase.doc(firebase.db, 'settings', 'general'), DATA.settings, { merge: true });
        renderHolidays();
        showToast("Congé supprimé", "success");
    } catch(err) {
        console.error(err);
        showToast("Erreur lors de la suppression", "error");
    }
};

window.saveSeasonSettings = async function() {
    const start = document.getElementById('settings-season-start').value;
    const end = document.getElementById('settings-season-end').value;
    
    DATA.settings.season = { start, end };
    try {
        const firebase = await import('./firebase-config.js');
        await firebase.setDoc(firebase.doc(firebase.db, 'settings', 'general'), DATA.settings, { merge: true });
        showToast("Saison enregistrée avec succès !", "success");
    } catch(err) {
        console.error(err);
        showToast("Erreur lors de l'enregistrement", "error");
    }
};
'''

js = re.sub(pattern, replacement, js, flags=re.DOTALL)

# Add call to renderHolidays in renderAdminDashboard
pattern_dash = r'renderAdminCourses\(\);\n\s*renderAdminAnnonces\(\);'
replacement_dash = r'''renderAdminCourses();
    renderAdminAnnonces();
    renderHolidays();
    if (DATA.settings && DATA.settings.season) {
      if (DATA.settings.season.start) document.getElementById('settings-season-start').value = DATA.settings.season.start;
      if (DATA.settings.season.end) document.getElementById('settings-season-end').value = DATA.settings.season.end;
    }'''
js = re.sub(pattern_dash, replacement_dash, js)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
