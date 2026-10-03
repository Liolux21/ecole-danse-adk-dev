import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# 1. Tenues - remove from renderGalaTables
pattern_tenue = r'const tenueBody = document\.getElementById\(\'admin-gala-tenue-body\'\);\n\s*if \(tenueBody\) \{.*?\}\n\s*\}\n'
js = re.sub(pattern_tenue, '', js, flags=re.DOTALL)

# 2. Infos - remove time from renderGalaTables
pattern_info_time_td = r'<td>\$\{i\.time\}</td>'
js = re.sub(pattern_info_time_td, '', js)

# 3. Infos - remove time from saveGalaInfo
pattern_save_info_time = r'time: document\.getElementById\(\'gala-info-time\'\)\.value,\n\s*'
js = re.sub(pattern_save_info_time, '', js)

# 4. Infos - initGalaInfoModal to populate themes
pattern_init_info = r'window\.initGalaInfoModal = function\(\) \{\n\s*const select = document\.getElementById\(\'gala-info-course\'\);\n\s*select\.innerHTML = DATA\.courses\.map\(c => `<option value="\$\{c\.id\}">\$\{c\.name\}</option>`\)\.join\(\'\'\);\n\s*\};'
replacement_init_info = r'''window.initGalaInfoModal = function() {
  const select = document.getElementById('gala-info-course');
  select.innerHTML = DATA.courses.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
  
  const selectTheme = document.getElementById('gala-info-theme');
  if (DATA.settings && DATA.settings.galaThemes) {
    selectTheme.innerHTML = DATA.settings.galaThemes.map(t => `<option value="${t}">${t}</option>`).join('');
  } else {
    selectTheme.innerHTML = '';
  }
};'''
js = re.sub(pattern_init_info, replacement_init_info, js)

# 5. Notes - View/Edit buttons
pattern_notes_btns = r'<button class="btn btn-outline btn-sm" onclick="editGalaNote\(\'\$\{n\.id\}\'\)">Voir/Modifier</button>'
replacement_notes_btns = r'''<button class="btn btn-outline btn-sm" onclick="viewGalaNote('${n.id}')">Voir</button>
            <button class="btn btn-outline btn-sm" onclick="editGalaNote('${n.id}')">Modifier</button>'''
js = re.sub(pattern_notes_btns, replacement_notes_btns, js)

# 6. Add viewGalaNote and Gala Themes logic
new_functions = r'''
window.viewGalaNote = function(id) {
  const note = DATA.galaNotes.find(n => n.id === id);
  if (!note) return;
  
  function formatDateFR(dateStr) {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  
  document.getElementById('note-view-date').textContent = formatDateFR(note.date);
  document.getElementById('note-view-presents').textContent = note.presents.join(', ') || 'Aucun';
  document.getElementById('note-view-content').textContent = note.pv;
  openModal('modal-gala-note-view');
};

window.renderGalaThemes = function() {
  const list = document.getElementById('gala-themes-list');
  if (!list) return;
  if (!DATA.settings) DATA.settings = {};
  if (!DATA.settings.galaThemes) DATA.settings.galaThemes = [];
  
  if (DATA.settings.galaThemes.length === 0) {
    list.innerHTML = '<div class="empty-state">Aucun thème défini.</div>';
    return;
  }
  
  list.innerHTML = DATA.settings.galaThemes.map((t, idx) => `
    <div style="display:flex; justify-content:space-between; align-items:center; padding:0.5rem; background:#f4f4f4; border-radius:var(--radius);">
      <span>${t}</span>
      <button class="btn btn-outline btn-sm" style="color:#e74c3c;border-color:#e74c3c;" onclick="deleteGalaTheme(${idx})">X</button>
    </div>
  `).join('');
};

window.addGalaTheme = async function() {
  const input = document.getElementById('new-gala-theme');
  const val = input.value.trim();
  if (!val) return;
  if (!DATA.settings) DATA.settings = {};
  if (!DATA.settings.galaThemes) DATA.settings.galaThemes = [];
  
  DATA.settings.galaThemes.push(val);
  input.value = '';
  
  try {
    const firebase = await import('./firebase-config.js');
    await firebase.setDoc(firebase.doc(firebase.db, 'settings', 'general'), DATA.settings, { merge: true });
    renderGalaThemes();
  } catch(err) {
    console.error(err);
    showToast("Erreur de sauvegarde", "error");
  }
};

window.deleteGalaTheme = async function(idx) {
  if (!confirm("Supprimer ce thème ?")) return;
  DATA.settings.galaThemes.splice(idx, 1);
  try {
    const firebase = await import('./firebase-config.js');
    await firebase.setDoc(firebase.doc(firebase.db, 'settings', 'general'), DATA.settings, { merge: true });
    renderGalaThemes();
  } catch(err) {
    console.error(err);
    showToast("Erreur de sauvegarde", "error");
  }
};
'''

# append right after initGalaInfoModal block
pattern_append = r'window\.deleteGalaInfo = function\(id\) \{\n\s*DATA\.galaInfos = DATA\.galaInfos\.filter\(r => r\.id !== id\);\n\s*renderGalaTables\(\);\n\s*\};'
replacement_append = pattern_append.replace('}', '}\n' + new_functions)
js = re.sub(pattern_append, replacement_append, js)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
