import re

with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Remove all options containing gala-tenues
html = re.sub(r'<option value="[a-z]+-gala-tenues">.*?</option>\n?', '', html)

# Remove all buttons containing gala-tenues
html = re.sub(r'<button[^>]*data-tab="[a-z]+-gala-tenues".*?</button>\n?', '', html)

# Remove all tab-contents containing gala-tenues
html = re.sub(r'<div class="tab-content" id="[a-z]+-gala-tenues">.*?</div>\n', '', html, flags=re.DOTALL)

# Update Lieux
pattern_lieu = r'<select id="gala-rep-lieu" class="form-input" required>.*?<option value="Autre">Autre</option>\n\s*</select>'
replacement_lieu = r'''<select id="gala-rep-lieu" class="form-input" required>
                <option value="ADK">ADK</option>
                <option value="ROX">ROX</option>
                <option value="Centre Sportif Florenville">Centre Sportif Florenville</option>
                <option value="Centre Sportif Jamoigne">Centre Sportif Jamoigne</option>
                <option value="Autre">Autre</option>
              </select>'''
html = re.sub(pattern_lieu, replacement_lieu, html, flags=re.DOTALL)


with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(html)
