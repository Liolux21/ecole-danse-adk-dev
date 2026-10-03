with open('portail.html', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    '<div style="background: #ffffff; padding: 1.5rem; border-radius: var(--radius); box-shadow: 0 4px 15px rgba(0,0,0,0.05); margin-bottom: 1.5rem; border-left: 4px solid var(--gold);">',
    '<div style="margin-bottom: 2.5rem; padding-bottom: 1.5rem; border-bottom: 1px solid #eee;">'
)

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(content)
