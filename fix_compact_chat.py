import re

def fix_compact():
    # 1. Update chat.js inline styles
    with open('js/chat.js', 'r', encoding='utf-8') as f:
        chat = f.read()
    
    # Replace subtitle styling
    chat = chat.replace('font-size: 0.75rem; color: var(--primary); margin-top: -2px; margin-bottom: 2px;', 
                        'font-size: 0.7rem; color: var(--primary); margin-top: -2px; margin-bottom: 0px;')
    # Replace title styling
    chat = chat.replace('font-size: 0.95rem; font-weight: 600;', 
                        'font-size: 0.85rem; font-weight: 600;')
                        
    # Replace header styling for groups (e.g. '🛡️ Administration ADK')
    chat = chat.replace("font-size: 0.72rem; font-weight: 700; color: var(--gold); text-transform: uppercase; letter-spacing: 0.05em; background: #f0f0f0; border-top: 1px solid var(--border); margin-top: 0.25rem;",
                        "font-size: 0.65rem; font-weight: 700; color: var(--gold); text-transform: uppercase; letter-spacing: 0.05em; background: #f0f0f0; border-top: 1px solid var(--border); padding: 4px 10px;")
    
    with open('js/chat.js', 'w', encoding='utf-8') as f:
        f.write(chat)

    # 2. Update css/style.css
    with open('css/style.css', 'r', encoding='utf-8') as f:
        css = f.read()

    css = css.replace(""".conv-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 15px;
  cursor: pointer;
  border-bottom: 1px solid var(--border);
  transition: var(--transition);
}""", """.conv-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  cursor: pointer;
  border-bottom: 1px solid var(--border);
  transition: var(--transition);
}""")

    css = css.replace(""".conv-avatar {
  width: 40px;
  height: 40px;""", """.conv-avatar {
  width: 32px;
  height: 32px;""")

    css = css.replace(""".conv-top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
}""", """.conv-top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2px;
}""")

    css = css.replace(""".conv-name {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--text-dark);
}""", """.conv-name {
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--text-dark);
}""")

    css = css.replace(""".conv-preview {
  font-size: 0.8rem;""", """.conv-preview {
  font-size: 0.75rem;""")

    with open('css/style.css', 'w', encoding='utf-8') as f:
        f.write(css)

    # 3. Update portail.html internal CSS
    with open('portail.html', 'r', encoding='utf-8') as f:
        html = f.read()

    html = html.replace("""      .conv-item {
        display: flex; align-items: center; gap: 12px; padding: 12px 16px;""", 
"""      .conv-item {
        display: flex; align-items: center; gap: 8px; padding: 6px 10px;""")

    html = html.replace("""      .conv-avatar {
        width: 40px; height: 40px;""", 
"""      .conv-avatar {
        width: 32px; height: 32px;""")

    html = html.replace("""      .conv-top { display: flex; justify-content: space-between; margin-bottom: 4px; }
      .conv-name { font-weight: 600; font-size: 14px;""",
"""      .conv-top { display: flex; justify-content: space-between; margin-bottom: 2px; }
      .conv-name { font-weight: 600; font-size: 13px;""")

    html = html.replace("""      .conv-time { font-size: 11px; color: var(--text-light); }
      .conv-preview { font-size: 12px;""",
"""      .conv-time { font-size: 10px; color: var(--text-light); }
      .conv-preview { font-size: 11px;""")

    with open('portail.html', 'w', encoding='utf-8') as f:
        f.write(html)
        
    print("Success")

fix_compact()
