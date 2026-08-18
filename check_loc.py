with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

idx = html.find('parent-announcements-container')
if idx != -1:
    print(html[max(0, idx-200):idx+300].encode('ascii', 'ignore').decode('ascii'))
