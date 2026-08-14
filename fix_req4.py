import re

# 1. Update css/style.css
with open('css/style.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Update colors for filter labels, header cells, mobile tabs, and legend items
css = css.replace(
    '.planning-filters .planning-filter-label,\n.planning-legend .legend-item {\n  color: var(--black) !important;\n}',
    '.planning-filters .planning-filter-label,\n.planning-legend .legend-item {\n  color: #9C5858 !important;\n  font-weight: 700;\n}'
)
css = css.replace(
    '.planning-desktop-view .planning-header-cell {\n  background: #f9f9f9 !important;\n  border-color: rgba(0,0,0,0.1) !important;\n  color: var(--black) !important;\n}',
    '.planning-desktop-view .planning-header-cell {\n  background: #f9f9f9 !important;\n  border-color: rgba(0,0,0,0.1) !important;\n  color: #9C5858 !important;\n  font-weight: 700;\n}'
)
css = css.replace(
    '.planning-mobile-view .mobile-day-tab {\n  background: #f0f0f0;\n  color: #333;\n  border-color: rgba(0,0,0,0.1);\n}',
    '.planning-mobile-view .mobile-day-tab {\n  background: #f0f0f0;\n  color: #9C5858;\n  border-color: rgba(0,0,0,0.1);\n  font-weight: 700;\n}'
)
# Make sure active tab is still white text on gold background
css = css.replace(
    '.planning-mobile-view .mobile-day-tab.active { background: var(--gold); color: #ffffff; border-color: var(--gold); }',
    '.planning-mobile-view .mobile-day-tab.active { background: var(--gold); color: #ffffff !important; border-color: var(--gold); }'
)

with open('css/style.css', 'w', encoding='utf-8') as f:
    f.write(css)

# 2. Update js/data.js to add Dim
with open('js/data.js', 'r', encoding='utf-8') as f:
    data = f.read()

data = data.replace(
    'days: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],',
    'days: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],'
)

with open('js/data.js', 'w', encoding='utf-8') as f:
    f.write(data)

# 3. Update index.html
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Add Dim to mobile-day-tabs
old_tabs = '''        <div class="mobile-day-tabs" id="mobile-day-tabs">
          <button class="mobile-day-tab active" data-day="0">Lun</button>
          <button class="mobile-day-tab" data-day="1">Mar</button>
          <button class="mobile-day-tab" data-day="2">Mer</button>
          <button class="mobile-day-tab" data-day="3">Jeu</button>
          <button class="mobile-day-tab" data-day="4">Ven</button>
          <button class="mobile-day-tab" data-day="5">Sam</button>
        </div>'''

new_tabs = '''        <div class="mobile-day-tabs" id="mobile-day-tabs">
          <button class="mobile-day-tab active" data-day="0">Lun</button>
          <button class="mobile-day-tab" data-day="1">Mar</button>
          <button class="mobile-day-tab" data-day="2">Mer</button>
          <button class="mobile-day-tab" data-day="3">Jeu</button>
          <button class="mobile-day-tab" data-day="4">Ven</button>
          <button class="mobile-day-tab" data-day="5">Sam</button>
          <button class="mobile-day-tab" data-day="6">Dim</button>
        </div>'''

html = html.replace(old_tabs, new_tabs)

# Bump versions
html = html.replace('css/style.css?v=16', 'css/style.css?v=17')
html = html.replace('js/data.js?v=15', 'js/data.js?v=17')
html = html.replace('js/app.js?v=15', 'js/app.js?v=17')
html = html.replace('js/vitrine-data.js?v=15', 'js/vitrine-data.js?v=17')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
