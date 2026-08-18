import re

with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Prof Dashboard
prof_tab = '<button class="dash-tab" data-tab="prof-notifications">🔔 Notifications <span id="prof-notif-badge" class="tab-badge" style="display:none; background-color:#e74c3c; color:white; padding:0.1rem 0.4rem; border-radius:50%; font-size:0.7rem;">0</span></button>'
html = html.replace('<button class="dash-tab" data-tab="prof-gala">🌟 Gala</button>', '<button class="dash-tab" data-tab="prof-gala">🌟 Gala</button>\n          ' + prof_tab)

prof_content = '''
        <!-- Tab: Prof Notifications -->
        <div class="tab-content" id="tab-prof-notifications">
          <div class="parent-section-header" style="color: #9C5858;">🔔 Centre de Notifications</div>
          <div id="prof-notifications-full-list" style="display:flex; flex-direction:column; gap:1rem; margin-top:1rem;"></div>
        </div>
'''
html = html.replace('<!-- Tab: Prof Gala -->', prof_content + '        <!-- Tab: Prof Gala -->')

# Parent Dashboard
parent_tab = '<button class="dash-tab" data-tab="parent-notifications">🔔 Notifications <span id="parent-notif-badge" class="tab-badge" style="display:none; background-color:#e74c3c; color:white; padding:0.1rem 0.4rem; border-radius:50%; font-size:0.7rem;">0</span></button>'
html = html.replace('<button class="dash-tab" data-tab="parent-gala">🌟 Gala</button>', '<button class="dash-tab" data-tab="parent-gala">🌟 Gala</button>\n          ' + parent_tab)

parent_content = '''
        <!-- Tab: Parent Notifications -->
        <div class="tab-content" id="tab-parent-notifications">
          <div class="parent-section-header" style="color: #9C5858;">🔔 Centre de Notifications</div>
          <div id="parent-notifications-full-list" style="display:flex; flex-direction:column; gap:1rem; margin-top:1rem;"></div>
        </div>
'''
html = html.replace('<!-- Tab: Parent Gala -->', parent_content + '        <!-- Tab: Parent Gala -->')

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(html)
print('portail.html tabs updated')
