import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# 1. Update renderProfEleves Mutuelle display
prof_old = """    // Mutuelle display
    const mutStatus = s.mutuelle || 'attente';
    const mutClass = mutStatus === 'remis' ? 'pill-approved' : (mutStatus === 'cours' ? 'pill-pending' : 'pill-rejected');
    const mutLabel = mutStatus === 'remis' ? '✅ Remis' : (mutStatus === 'cours' ? '⏳ En cours' : '⚠️ En attente');
    """
prof_new = """    // Mutuelle display
    const mutStatus = s.mutuelle || 'masque';
    const mutClass = mutStatus === 'remis' ? 'pill-approved' : (mutStatus === 'en_cours' ? 'pill-pending' : 'pill-rejected');
    const mutLabel = mutStatus === 'remis' ? '✅ Remis' : (mutStatus === 'en_cours' ? '⏳ En cours' : '⚠️ En attente');
    const mutDisplay = (mutStatus === 'masque') ? '' : `<td><span class="status-pill ${mutClass}">${mutLabel}</span></td>`;
    """

# Replace the old td for mutuelle in Prof view
prof_td_old = "<td><span class=\"status-pill ${mutClass}\">${mutLabel}</span></td>"
prof_td_new = "${mutDisplay}"

if "const mutStatus = s.mutuelle || 'attente';" in js:
    # First, let's fix the Prof view <td> inside renderProfEleves
    # We find the table row template in renderProfEleves.
    pass

# Let's do a smarter replace using regex for renderProfEleves
js = re.sub(
    r"// Mutuelle display\s*const mutStatus = s\.mutuelle \|\| 'attente';\s*const mutClass =.*?;.*?const mutLabel =.*?;",
    """// Mutuelle display
    const mutStatus = s.mutuelle || 'masque';
    const mutClass = mutStatus === 'remis' ? 'pill-approved' : (mutStatus === 'en_cours' ? 'pill-pending' : 'pill-rejected');
    const mutLabel = mutStatus === 'remis' ? '✅ Remis' : (mutStatus === 'en_cours' ? '⏳ En cours' : '⚠️ En attente');
    const mutDisplay = (mutStatus === 'masque') ? '<td style="color:#aaa;">Masqué</td>' : `<td><span class="status-pill ${mutClass}">${mutLabel}</span></td>`;""",
    js, flags=re.DOTALL
)

js = js.replace("<td><span class=\"status-pill ${mutClass}\">${mutLabel}</span></td>", "${mutDisplay}")

# 2. Update renderChildData (Parent view)
parent_old = """  // Mutuelle
  const mutStatus = child.mutuelle || 'attente';
  const mutClass = mutStatus === 'remis' ? 'pill-approved' : (mutStatus === 'cours' ? 'pill-pending' : 'pill-rejected');
  const mutLabel = mutStatus === 'remis' ? '✅ Remis' : (mutStatus === 'cours' ? '⏳ En cours' : '⚠️ En attente');
  document.getElementById('parent-stat-mutuelle').innerHTML = `<span class="status-pill ${mutClass}">${mutLabel}</span>`;"""

parent_new = """  // Mutuelle
  const mutStatus = child.mutuelle || 'masque';
  const mutClass = mutStatus === 'remis' ? 'pill-approved' : (mutStatus === 'en_cours' ? 'pill-pending' : 'pill-rejected');
  const mutLabel = mutStatus === 'remis' ? '✅ Remis' : (mutStatus === 'en_cours' ? '⏳ En cours' : '⚠️ En attente');
  document.getElementById('parent-stat-mutuelle').innerHTML = (mutStatus === 'masque') ? '<span style="color:#aaa; font-size:0.85rem;">Masqué</span>' : `<span class="status-pill ${mutClass}">${mutLabel}</span>`;"""

js = js.replace(parent_old, parent_new)
js = js.replace("mutStatus === 'cours'", "mutStatus === 'en_cours'")

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
