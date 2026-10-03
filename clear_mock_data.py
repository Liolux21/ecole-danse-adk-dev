import re

with open('js/data.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Clear users
js = re.sub(r'users: \[\s*\{.*?\}\s*\],', 'users: [],', js, flags=re.DOTALL)

# Clear students
js = re.sub(r'students: \[\s*\{.*?\}\s*\],', 'students: [],', js, flags=re.DOTALL)

# Clear attendance
js = re.sub(r'attendance: \[\s*\{.*?\}\s*\],', 'attendance: [],', js, flags=re.DOTALL)

# Clear inscriptions (maybe keep them empty too)
js = re.sub(r'inscriptions: \[\s*\{.*?\}\s*\],', 'inscriptions: [],', js, flags=re.DOTALL)

# Leave announcements? Let's clear mock announcements too
js = re.sub(r'announcements: \[\s*\{.*?\}\s*\],', 'announcements: [],', js, flags=re.DOTALL)

with open('js/data.js', 'w', encoding='utf-8') as f:
    f.write(js)
