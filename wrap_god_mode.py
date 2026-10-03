lines = open('portail.html', 'r', encoding='utf-8').readlines()
start_idx = 0
for i, line in enumerate(lines):
    if 'Mise à jour du Planning & Professeurs 26-27' in line:
        start_idx = i - 2
        break

end_idx = 0
for i, line in enumerate(lines[start_idx:]):
    if 'Tout remettre à zéro (Notifications & Messagerie)' in line:
        end_idx = start_idx + i + 2
        break

lines.insert(end_idx, '</div>\n')
lines.insert(start_idx, '<div id="god-mode-settings" style="display: none;">\n')

with open('portail.html', 'w', encoding='utf-8') as f:
    f.writelines(lines)
