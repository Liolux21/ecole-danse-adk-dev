import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

html = re.sub(
    r'<div class="section-header">\s*<span class="section-eyebrow[^>]*>Organisation</span>\s*<h2 class="section-title[^>]*><em>Planning</em> hebdomadaire</h2>\s*<p class="section-subtitle[^>]*>Filtrez par style ou par lieu et trouvez le cours qui vous convient - Saison 2026-2027.</p>\s*<div class="divider"></div>\s*</div>',
    r'<h2 class="vitrine-title reveal"><span style="color: #ffffff;">Planning</span> <span style="color: #9C5858;">hebdomadaire</span></h2>\n      <p class="vitrine-subtitle reveal reveal-delay-1" style="margin-bottom: 2rem;">Filtrez par style ou par lieu et trouvez le cours qui vous convient - Saison 2026-2027.</p>',
    html
)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
