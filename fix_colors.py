with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Steps
html = html.replace(\"<h4>Remplissez le formulaire</h4>\", \"<h4 style=\\\"color: #9C5858;\\\">Remplissez le formulaire</h4>\")
html = html.replace(\"<h4>Nous vous contactons</h4>\", \"<h4 style=\\\"color: #9C5858;\\\">Nous vous contactons</h4>\")
html = html.replace(\"<h4>Cours d'essai gratuit</h4>\", \"<h4 style=\\\"color: #9C5858;\\\">Cours d'essai gratuit</h4>\")
html = html.replace(\"<h4>Bienvenue dans la famille ADK !</h4>\", \"<h4 style=\\\"color: #9C5858;\\\">Bienvenue dans la famille ADK !</h4>\")

# Form Title
html = html.replace(\"<h3 class=\\\"form-title\\\">Formulaire d'inscription</h3>\", \"<h3 class=\\\"form-title\\\" style=\\\"color: #9C5858;\\\">Formulaire d'inscription</h3>\")

# Subtitles
html = html.replace(\"<div class=\\\"form-section-title\\\" style=\\\"border-top:none;padding-top:0;\\\">?? Informations de l'élève</div>\", \"<div class=\\\"form-section-title\\\" style=\\\"border-top:none;padding-top:0; color: #9C5858;\\\">?? Informations de l'élève</div>\")
html = html.replace(\"<div class=\\\"form-section-title\\\">???????? Informations du parent / tuteur</div>\", \"<div class=\\\"form-section-title\\\" style=\\\"color: #9C5858;\\\">???????? Informations du parent / tuteur</div>\")
html = html.replace(\"<div class=\\\"form-section-title\\\">?? Cours souhaité(s)</div>\", \"<div class=\\\"form-section-title\\\" style=\\\"color: #9C5858;\\\">?? Cours souhaité(s)</div>\")

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
