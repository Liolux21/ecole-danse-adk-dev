import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Presentation bottom margin
html = html.replace('<div style="margin-bottom: 1.5rem;">\n               <p', '<div style="margin-bottom: 0.5rem;">\n               <p')

# 2. subCoursesHtml top margin
html = html.replace('<div style="margin-top: 0.8rem; border-top: 1px solid rgba(0,0,0,0.1); padding-top: 0.8rem;">',
                    '<div style="margin-top: 0.4rem; border-top: 1px solid rgba(0,0,0,0.1); padding-top: 0.5rem;">')

# 3. Carousel container top margin
html = html.replace('<div style="margin-top: 2rem;">\n              <h4', '<div style="margin-top: 1rem;">\n              <h4')

# 4. Galerie title bottom margin
html = html.replace('margin: 0 0 0.8rem 0;">Galerie</h4>', 'margin: 0 0 0.4rem 0;">Galerie</h4>')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
