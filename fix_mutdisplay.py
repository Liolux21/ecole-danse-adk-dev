import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Fix mutDisplay definition
bad_def = "const mutDisplay = (mutStatus === 'masque') ? '<td style=\"color:#aaa;\">Masqu\\u01F8</td>' : `${mutDisplay}`;"
good_def = "const mutDisplay = (mutStatus === 'masque') ? '<td style=\"color:#aaa;\">Masqué</td>' : `<td><span class=\"status-pill ${mutClass}\">${mutLabel}</span></td>`;"
js = js.replace(bad_def, good_def)
# Actually, the file uses 'MasquǸ', let's use a regex to be safe
js = re.sub(
    r"const mutDisplay = \(mutStatus === 'masque'\) \? '<td style=\"color:#aaa;\">.*?</td>' : `\$\{mutDisplay\}`;",
    """const mutDisplay = (mutStatus === 'masque') ? '<td style="color:#aaa;">Masqué</td>' : `<td><span class="status-pill ${mutClass}">${mutLabel}</span></td>`;""",
    js
)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
