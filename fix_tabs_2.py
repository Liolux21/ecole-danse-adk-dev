import re
with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Remove all existing notification tabs
prof_tab_regex = r'\s*<!-- Tab: Prof Notifications -->.*?</div>\s*</div>'
html = re.sub(prof_tab_regex, '', html, flags=re.DOTALL)

parent_tab_regex = r'\s*<!-- Tab: Parent Notifications -->.*?</div>\s*</div>'
html = re.sub(parent_tab_regex, '', html, flags=re.DOTALL)

# Insert prof tab correctly once
prof_content = '''
          <!-- Tab: Prof Notifications -->
          <div class="tab-content" id="tab-prof-notifications">
            <div class="parent-section-header" style="color: #9C5858;">🔔 Centre de Notifications</div>
            <div id="prof-notifications-full-list" style="display:flex; flex-direction:column; gap:1rem; margin-top:1rem;"></div>
          </div>
'''
html = html.replace('<!-- Tab: Prof Gala -->', prof_content.strip('\n') + '\n          <!-- Tab: Prof Gala -->', 1)

# Insert parent tab correctly once
parent_content = '''
          <!-- Tab: Parent Notifications -->
          <div class="tab-content" id="tab-parent-notifications">
            <div class="parent-section-header" style="color: #9C5858;">🔔 Centre de Notifications</div>
            <div id="parent-notifications-full-list" style="display:flex; flex-direction:column; gap:1rem; margin-top:1rem;"></div>
          </div>
'''
html = html.replace('<!-- Tab: Gala Parent -->', parent_content.strip('\n') + '\n          <!-- Tab: Gala Parent -->', 1)

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(html)
print('Fixed portail.html notification tabs')
