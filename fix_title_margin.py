import re

with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Replace section inline style
pattern_section = r'(<section id="parents" class="vitrine-section" style="min-height: calc\(100vh - 80px - 250px\); display: flex; flex-direction: column;)(?=">)'
replacement_section = r'\1 justify-content: center; padding-top: 1.5rem;'

html = re.sub(pattern_section, replacement_section, html)

# Remove h2 default margin-top to reduce space above it further if needed, but justify-content: center should be enough.
pattern_h2 = r'(<h2 class="vitrine-title reveal" style=")(text-align: center; font-size: clamp)'
replacement_h2 = r'\1margin-top: 0; margin-bottom: 1rem; \2'
html = re.sub(pattern_h2, replacement_h2, html)

# Wait, we already replaced the font-size clamp. Let's just do:
pattern_h2_alt = r'(<h2 class="vitrine-title reveal" style=")'
# Actually, let's just make sure it's correct:
if 'margin-top: 0; margin-bottom: 1rem;' not in html:
    html = re.sub(r'(<h2 class="vitrine-title reveal" style=")(?!margin-top: 0)', r'\1margin-top: 0; margin-bottom: 1rem; ', html)


with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(html)
