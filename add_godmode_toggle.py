lines = open('js/app.js', 'r', encoding='utf-8').readlines()
for i, line in enumerate(lines):
    if "const isGodMode = user.email && user.email.toLowerCase() === 'lionel.henrion@gmail.com';" in line:
        lines.insert(i + 1, "  const godModeSettings = document.getElementById('god-mode-settings');\n  if(godModeSettings) godModeSettings.style.display = isGodMode ? 'block' : 'none';\n")
        break

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.writelines(lines)
