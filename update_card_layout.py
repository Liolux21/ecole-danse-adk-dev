import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Update profAvatarHtml definition
old_avatar_block = """                let profAvatarHtml = '';
                const profName = course.prof ? course.prof.split(' · ')[0].trim() : '';
                if (profName && typeof VITRINE_DATA !== 'undefined' && VITRINE_DATA.professeurs && VITRINE_DATA.professeurs[profName] && VITRINE_DATA.professeurs[profName].avatar) {
                  profAvatarHtml = `<img src="${VITRINE_DATA.professeurs[profName].avatar}" alt="${profName}" style="width:18px;height:18px;border-radius:50%;object-fit:cover;display:inline-block;vertical-align:middle;margin-right:4px;border:1px solid #ffffff;">`;
                } else {
                  profAvatarHtml = `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2" style="margin-right:4px;vertical-align:middle;"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;
                }"""

new_avatar_block = """                let profAvatarHtml = '';
                const profName = course.prof ? course.prof.split(' · ')[0].trim() : '';
                if (profName && typeof VITRINE_DATA !== 'undefined' && VITRINE_DATA.professeurs && VITRINE_DATA.professeurs[profName] && VITRINE_DATA.professeurs[profName].avatar) {
                  profAvatarHtml = `<img src="${VITRINE_DATA.professeurs[profName].avatar}" alt="${profName}" style="width:38px;height:38px;border-radius:50%;object-fit:cover;display:block;margin:0 auto 4px auto;border:2px solid #ffffff;box-shadow:0 2px 5px rgba(0,0,0,0.2);">`;
                } else {
                  profAvatarHtml = `<div style="width:38px;height:38px;border-radius:50%;background:rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;margin:0 auto 4px auto;border:2px solid #ffffff;box-shadow:0 2px 5px rgba(0,0,0,0.2);"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#fff" stroke-width="2.2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>`;
                }"""

html = html.replace(old_avatar_block, new_avatar_block)

# 2. Update course-meta layout
old_meta = """                      <div class="course-meta" style="margin-top: 0.4rem; font-size: 0.78rem; display: flex; flex-direction: column; gap: 0.28rem; border-top: 1px solid rgba(255,255,255,0.3); padding-top: 0.4rem;">
                        <span class="course-meta-item" style="color: #ffffff; font-weight: 600; display: flex; align-items: center;"><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2" style="margin-right:5px;flex-shrink:0;"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg><span>${course.schedule}</span></span>
                        <span class="course-meta-item" style="color: #ffffff; font-weight: 600; display: flex; align-items: center;"><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2" style="margin-right:5px;flex-shrink:0;"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg><span>${course.ages}</span></span>
                        <span class="course-meta-item" style="color: #ffffff; font-weight: 600; display: flex; align-items: center;">${profAvatarHtml}<span>${course.prof}</span></span>
                      </div>"""

new_meta = """                      <div class="course-meta" style="margin-top: 0.4rem; font-size: 0.78rem; display: flex; border-top: 1px solid rgba(255,255,255,0.3); padding-top: 0.5rem; justify-content: space-between;">
                        <div style="display: flex; flex-direction: column; gap: 0.35rem; justify-content: center; flex: 1; padding-right: 0.5rem; border-right: 1px solid rgba(255,255,255,0.2);">
                          <span class="course-meta-item" style="color: #ffffff; font-weight: 600; display: flex; align-items: flex-start; line-height: 1.25;"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" style="margin-right:5px;flex-shrink:0;margin-top:1px;"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg><span>${course.schedule}</span></span>
                          <span class="course-meta-item" style="color: #ffffff; font-weight: 600; display: flex; align-items: flex-start; line-height: 1.25;"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" style="margin-right:5px;flex-shrink:0;margin-top:1px;"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg><span>${course.ages}</span></span>
                        </div>
                        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-width: 65px; padding-left: 0.5rem;">
                          ${profAvatarHtml}
                          <span style="color: #ffffff; font-weight: 700; font-size: 0.7rem; text-align: center; line-height: 1.1;">${course.prof}</span>
                        </div>
                      </div>"""

html = html.replace(old_meta, new_meta)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
