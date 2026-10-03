import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('( ans)', '(${window.calculateAge(s.dob)} ans)')
content = content.replace('class="appel-student-info"> ans</div>', 'class="appel-student-info">${window.calculateAge(s.dob)} ans</div>')

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(content)
print('Fixed empty age rendering')
