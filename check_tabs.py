with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

idx = html.find('id="admin-tabs"')
print(html[idx:idx+400])
