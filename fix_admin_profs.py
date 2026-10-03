import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

pattern = r"(const nbEleves = allStudentIds\.size;\n\s*\n\s*\n\s*return `\n\s*<div style=\"background: #ffffff; padding: 1\.2rem; border-radius: var\(--radius\); border: 1px solid var\(--border-color\); display: flex; flex-direction: column; gap: 0\.8rem; box-shadow: 0 2px 8px rgba\(0,0,0,0\.03\);\">\n\s*<div style=\"display: flex; justify-content: space-between; align-items: center;\">\n\s*<h4 style=\"margin: 0; color: #9C5858; font-size: 1\.1rem; font-weight: bold;\">\$\{p\.avatar \|\| \'.*?\'\} \$\{p\.firstname \? p\.firstname \+ \' \' \+ p\.lastname : p\.name\}</h4>\n\s*</div>)"

replacement = r'''const nbEleves = allStudentIds.size;
    const vitrineProf = window.VITRINE_DATA && window.VITRINE_DATA.professeurs ? window.VITRINE_DATA.professeurs[p.firstname || p.name] : null;
    let photoUrl = p.avatar || (p.gender === 'Féminin' ? '👩‍🏫' : '👨‍🏫');
    let avatarHtml = (photoUrl.startsWith('http') || photoUrl.startsWith('assets/')) ? `<img src="${photoUrl}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">` : photoUrl;
    if (vitrineProf && vitrineProf.avatar) {
        avatarHtml = `<img src="${vitrineProf.avatar}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`;
    }
    
    return `
      <div style="background: #ffffff; padding: 1.2rem; border-radius: var(--radius); border: 1px solid var(--border-color); display: flex; flex-direction: column; gap: 0.8rem; box-shadow: 0 2px 8px rgba(0,0,0,0.03);">
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; align-items: center; gap: 0.6rem;">
              <div style="width: 36px; height: 36px; border-radius: 50%; background-color: #f5e6e6; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; flex-shrink: 0; overflow: hidden;">${avatarHtml}</div>
              <h4 style="margin: 0; color: #9C5858; font-size: 1.1rem; font-weight: bold;">${p.firstname ? p.firstname + ' ' + p.lastname : p.name}</h4>
            </div>
        </div>'''

js = re.sub(pattern, replacement, js)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
