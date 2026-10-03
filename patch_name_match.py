import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    content = f.read()

old_str = "const studentMatch = DATA.students.find(s => s.firstname === searchName || (s.firstname + ' ' + s.lastname) === fullName || s.name === fullName);"
new_str = "const studentMatch = DATA.students.find(s => (s.firstname + ' ' + s.lastname).toLowerCase().normalize('NFD').replace(/[\\u0300-\\u036f]/g, '') === fullName.toLowerCase().normalize('NFD').replace(/[\\u0300-\\u036f]/g, ''));"

content = content.replace(old_str, new_str)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(content)
print("Replaced matching logic")
