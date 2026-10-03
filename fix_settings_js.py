import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# 1. Update renderHolidays to add the Modifier button
pattern_render = r'<button class="btn btn-outline btn-sm" style="color:#e74c3c;border-color:#e74c3c;" onclick="deleteHoliday\(\$\{index\}\)">Supprimer</button>'
replacement_render = r'''<div style="display:flex; gap:0.5rem;">
                <button class="btn btn-outline btn-sm" onclick="editHoliday(${index})">Modifier</button>
                <button class="btn btn-outline btn-sm" style="color:#e74c3c;border-color:#e74c3c;" onclick="deleteHoliday(${index})">Supprimer</button>
            </div>'''
js = re.sub(pattern_render, replacement_render, js)

# 2. Add editHoliday function
pattern_add = r'window\.deleteHoliday = async'
replacement_add = r'''window.editHoliday = function(index) {
    const h = DATA.settings.holidays[index];
    if (!h) return;
    document.getElementById('new-holiday-name').value = h.name;
    document.getElementById('new-holiday-start').value = h.start;
    document.getElementById('new-holiday-end').value = h.end;
    DATA.settings.holidays.splice(index, 1);
    renderHolidays();
    document.getElementById('new-holiday-name').focus();
    showToast("Modifiez les infos puis cliquez sur Sauvegarder", "info");
};

window.deleteHoliday = async'''
js = re.sub(pattern_add, replacement_add, js)

# 3. Add season-display update
pattern_save = r'window\.saveSeasonSettings = async function\(\) \{'
replacement_save = r'''function updateSeasonDisplay() {
    if (DATA.settings && DATA.settings.season && DATA.settings.season.start && DATA.settings.season.end) {
        const p1 = DATA.settings.season.start.split('-');
        const p2 = DATA.settings.season.end.split('-');
        const s = `${p1[2]}/${p1[1]}/${p1[0]}`;
        const e = `${p2[2]}/${p2[1]}/${p2[0]}`;
        const span = document.getElementById('season-display');
        if (span) span.textContent = `(Enregistré : du ${s} au ${e})`;
    }
}

window.saveSeasonSettings = async function() {'''
js = re.sub(pattern_save, replacement_save, js)

pattern_save_toast = r'showToast\("Saison enregistrée avec succès !", "success"\);'
replacement_save_toast = r'''updateSeasonDisplay();
        showToast("Saison enregistrée avec succès !", "success");'''
js = re.sub(pattern_save_toast, replacement_save_toast, js)

pattern_dash = r'if \(DATA\.settings && DATA\.settings\.season\) \{'
replacement_dash = r'''updateSeasonDisplay();
    if (DATA.settings && DATA.settings.season) {'''
js = re.sub(pattern_dash, replacement_dash, js)


with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
