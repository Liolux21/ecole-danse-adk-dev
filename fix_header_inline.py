import re

with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Fix left header
old_left = '<div style="padding: 1rem; border-bottom: 1px solid var(--border); background: #fff; display: flex; justify-content: space-between; align-items: center; height: 85px; box-sizing: border-box;">'
new_left = '<div style="padding: 1rem; border-bottom: 1px solid var(--border); background: #fff; display: flex; justify-content: space-between; align-items: center; height: 60px; box-sizing: border-box;">'
html = html.replace(old_left, new_left)

# Fix right header
old_right_header = """      <div style="padding: 1rem; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; height: 85px; box-sizing: border-box;">
        <div>
          <h3 id="active-chat-title" style="margin:0; font-size: 1.1rem; color: var(--gold);">Sélectionnez une discussion</h3>
          <span style="font-size: 0.7rem; color: var(--text-muted); display: inline-block; margin-top: 4px;">⚠️ Toutes les discussions sont visibles par l'administration.</span>
        </div>
      </div>"""
new_right_header = """      <div style="padding: 1rem; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; height: 60px; box-sizing: border-box;">
        <div style="display: flex; align-items: center; gap: 1rem;">
          <h3 id="active-chat-title" style="margin:0; font-size: 1.1rem; color: var(--gold);">Sélectionnez une discussion</h3>
          <span style="font-size: 0.75rem; color: var(--text-muted);">⚠️ Toutes les discussions sont visibles par l'administration.</span>
        </div>
      </div>"""
html = html.replace(old_right_header, new_right_header)

# bump cache
html = re.sub(r'src="js/chat.js\?v=\d+"', 'src="js/chat.js?v=15"', html)

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(html)
