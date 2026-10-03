import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Title margin
html = html.replace(
    'style="margin: 0 0 0.4rem 0; font-size: 1.6rem; text-align: left; color: #9C5858;"',
    'style="margin: 0 0 1rem 0; font-size: 1.6rem; text-align: left; color: #9C5858;"'
)

# 2. Desc margin-bottom -> 1rem
html = html.replace(
    '<div style="margin-bottom: 0.5rem;">',
    '<div style="margin-bottom: 1.5rem;">'
)

# 3. subCoursesHtml margin & padding -> 1.5rem / 1rem
html = html.replace(
    '<div style="margin-top: 0.4rem; border-top: 1px solid rgba(0,0,0,0.1); padding-top: 0.5rem;">',
    '<div style="margin-top: 1rem; border-top: 1px solid rgba(0,0,0,0.1); padding-top: 1.5rem;">'
)

# 4. Carousel container margin-top -> 2.5rem
html = html.replace(
    '<div style="margin-top: 1rem;">\n              <h4',
    '<div style="margin-top: 2.5rem;">\n              <h4'
)

# 5. Galerie title margin-bottom -> 1rem
html = html.replace(
    'margin: 0 0 0.4rem 0;">Galerie</h4>',
    'margin: 0 0 1rem 0;">Galerie</h4>'
)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
