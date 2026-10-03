import re

with open('portail.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace Admin
admin_old = '''              <span class="data-table-title">👦 Liste des élèves</span>
              <select id="admin-eleves-filter" class="form-input" style="width: auto; min-width: 250px;" onchange="renderAdminEleves()">
                <option value="all">Tous les élèves</option>
                <!-- Rempli dynamiquement en JS -->
              </select>'''
admin_new = '''              <span class="data-table-title">👦 Liste des élèves</span>
              <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
                <input type="text" id="admin-eleves-search" class="form-input" placeholder="🔍 Rechercher..." onkeyup="renderAdminEleves()" style="min-width: 150px;">
                <select id="admin-eleves-filter" class="form-input" style="width: auto; min-width: 200px;" onchange="renderAdminEleves()">
                  <option value="all">Tous les élèves</option>
                  <!-- Rempli dynamiquement en JS -->
                </select>
              </div>'''
content = content.replace(admin_old, admin_new)

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(content)
