import re

def update_portail_icons():
    with open('portail.html', 'r', encoding='utf-8') as f:
        html = f.read()

    # 1. Update btn-toggle-archived
    old_toggle = '<button id="btn-toggle-archived" style="width: 100%; background: none; border: none; font-size: 0.8rem; color: var(--text-muted); cursor: pointer; padding: 0.3rem;">🗃️ Voir les archives</button>'
    new_toggle = '<button id="btn-toggle-archived" style="width: 100%; background: none; border: none; font-size: 0.8rem; color: var(--text-muted); cursor: pointer; padding: 0.3rem; display: flex; align-items: center; justify-content: center; gap: 0.4rem;"><svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="21 8 21 21 3 21 3 8"></polyline><rect x="1" y="3" width="22" height="5"></rect><line x1="10" y1="12" x2="14" y2="12"></line></svg> Voir les archives</button>'
    
    # 2. Update btn-archive-chat
    old_archive = '<button id="btn-archive-chat" style="display:none; background:none; border:none; cursor:pointer; font-size:1.2rem; padding:0.4rem; border-radius:8px;" onmouseenter="this.style.background=\'#f0f0f0\'" onmouseleave="this.style.background=\'none\'" title="Archiver cette discussion">🗃️</button>'
    new_archive = '<button id="btn-archive-chat" style="display:none; background:none; border:none; cursor:pointer; padding:0.4rem; border-radius:8px; display:flex; align-items:center; justify-content:center; color: var(--text-color);" onmouseenter="this.style.background=\'#f0f0f0\'" onmouseleave="this.style.background=\'none\'" title="Archiver cette discussion"><svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="21 8 21 21 3 21 3 8"></polyline><rect x="1" y="3" width="22" height="5"></rect><line x1="10" y1="12" x2="14" y2="12"></line></svg></button>'
    
    # 3. Update btn-attach
    old_attach = '<button id="btn-attach" title="Joindre un fichier" style="background:none;border:none;font-size:1.2rem;cursor:pointer;padding:0.2rem 0.4rem;border-radius:8px;flex-shrink:0;" onmouseenter="this.style.background=\'#f0f0f0\'" onmouseleave="this.style.background=\'none\'">📎</button>'
    new_attach = '<button id="btn-attach" title="Joindre un fichier" style="background:none;border:none;cursor:pointer;padding:0.2rem 0.4rem;border-radius:8px;flex-shrink:0;display:flex;align-items:center;justify-content:center;color:var(--text-color);" onmouseenter="this.style.background=\'#f0f0f0\'" onmouseleave="this.style.background=\'none\'"><svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg></button>'
    
    html = html.replace(old_toggle, new_toggle)
    html = html.replace(old_archive, new_archive)
    html = html.replace(old_attach, new_attach)
    
    # Also I noticed a btn-manage-chat gear emoji "⚙️". We can make it an SVG too for consistency.
    old_gear = '<button id="btn-manage-chat" style="display:none; background:none; border:none; cursor:pointer; font-size:1.2rem; padding:0.4rem; border-radius:8px;" onmouseenter="this.style.background=\'#f0f0f0\'" onmouseleave="this.style.background=\'none\'" title="Gérer le groupe">⚙️</button>'
    new_gear = '<button id="btn-manage-chat" style="display:none; background:none; border:none; cursor:pointer; padding:0.4rem; border-radius:8px; display:flex; align-items:center; justify-content:center; color: var(--text-color);" onmouseenter="this.style.background=\'#f0f0f0\'" onmouseleave="this.style.background=\'none\'" title="Gérer le groupe"><svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg></button>'
    html = html.replace(old_gear, new_gear)

    # Let's bump cache while we are here.
    html = re.sub(r'src="js/chat\.js\?v=\d+"', 'src="js/chat.js?v=34"', html)

    with open('portail.html', 'w', encoding='utf-8') as f:
        f.write(html)
        
    print("portail.html updated")

update_portail_icons()
