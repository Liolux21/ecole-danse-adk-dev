with open('js/app.js', 'r', encoding='utf-8') as f:
    app = f.read()

old_html = """      <div style="background:var(--dark-2); border-left:4px solid var(--gold); border-radius:4px; padding:1.5rem;">
        <div style="font-size:0.8rem; color:var(--gold); margin-bottom:0.5rem;">Administration ADK &bull; Le ${date}</div>
        <h4 style="margin:0 0 0.5rem 0; color:#9C5858;">${ann.title}</h4>
        <div style="white-space:pre-wrap; color:var(--text-muted); font-size:0.95rem;">${ann.content}</div>
      </div>"""

new_html = """      <div class="parent-notification-banner" style="display:flex; flex-direction:column; align-items:flex-start; gap:0.5rem; margin-bottom:0;">
        <div style="font-size:0.8rem; color:var(--primary); font-weight:600;">Administration ADK &bull; Le ${date}</div>
        <h4 style="margin:0; color:var(--primary); font-size:1.1rem;">${ann.title}</h4>
        <div style="white-space:pre-wrap; color:var(--text-light); font-size:0.95rem; line-height:1.4;">${ann.content}</div>
      </div>"""

app = app.replace(old_html, new_html)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(app)

print('app.js updated')
