import bs4

with open('inscription_snippet.html', 'r', encoding='utf-8') as f:
    snippet_soup = bs4.BeautifulSoup(f.read(), 'html.parser')
    
section = snippet_soup.find('section', id='inscription')
if section:
    section['class'] = section.get('class', []) + ['vitrine-section']
    section['style'] = 'background: var(--dark-2); border-radius: var(--radius); box-shadow: var(--shadow-card); margin-bottom: 2rem;'
    
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()
    
idx = html.find('<section id="contact"')
if idx != -1:
    new_html = html[:idx] + str(section) + '\n  ' + html[idx:]
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(new_html)
    print('Successfully injected into index.html')
else:
    print('Failed to find contact section')
