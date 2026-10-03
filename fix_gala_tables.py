import re

def fix_gala():
    with open('js/app.js', 'r', encoding='utf-8') as f:
        app_js = f.read()

    # We want to replace the whole window.renderGalaTables block
    # We will use string manipulation to find the bounds
    
    start_str = "window.renderGalaTables = function() {"
    end_str = "window.initGalaRepModal = function() {"
    
    start_idx = app_js.find(start_str)
    end_idx = app_js.find(end_str)
    
    if start_idx == -1 or end_idx == -1:
        print("COULD NOT FIND RENDER GALATABLES!")
        return
        
    old_block = app_js[start_idx:end_idx]
    
    new_block = """window.renderGalaTables = function(userCtx) {
  // === ADMIN GALA ===
  const htmlRepAdmin = DATA.galaRepets.length === 0 
    ? '<tr class="empty-state"><td colspan="5">Aucune répétition planifiée.</td></tr>'
    : DATA.galaRepets.map(r => {
        const courseName = r.course === 'all' ? 'Tous les élèves' : (DATA.getCourseById(r.course)?.name || r.course);
        return `<tr>
          <td>${r.date} à ${r.time}</td>
          <td>${courseName}</td>
          <td>${formatLieu(r.lieu)}</td>
          <td>${r.tenue ? 'Oui' : 'Non'}</td>
          <td><button class="btn btn-outline btn-sm" style="color:#e74c3c;border-color:#e74c3c;" onclick="deleteGalaRep('${r.id}')">X</button></td>
        </tr>`;
      }).join('');
  const repBody = document.getElementById('admin-gala-rep-body');
  if (repBody) repBody.innerHTML = htmlRepAdmin;

  const htmlInfoAdmin = DATA.galaInfos.length === 0 
    ? '<tr class="empty-state"><td colspan="5">Aucune info tableau.</td></tr>'
    : DATA.galaInfos.map(i => {
        const courseName = DATA.getCourseById(i.course)?.name || i.course;
        return `<tr>
          <td>${courseName}</td>
          <td>${i.theme}</td>
          <td>${i.music || '-'}</td>
          <td>${i.tenue || '-'}</td>
          <td><button class="btn btn-outline btn-sm" style="color:#e74c3c;border-color:#e74c3c;" onclick="deleteGalaInfo('${i.id}')">X</button></td>
        </tr>`;
      }).join('');
  const infoBody = document.getElementById('admin-gala-info-body');
  if (infoBody) infoBody.innerHTML = htmlInfoAdmin;

  const htmlNoteAdmin = DATA.galaNotes.length === 0 
    ? '<tr class="empty-state"><td colspan="3">Aucune note de réunion.</td></tr>'
    : DATA.galaNotes.map(n => {
        return `<tr>
          <td>${n.date}</td>
          <td>${(n.presents || []).join(', ')}</td>
          <td style="display:flex;gap:0.5rem;">
            <button class="btn btn-outline btn-sm" onclick="viewGalaNote('${n.id}')">👀 Voir</button>
            <button class="btn btn-outline btn-sm" onclick="editGalaNote('${n.id}')">Modifier</button>
            <button class="btn btn-outline btn-sm" style="color:#e74c3c;border-color:#e74c3c;" onclick="deleteGalaNote('${n.id}')">X</button>
          </td>
        </tr>`;
      }).join('');
  const noteBody = document.getElementById('admin-gala-note-body');
  if (noteBody) noteBody.innerHTML = htmlNoteAdmin;

  // Determine user context for Prof / Parent filtering
  const user = userCtx || window.AUTH.currentUser;
  if (!user) return;

  // === PROF GALA ===
  if (user.role === 'prof' || user.role === 'admin') {
    let profCourseIds = [];
    if (user.realRole === 'admin' || user.role === 'admin') {
       profCourseIds = DATA.courses.map(c => String(c.id));
    } else {
       profCourseIds = DATA.courses.filter(c => c.prof && (c.prof.includes(user.name) || (user.firstname && c.prof.includes(user.firstname)))).map(c => String(c.id));
    }

    const profRepets = DATA.galaRepets.filter(r => r.course === 'all' || profCourseIds.includes(String(r.course)));
    const htmlRepProf = profRepets.length === 0 
      ? '<tr class="empty-state"><td colspan="5">Aucune répétition planifiée.</td></tr>'
      : profRepets.map(r => {
          const courseName = r.course === 'all' ? 'Tous les élèves' : (DATA.getCourseById(r.course)?.name || r.course);
          return `<tr>
            <td>${r.date} à ${r.time}</td>
            <td>${courseName}</td>
            <td>${formatLieu(r.lieu)}</td>
            <td>${r.tenue ? 'Oui' : 'Non'}</td>
            <td><button class="btn btn-outline btn-sm" style="color:#e74c3c;border-color:#e74c3c;" onclick="deleteGalaRep('${r.id}')">X</button></td>
          </tr>`;
        }).join('');
    const profRepBody = document.getElementById('prof-gala-rep-body');
    if (profRepBody) profRepBody.innerHTML = htmlRepProf;

    const profInfos = DATA.galaInfos.filter(i => profCourseIds.includes(String(i.course)));
    const htmlInfoProf = profInfos.length === 0 
      ? '<tr class="empty-state"><td colspan="5">Aucune info tableau.</td></tr>'
      : profInfos.map(i => {
          const courseName = DATA.getCourseById(i.course)?.name || i.course;
          return `<tr>
            <td>${courseName}</td>
            <td>${i.theme}</td>
            <td>${i.music || '-'}</td>
            <td>${i.tenue || '-'}</td>
            <td><button class="btn btn-outline btn-sm" style="color:#e74c3c;border-color:#e74c3c;" onclick="deleteGalaInfo('${i.id}')">X</button></td>
          </tr>`;
        }).join('');
    const profInfoBody = document.getElementById('prof-gala-info-body');
    if (profInfoBody) profInfoBody.innerHTML = htmlInfoProf;
    
    // Notes
    const profNoteBody = document.getElementById('prof-gala-note-body');
    if (profNoteBody) profNoteBody.innerHTML = htmlNoteAdmin; // Profs see all notes
  }

  // === PARENT GALA ===
  if (user.role === 'parent' || user.role === 'eleve' || user.role === 'student' || user.role === 'admin') {
    let parentCourseIds = [];
    if (user.realRole === 'admin' || user.role === 'admin') {
       parentCourseIds = DATA.courses.map(c => String(c.id));
    } else {
       const children = DATA.students.filter(s => (user.childrenIds || []).includes(s.id));
       children.forEach(ch => {
         if (ch.courseIds) {
           ch.courseIds.forEach(cid => {
             if (!parentCourseIds.includes(String(cid))) parentCourseIds.push(String(cid));
           });
         }
       });
    }

    const parentRepets = DATA.galaRepets.filter(r => r.course === 'all' || parentCourseIds.includes(String(r.course)));
    
    const parentRepetsContainer = document.getElementById('tab-parent-gala-repets');
    if (parentRepetsContainer) {
       if (parentRepets.length === 0) {
         parentRepetsContainer.innerHTML = '<div class="empty-state"><p>Aucune répétition planifiée.</p></div>';
       } else {
         parentRepetsContainer.innerHTML = parentRepets.map(r => {
           const courseName = r.course === 'all' ? 'Tous les élèves' : (DATA.getCourseById(r.course)?.name || r.course);
           return `
             <div class="stat-card" style="margin-bottom:1rem; border-left:4px solid var(--primary);">
               <h4 style="margin:0 0 0.5rem 0; color:var(--primary); font-size:1.1rem;">${r.date} à ${r.time}</h4>
               <p style="margin:0 0 0.2rem 0;"><strong>Cours concerné :</strong> ${courseName}</p>
               <p style="margin:0 0 0.2rem 0;"><strong>Lieu :</strong> ${formatLieu(r.lieu)}</p>
               <p style="margin:0; color:var(--text-light); font-size:0.9rem;">${r.msg || 'Pas de message supplémentaire.'}</p>
             </div>
           `;
         }).join('');
       }
    }

    const parentTenuesContainer = document.getElementById('tab-parent-gala-tenues');
    if (parentTenuesContainer) {
       // Tenues are from galaInfos and galaTenues
       const parentInfos = DATA.galaInfos.filter(i => parentCourseIds.includes(String(i.course)));
       const parentTenues = DATA.galaTenues.filter(t => parentCourseIds.includes(String(t.course)));
       
       if (parentInfos.length === 0 && parentTenues.length === 0) {
          parentTenuesContainer.innerHTML = '<div class="empty-state"><p>Aucune information de tenue pour le moment.</p></div>';
       } else {
          let html = '';
          parentInfos.forEach(i => {
             const c = DATA.getCourseById(i.course);
             html += `
               <div class="stat-card" style="margin-bottom:1rem; border-left:4px solid var(--gold);">
                 <h4 style="margin:0 0 0.5rem 0; color:var(--primary); font-size:1.1rem;">Tableau : ${i.theme} (${c?.name})</h4>
                 <p style="margin:0 0 0.2rem 0;"><strong>Tenue prévue :</strong> ${i.tenue || 'Non définie'}</p>
                 <p style="margin:0; color:var(--text-light); font-size:0.9rem;">Musique : ${i.music || '-'}</p>
               </div>
             `;
          });
          parentTenues.forEach(t => {
             const c = DATA.getCourseById(t.course);
             html += `
               <div class="stat-card" style="margin-bottom:1rem; border-left:4px solid #3498db;">
                 <h4 style="margin:0 0 0.5rem 0; color:var(--primary); font-size:1.1rem;">Tenue demandée (${c?.name})</h4>
                 <p style="margin:0; white-space:pre-wrap;">${t.desc}</p>
               </div>
             `;
          });
          parentTenuesContainer.innerHTML = html;
       }
    }
  }
};

"""
    
    app_js = app_js.replace(old_block, new_block)
    
    # Update calls
    app_js = app_js.replace("if (typeof window.renderGalaTables === 'function') window.renderGalaTables();", "if (typeof window.renderGalaTables === 'function') window.renderGalaTables(user);")
    app_js = app_js.replace("if (typeof renderGalaTables === 'function') renderGalaTables();", "if (typeof renderGalaTables === 'function') renderGalaTables(user);")
    
    with open('js/app.js', 'w', encoding='utf-8') as f:
        f.write(app_js)

    print("Fixed renderGalaTables")

fix_gala()
