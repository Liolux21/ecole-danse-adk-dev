import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Fix mutuelle in mobile card view (around line 841)
old_card_mutuelle = """    const mutStatus = s.mutuelle || 'attente';
    const mutClass = mutStatus === 'remis' ? 'select-remis' : (mutStatus === 'en_cours' ? 'select-encours' : 'select-attente');
    const mutSelect = `
      <select class="status-select ${mutClass}" onchange="updateMutuelle('${s.id}', this.value)" style="margin: 0; padding-right: 2.2rem; font-size: 0.85rem;">
        <option value="attente" ${mutStatus === 'attente' ? 'selected' : ''}>⏳ En attente</option>
        <option value="cours" ${mutStatus === 'en_cours' ? 'selected' : ''}>🏃 En cours</option>
        <option value="remis" ${mutStatus === 'remis' ? 'selected' : ''}>✅ Remis</option>
      </select>
    `;"""

new_card_mutuelle = """    const mutStatus = s.mutuelle || 'masque';
    const mutClass = mutStatus === 'remis' ? 'select-remis' : (mutStatus === 'en_cours' ? 'select-encours' : (mutStatus === 'attente' ? 'select-attente' : ''));
    const mutSelect = `
      <select class="status-select ${mutClass}" onchange="updateMutuelle('${s.id}', this.value)" style="margin: 0; padding-right: 2.2rem; font-size: 0.85rem;">
        <option value="masque" ${mutStatus === 'masque' ? 'selected' : ''}>Masqué</option>
        <option value="attente" ${mutStatus === 'attente' ? 'selected' : ''}>⏳ En attente</option>
        <option value="en_cours" ${mutStatus === 'en_cours' ? 'selected' : ''}>🏃 En cours</option>
        <option value="remis" ${mutStatus === 'remis' ? 'selected' : ''}>✅ Remis</option>
      </select>
    `;"""

# Clean up possible char encoding issues in python match by doing a regex
js = re.sub(
    r"const mutStatus = s\.mutuelle \|\| 'attente';\s*const mutClass = .*?;\s*const mutSelect = `.*?`;",
    new_card_mutuelle,
    js, flags=re.DOTALL
)

# Fix cotisation in mobile card view
new_card_cotisation = """    const cotStatus = s.cotisation || 'en attente';
    const cotClass = cotStatus === 'payee_cash' || cotStatus === 'payee_compte' ? 'select-remis' : 'select-attente';
    const cotSelect = `
      <select class="status-select ${cotClass}" onchange="updateCotisation('${s.id}', this.value)" style="margin: 0; padding-right: 2.2rem; font-size: 0.85rem; margin-bottom:5px;">
        <option value="en attente" ${cotStatus === 'en attente' ? 'selected' : ''}>⏳ En attente</option>
        <option value="payee_cash" ${cotStatus === 'payee_cash' ? 'selected' : ''}>💶 Payée cash</option>
        <option value="payee_compte" ${cotStatus === 'payee_compte' ? 'selected' : ''}>💳 Payée compte</option>
      </select>
      <input type="date" value="${s.cotisationDate || ''}" onchange="updateCotisationDate('${s.id}', this.value)" style="padding:0.2rem; font-size:0.8rem; border-radius:4px; border:1px solid var(--border); width: 100%; box-sizing: border-box;">
    `;"""

js = re.sub(
    r"const isPayee = s\.cotisation === 'pay.*?e';\s*const cotSelect = `.*?`;",
    new_card_cotisation,
    js, flags=re.DOTALL
)

# Fix renderChildData
parent_new_fix = """  // Mutuelle
  const mutStatus = child.mutuelle || 'masque';
  const mutClass = mutStatus === 'remis' ? 'pill-approved' : (mutStatus === 'en_cours' ? 'pill-pending' : 'pill-rejected');
  const mutLabel = mutStatus === 'remis' ? '✅ Remis' : (mutStatus === 'en_cours' ? '⏳ En cours' : '⚠️ En attente');
  document.getElementById('parent-stat-mutuelle').innerHTML = (mutStatus === 'masque') ? '<span style="color:#aaa; font-size:0.85rem;">Masqué</span>' : `<span class="status-pill ${mutClass}">${mutLabel}</span>`;"""

js = re.sub(
    r"// Mutuelle\s*const mutStatus = child\.mutuelle \|\| 'attente';\s*const mutClass = .*?;\s*const mutLabel = .*?;\s*document\.getElementById\('parent-stat-mutuelle'\)\.innerHTML = .*?;",
    parent_new_fix,
    js, flags=re.DOTALL
)


with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
