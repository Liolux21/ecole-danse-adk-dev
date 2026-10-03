import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# 0. Add deleteDoc to imports
js = js.replace("doc, setDoc, getDoc }", "doc, setDoc, getDoc, deleteDoc }")

# 1. Update renderAdminProfs to show avatar in a round bubble
pattern_avatar = r'<h4 style="margin: 0; color: #9C5858; font-size: 1\.1rem; font-weight: bold;">\$\{p\.avatar \|\| \'👨‍🏫\'\} \$\{p\.firstname \? p\.firstname \+ \' \' \+ p\.lastname : p\.name\}</h4>'
replacement_avatar = r'''<div style="display: flex; align-items: center; gap: 0.6rem;">
              <div style="width: 36px; height: 36px; border-radius: 50%; background-color: #f5e6e6; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; flex-shrink: 0;">${p.avatar || (p.gender === 'Féminin' ? '👩‍🏫' : '👨‍🏫')}</div>
              <h4 style="margin: 0; color: #9C5858; font-size: 1.1rem; font-weight: bold;">${p.firstname ? p.firstname + ' ' + p.lastname : p.name}</h4>
            </div>'''
js = js.replace('<h4 style="margin: 0; color: #9C5858; font-size: 1.1rem; font-weight: bold;">${p.avatar || \'👨‍🏫\'} ${p.firstname ? p.firstname + \' \' + p.lastname : p.name}</h4>', replacement_avatar)


# 2. Fix initTabs to remove active from tab-admin-hours
pattern_init_tabs = r'(contentIds\.forEach\(id => \{ const el = document\.getElementById\(id\); if \(el\) el\.classList\.remove\(\'active\'\); \}\);)'
replacement_init_tabs = r'\1\n        const hoursTab = document.getElementById(\'tab-admin-hours\');\n        if (hoursTab) hoursTab.classList.remove(\'active\');'
js = re.sub(pattern_init_tabs, replacement_init_tabs, js)


# 3. Add prof_hours save in appelSaveBtn.onclick
pattern_save = r'(DATA\.markAttendance\(sid, selectedCourseId, date, status\);\n\s*\}\n\s*\}\);\n\s*)(showToast\(\'✅ Appel sauvegardé !\'|showToast\(\'✅ Appel et heures sauvegardés !\'|showToast\(.*Appel sauvegardé.*\))'
replacement_save = r'''\1
        // Save Prof Hours to Firebase
        const hoursInput = document.getElementById('prof-hours-input');
        if (hoursInput && window.AUTH && window.AUTH.currentUser) {
          const profId = window.AUTH.currentUser.id;
          const profName = window.AUTH.currentUser.firstname ? `${window.AUTH.currentUser.firstname} ${window.AUTH.currentUser.lastname}` : window.AUTH.currentUser.name;
          const docId = `${profId}_${selectedCourseId}_${date.replace(/\//g, '-')}`;
          const hours = parseFloat(hoursInput.value) || 0;
          
          if (hours > 0) {
            const record = { profId, profName, courseId: selectedCourseId, date, hours, timestamp: Date.now() };
            try {
              setDoc(doc(db, "prof_hours", docId), record);
              if (!DATA.prof_hours) DATA.prof_hours = [];
              const idx = DATA.prof_hours.findIndex(r => r.id === docId);
              if (idx > -1) DATA.prof_hours[idx] = { id: docId, ...record };
              else DATA.prof_hours.push({ id: docId, ...record });
              
              const statusEl = document.getElementById('prof-hours-status');
              if (statusEl) statusEl.innerHTML = `<span style="color: #27ae60;">✔️ Prestation validée : ${hours} heures</span>`;
            } catch (err) {
              console.error("Error saving prof hours:", err);
            }
          }
        }
        
        showToast('✅ Appel et heures sauvegardés !', 'success');'''
js = re.sub(pattern_save, replacement_save, js)


# 4. Fix deleteProf to actually delete from Firebase
pattern_delete = r'window\.deleteProf = function\(id\) \{\n\s*if \(confirm\("Êtes-vous sûr de vouloir supprimer ce professeur \?"\)\) \{\n\s*DATA\.users = DATA\.users\.filter\(u => u\.id !== id\);\n\s*renderAdminProfs\(\);\n\s*\}\n\s*\};'
replacement_delete = r'''window.deleteProf = async function(id) {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce professeur ?")) {
      try {
        await deleteDoc(doc(db, "users", id));
        DATA.users = DATA.users.filter(u => u.id !== id);
        renderAdminProfs();
        showToast("Professeur supprimé avec succès", "success");
      } catch (err) {
        console.error(err);
        alert("Erreur lors de la suppression : " + err.message);
      }
    }
  };'''
js = re.sub(pattern_delete, replacement_delete, js)


# 6. Fix case sensitivity in student matching for role switching
pattern_hasStudents = r'const hasStudents = DATA\.students\.some\(s => s\.tutorEmail === user\.email \|\| s\.email === user\.email\);'
replacement_hasStudents = r'const userEmail = (user.email || "").toLowerCase();\n      const hasStudents = DATA.students.some(s => (s.tutorEmail || "").toLowerCase() === userEmail || (s.email || "").toLowerCase() === userEmail || s.tutorId === user.id);'
js = js.replace(pattern_hasStudents, replacement_hasStudents)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
