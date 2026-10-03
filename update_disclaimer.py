import re

# 1. Update portail.html (disclaimer)
with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

old_header = """<!-- Chat Header -->
      <div style="padding: 1rem; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between;">
        <h3 id="active-chat-title" style="margin:0; font-size: 1.1rem;">Sélectionnez une discussion</h3>
      </div>"""

new_header = """<!-- Chat Header -->
      <div style="padding: 1rem; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between;">
        <div>
          <h3 id="active-chat-title" style="margin:0; font-size: 1.1rem; color: var(--gold);">Sélectionnez une discussion</h3>
          <span style="font-size: 0.7rem; color: var(--text-muted); display: inline-block; margin-top: 4px;">⚠️ Toutes les discussions sont visibles par l'administration.</span>
        </div>
      </div>"""

html = html.replace(old_header, new_header)

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(html)

# 2. Update chat.js (parent logic)
with open('js/chat.js', 'r', encoding='utf-8') as f:
    js = f.read()

old_parent_logic = """                } else {
                    // Parent can message admin
                    options += `<option value="admin">Administration ADK</option>`;
                }"""

new_parent_logic = """                } else {
                    // Parent can message admin
                    options += `<option value="admin">Administration ADK</option>`;
                    
                    // Parent can message profs of their courses
                    if (window.DATA && window.DATA.courses) {
                        const myCourseIds = user.courseIds || [];
                        const myCourses = window.DATA.courses.filter(c => myCourseIds.includes(c.id));
                        
                        // Extract unique prof names from those courses
                        const profNames = [...new Set(myCourses.map(c => c.prof))];
                        
                        if (profNames.length > 0) {
                            options += `<optgroup label="Professeurs de mes enfants">`;
                            profNames.forEach(prof => {
                                options += `<option value="prof_${prof}">Professeur : ${prof}</option>`;
                            });
                            options += `</optgroup>`;
                        }
                    }
                }"""

js = js.replace(old_parent_logic, new_parent_logic)

with open('js/chat.js', 'w', encoding='utf-8') as f:
    f.write(js)
