import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Remove 'attente' from Mutuelle card view
js = re.sub(
    r'<option value="attente"[^>]*>⏳ En attente</option>',
    '',
    js
)
js = re.sub(
    r'<option value="attente"[^>]*>\? En attente</option>',
    '',
    js
)

# Remove 'attente' from Mutuelle table view (which was previously not correctly matched anyway but let's just make sure)
js = re.sub(
    r'<option value="attente"[^>]*>.*?En attente</option>',
    '',
    js
)

# Change mutClass logic to fallback to '' for masque, and handle no 'attente'
# We'll just replace the whole mutSelect definition for card view
js = re.sub(
    r"const mutSelect = `.*?`;",
    """const mutSelect = `
      <select class="status-select ${mutClass}" onchange="updateMutuelle('${s.id}', this.value)" style="margin: 0; padding-right: 2.2rem; font-size: 0.85rem;">
        <option value="masque" ${mutStatus === 'masque' ? 'selected' : ''}>Masqué</option>
        <option value="en_cours" ${mutStatus === 'en_cours' ? 'selected' : ''}>🏃 En cours</option>
        <option value="remis" ${mutStatus === 'remis' ? 'selected' : ''}>✅ Remis</option>
      </select>
    `;""",
    js, count=1, flags=re.DOTALL
)

# Now fix the Flexbox for Cotisation Date
old_cotSelect = """    const cotSelect = `
      <select class="status-select ${cotClass}" onchange="updateCotisation('${s.id}', this.value)" style="margin: 0; padding-right: 2.2rem; font-size: 0.85rem; margin-bottom:5px;">
        <option value="en attente" ${cotStatus === 'en attente' ? 'selected' : ''}>⏳ En attente</option>
        <option value="payee_cash" ${cotStatus === 'payee_cash' ? 'selected' : ''}>💶 Payée cash</option>
        <option value="payee_compte" ${cotStatus === 'payee_compte' ? 'selected' : ''}>💳 Payée compte</option>
      </select>
      <input type="date" value="${s.cotisationDate || ''}" onchange="updateCotisationDate('${s.id}', this.value)" style="padding:0.2rem; font-size:0.8rem; border-radius:4px; border:1px solid var(--border); width: 100%; box-sizing: border-box;">
    `;"""

new_cotSelect = """    const cotSelect = `
      <select class="status-select ${cotClass}" onchange="updateCotisation('${s.id}', this.value)" style="margin: 0; padding-right: 2.2rem; font-size: 0.85rem;">
        <option value="en attente" ${cotStatus === 'en attente' ? 'selected' : ''}>⏳ En attente</option>
        <option value="payee_cash" ${cotStatus === 'payee_cash' ? 'selected' : ''}>💶 Payée cash</option>
        <option value="payee_compte" ${cotStatus === 'payee_compte' ? 'selected' : ''}>💳 Payée compte</option>
      </select>
    `;
    const cotDateSelect = `
      <input type="date" value="${s.cotisationDate || ''}" onchange="updateCotisationDate('${s.id}', this.value)" style="padding:0.2rem; font-size:0.8rem; border-radius:4px; border:1px solid var(--border); box-sizing: border-box; min-width: 120px;">
    `;
"""

js = js.replace(old_cotSelect, new_cotSelect)

old_flex = """          <div style="display: flex; flex-direction: column; gap: 0.3rem;">
            <span style="font-size: 0.8rem; font-weight: 600; color: var(--text-muted);">Cotisation</span>
            ${cotSelect}
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.3rem;">
            <span style="font-size: 0.8rem; font-weight: 600; color: var(--text-muted);">Mutuelle</span>
            ${mutSelect}
          </div>"""

new_flex = """          <div style="display: flex; flex-direction: column; gap: 0.3rem; flex: 1; min-width: 120px;">
            <span style="font-size: 0.8rem; font-weight: 600; color: var(--text-muted);">Cotisation</span>
            ${cotSelect}
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.3rem; flex: 1; min-width: 120px;">
            <span style="font-size: 0.8rem; font-weight: 600; color: var(--text-muted);">Date paiement</span>
            ${cotDateSelect}
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.3rem; flex: 1; min-width: 120px;">
            <span style="font-size: 0.8rem; font-weight: 600; color: var(--text-muted);">Mutuelle</span>
            ${mutSelect}
          </div>"""

js = js.replace(old_flex, new_flex)


# 4. Deletion not working? 
# "J'ai encore tenter de supprimer Léa Dupont mais cela n'a pas fonctionné."
# Let's completely nuke the user cleanup from deleteStudent. We don't care if a parent stays in the DB without children.
js = re.sub(
    r'      // 2\. Clean up parent users safely.*?      }      await DATA\.syncFromFirebase\(\);',
    '      // 2. Clean up skipped due to rules\n      await DATA.syncFromFirebase();',
    js, flags=re.DOTALL
)


with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
