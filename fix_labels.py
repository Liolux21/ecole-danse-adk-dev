import re

with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Fix labels by wrapping the input or adding 'for'
# "Prénom" label
html = html.replace('<label class="form-label">Prénom</label>\n                <input type="text" id="add-student-firstname"',
                    '<label class="form-label" for="add-student-firstname">Prénom</label>\n                <input type="text" id="add-student-firstname"')

# "Nom" label
html = html.replace('<label class="form-label">Nom</label>\n                <input type="text" id="add-student-lastname"',
                    '<label class="form-label" for="add-student-lastname">Nom</label>\n                <input type="text" id="add-student-lastname"')

# "Âge" label
html = html.replace('<label class="form-label">Âge</label>\n              <input type="number" id="add-student-age"',
                    '<label class="form-label" for="add-student-age">Âge</label>\n              <input type="number" id="add-student-age"')

# "Cours (sélection multiple)" label
html = html.replace('<label class="form-label">Cours (sélection multiple)</label>\n              <select id="add-student-courses"',
                    '<label class="form-label" for="add-student-courses">Cours (sélection multiple)</label>\n              <select id="add-student-courses"')

# "Email de contact (Parent)" label
html = html.replace('<label class="form-label">Email de contact (Parent)</label>\n              <input type="email" id="add-student-email"',
                    '<label class="form-label" for="add-student-email">Email de contact (Parent)</label>\n              <input type="email" id="add-student-email"')

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Labels fixed.")
