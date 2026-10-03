with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

html = html.replace(r"openModal(\'modal-gala-themes\')", r"openModal('modal-gala-themes')")

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(html)
