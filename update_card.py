import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Increase image height
html = html.replace('<div style="height: 85px; width: 100%; overflow: hidden; position: relative; background: #222;">',
                    '<div style="height: 140px; width: 100%; overflow: hidden; position: relative; background: #222;">')

# 2. Increase prof Avatar size from 38px to 56px
html = html.replace('width:38px;height:38px;', 'width:56px;height:56px;')
html = html.replace('width="22" height="22"', 'width="28" height="28"')
# Also adjust min-width of the right column just in case
html = html.replace('min-width: 65px; padding-left: 0.5rem;', 'min-width: 75px; padding-left: 0.5rem;')

# 3. Move lieuBadge to the bottom.
old_body = """                      <div>
                        <div style="display:flex;align-items:center;flex-wrap:wrap;gap:0.35rem;margin-bottom:0.35rem;">
                          ${lieuBadge}
                          ${course.biweekly ? '<span style="font-size:0.65rem;color:#ffffff;background:rgba(0,0,0,0.25);padding:0.1rem 0.5rem;border-radius:50px;font-weight:600;">1 sem/2</span>' : ''}
                        </div>
                        <h3 class="course-name" style="font-size: 0.95rem; margin: 0.2rem 0 0.4rem 0; color: #ffffff; font-family: var(--font-display); font-weight: 700; line-height: 1.25; text-shadow: 0 1px 2px rgba(0,0,0,0.2);">${course.name}</h3>
                      </div>"""

new_body = """                      <div>
                        <h3 class="course-name" style="font-size: 1.1rem; margin: 0 0 0.4rem 0; color: #ffffff; font-family: var(--font-display); font-weight: 700; line-height: 1.25; text-shadow: 0 1px 2px rgba(0,0,0,0.2);">${course.name}</h3>
                      </div>"""

html = html.replace(old_body, new_body)

old_meta = """                        <div style="display: flex; flex-direction: column; gap: 0.35rem; justify-content: center; flex: 1; padding-right: 0.5rem; border-right: 1px solid rgba(255,255,255,0.2);">
                          <span class="course-meta-item" style="color: #ffffff; font-weight: 600; display: flex; align-items: flex-start; line-height: 1.25;"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" style="margin-right:5px;flex-shrink:0;margin-top:1px;"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg><span>${course.schedule}</span></span>
                          <span class="course-meta-item" style="color: #ffffff; font-weight: 600; display: flex; align-items: flex-start; line-height: 1.25;"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" style="margin-right:5px;flex-shrink:0;margin-top:1px;"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg><span>${course.ages}</span></span>
                        </div>"""

new_meta = """                        <div style="display: flex; flex-direction: column; gap: 0.4rem; justify-content: center; flex: 1; padding-right: 0.5rem; border-right: 1px solid rgba(255,255,255,0.2);">
                          <span class="course-meta-item" style="color: #ffffff; font-weight: 600; display: flex; align-items: flex-start; line-height: 1.25;"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" style="margin-right:5px;flex-shrink:0;margin-top:1px;"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg><span>${course.schedule}</span></span>
                          <span class="course-meta-item" style="color: #ffffff; font-weight: 600; display: flex; align-items: flex-start; line-height: 1.25;"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" style="margin-right:5px;flex-shrink:0;margin-top:1px;"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg><span>${course.ages}</span></span>
                          <div style="display:flex;align-items:center;flex-wrap:wrap;gap:0.35rem;margin-top:0.2rem;">
                            ${lieuBadge}
                            ${course.biweekly ? '<span style="font-size:0.65rem;color:#ffffff;background:rgba(0,0,0,0.25);padding:0.1rem 0.5rem;border-radius:50px;font-weight:600;">1 sem/2</span>' : ''}
                          </div>
                        </div>"""

html = html.replace(old_meta, new_meta)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
