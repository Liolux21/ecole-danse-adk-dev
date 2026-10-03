with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

old_render = \"\"\"function renderAdminInscriptions() {
  const list = document.getElementById('admin-inscription-list');
  list.innerHTML = '';
  if (DATA.inscriptions.length === 0) {
    list.innerHTML = '<div class=\"empty-state\"><div class=\"empty-state-icon\">??</div><p>Aucune inscription</p></div>';
    return;
  }
  DATA.inscriptions.forEach(ins => {\"\"\"

new_render = \"\"\"function renderAdminInscriptions() {
  const list = document.getElementById('admin-inscription-list');
  const filterSelect = document.getElementById('admin-inscriptions-filter');
  const filter = filterSelect ? filterSelect.value : 'pending';
  
  list.innerHTML = '';
  
  const filtered = DATA.inscriptions.filter(ins => filter === 'all' || ins.status === filter);
  
  if (filtered.length === 0) {
    list.innerHTML = '<div class=\"empty-state\"><div class=\"empty-state-icon\">??</div><p>Aucune inscription</p></div>';
    return;
  }
  filtered.forEach(ins => {\"\"\"

js = js.replace(old_render, new_render)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
print("Updated renderAdminInscriptions")
