with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

old_header = \"\"\"<div class=\"section-header\">
<span class=\"section-eyebrow reveal\">Rejoindre ADK</span>
<h2 class=\"section-title reveal reveal-delay-1\">Inscription <em>en ligne</em></h2>
<p class=\"section-subtitle reveal reveal-delay-2\">Remplissez ce formulaire et notre équipe vous contactera pour finaliser l'inscription.</p>
<div class=\"divider\"></div>
</div>\"\"\"

new_header = \"\"\"<h2 class=\"vitrine-title reveal\" style=\"text-align: center;\"><span style=\"color: #ffffff;\">Inscription</span> <span style=\"color: #9C5858;\">en ligne</span></h2>
<p class=\"vitrine-subtitle reveal reveal-delay-1\" style=\"margin-bottom: 3rem; text-align: center;\">Remplissez ce formulaire et notre équipe vous contactera pour finaliser l'inscription.</p>\"\"\"

html = html.replace(old_header, new_header)

old_bienvenue = \"<h3>Bienvenue à l'École ADK ??</h3>\"
new_bienvenue = \"<h3 style=\\\"color: #9C5858; font-family: var(--font-display); font-size: 1.8rem; margin-bottom: 1rem;\\\">Bienvenue à l'École ADK ??</h3>\"
html = html.replace(old_bienvenue, new_bienvenue)

old_form = \"<form class=\\\"form-card\\\" id=\\\"inscription-form\\\">\"
new_form = \"<form class=\\\"form-card\\\" id=\\\"inscription-form\\\" style=\\\"background: #ffffff;\\\">\"
html = html.replace(old_form, new_form)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Updated!")
