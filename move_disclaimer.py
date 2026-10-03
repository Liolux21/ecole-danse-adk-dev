import re

with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Remove the disclaimer from the right header
old_right_header = """      <div style="padding: 1rem; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; height: 60px; box-sizing: border-box;">
        <div style="display: flex; align-items: center; gap: 1rem;">
          <button id="btn-back-to-list" style="background: none; border: none; font-size: 1.5rem; color: #CAA9A9; cursor: pointer; display: none;">&larr;</button>
          <h3 id="active-chat-title" style="margin:0; font-size: 1.1rem; color: var(--gold);">Sélectionnez une discussion</h3>
          <span style="font-size: 0.75rem; color: var(--text-muted);">⚠️ Toutes les discussions sont visibles par l'administration.</span>
        </div>
      </div>"""
      
new_right_header = """      <div style="padding: 1rem; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; height: 60px; box-sizing: border-box;">
        <div style="display: flex; align-items: center; gap: 1rem;">
          <button id="btn-back-to-list" style="background: none; border: none; font-size: 1.5rem; color: #CAA9A9; cursor: pointer; display: none;">&larr;</button>
          <h3 id="active-chat-title" style="margin:0; font-size: 1.1rem; color: var(--gold);">Sélectionnez une discussion</h3>
        </div>
      </div>
      <!-- Warning Banner -->
      <div style="background: #F0D5D5; padding: 0.5rem; text-align: center; font-size: 0.75rem; color: #4A3E3E; border-bottom: 1px solid var(--border);">
        ⚠️ Toutes les communications sont visibles par l'administration.
      </div>"""

html = html.replace(old_right_header, new_right_header)

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(html)
