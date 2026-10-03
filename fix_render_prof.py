import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Remove takenCourses line
js = re.sub(
    r"const takenCourses = \(p\.courseIds \|\| \[\]\)\.map\(id => DATA\.getCourseById\(id\)\?\.name \|\| ''\)\.filter\(Boolean\)\.join\(', '\);",
    "",
    js
)

# Remove HTML element for takenCourses
js = re.sub(
    r'<div style="font-size: 0\.9rem; color: var\(--text-muted\);"><strong>👟 Cours suivis :</strong> \$\{takenCourses \|\| \'-\'\}</div>',
    "",
    js
)

# Also fix rendering p.name. If they just added it, p.firstname and p.lastname will be there.
# It should fallback to p.name for old profs.
js = re.sub(
    r"\$\{p\.name\}",
    "${p.firstname ? p.firstname + ' ' + p.lastname : p.name}",
    js
)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
