import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Match the exact takenCourses div by its structure rather than exact characters
js = re.sub(
    r'<div style="font-size: 0\.9rem; color: var\(--text-muted\);"><strong>[^<]*Cours suivis :</strong> \$\{takenCourses \|\| \'-\'\}</div>',
    "",
    js
)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
