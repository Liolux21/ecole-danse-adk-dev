import re

with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Fix left header
html = html.replace('<div style="padding: 1rem; border-bottom: 1px solid var(--border); background: #fff; display: flex; justify-content: space-between; align-items: center;">\n          <h3 style="margin:0; font-size: 1.1rem; color: var(--gold);">Conversations</h3>', '<div style="padding: 1rem; border-bottom: 1px solid var(--border); background: #fff; display: flex; justify-content: space-between; align-items: center; min-height: 75px; box-sizing: border-box;">\n          <h3 style="margin:0; font-size: 1.1rem; color: var(--gold);">Conversations</h3>')

# Fix right header
html = html.replace('<div style="padding: 1rem; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between;">\n        <div>\n          <h3 id="active-chat-title" style="margin:0; font-size: 1.1rem; color: var(--gold);">Sélectionnez une discussion</h3>', '<div style="padding: 1rem; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; min-height: 75px; box-sizing: border-box;">\n        <div>\n          <h3 id="active-chat-title" style="margin:0; font-size: 1.1rem; color: var(--gold);">Sélectionnez une discussion</h3>')

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(html)
