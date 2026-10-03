const fs = require('fs');

let content = fs.readFileSync('js/app.js', 'utf8');

// Replace using string literals to avoid regex parsing errors with unknown characters
content = content.replace('o"? Prestation valid?e', '?? Prestation validée');
content = content.replace('o. Prestation valid?e', '?? Prestation validée');

content = content.replace('<div class="empty-state-icon">Y\'</div><p>Aucun ?lve dans ce cours</p>', '<div class="empty-state-icon">??</div><p>Aucun élève dans ce cours</p>');
content = content.replace('<div class="empty-state-icon">Y\'</div><p>Aucun ?lve dans ce cours</p>', '<div class="empty-state-icon">??</div><p>Aucun élève dans ce cours</p>');

content = content.replace('title="Pr?sent(e)">o"? Pr?sent', 'title="Présent(e)">?? Présent');
content = content.replace('title="Absent(e)">?O Absent', 'title="Absent(e)">? Absent');
content = content.replace('title="Excus?(e)">z- Excus?', 'title="Excusé(e)">? Excusé');

content = content.replace(/Pr?sent/g, 'Présent');
content = content.replace(/Excus?/g, 'Excusé');
content = content.replace(/valid?e/g, 'validée');
content = content.replace(/?lve/g, 'élève');
content = content.replace(/?lve/g, 'élève');
content = content.replace(/D?tails/g, 'Détails');
content = content.replace(/d?tails/g, 'détails');

fs.writeFileSync('js/app.js', content, 'utf8');
