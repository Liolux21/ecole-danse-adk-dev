import re
with open('js/vitrine-data.js', 'r', encoding='utf-8') as f:
    js = f.read()

match = re.search(r'"professeurs": \{(.*?)\},\n  "cours":', js, re.DOTALL)
if match:
    profs_text = match.group(1)
    titles = re.findall(r'"title": "(.*?)"', profs_text)
    avatars = re.findall(r'"avatar": "(.*?)"', profs_text)
    for t, a in zip(titles, avatars):
        print(f'{t}: {a}')
