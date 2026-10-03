import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Add to renderAdminDashboard
js = js.replace("renderAdminProfs();\n  if", "renderAdminProfs();\n  renderAdminHours();\n  if")

# Add renderAdminHours and exportProfHours functions
hours_js = """
window.renderAdminHours = function() {
  const tbody = document.getElementById('admin-hours-body');
  if (!tbody) return;
  
  const monthInput = document.getElementById('admin-hours-month');
  if (!monthInput.value) {
    // Default to current month
    const now = new Date();
    monthInput.value = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    
    // Add event listener only once
    monthInput.addEventListener('change', window.renderAdminHours);
  }
  
  const [targetYear, targetMonth] = monthInput.value.split('-');
  
  // Filter DATA.prof_hours for the selected month/year
  // date format is DD/MM/YYYY
  const monthRecords = (DATA.prof_hours || []).filter(r => {
    if (!r.date) return false;
    const parts = r.date.split('/');
    if (parts.length === 3) {
      return parts[1] === targetMonth && parts[2] === targetYear;
    }
    return false;
  });
  
  // Group by Prof
  const profTotals = {};
  monthRecords.forEach(r => {
    if (!profTotals[r.profId]) profTotals[r.profId] = { total: 0, records: [] };
    profTotals[r.profId].total += r.hours || 0;
    profTotals[r.profId].records.push(r);
  });
  
  const profs = DATA.users.filter(u => u.role === 'prof');
  
  if (profs.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;">Aucun professeur trouvé</td></tr>';
    return;
  }
  
  let html = '';
  profs.forEach(p => {
    const pData = profTotals[p.id] || { total: 0, records: [] };
    const profName = p.firstname ? `${p.firstname} ${p.lastname}` : p.name;
    
    // Store records in global for modal access
    window[`prof_records_${p.id}`] = pData.records;
    
    html += `
      <tr>
        <td><strong>${profName}</strong></td>
        <td>${targetMonth}/${targetYear}</td>
        <td><strong style="color: var(--primary);">${pData.total} h</strong></td>
        <td>
          <button class="btn btn-outline btn-sm" onclick="openProfHoursDetail('${p.id}', '${profName}', '${targetMonth}/${targetYear}')">Voir détails</button>
        </td>
      </tr>
    `;
  });
  
  tbody.innerHTML = html;
};

window.openProfHoursDetail = function(profId, profName, monthStr) {
  const records = window[`prof_records_${profId}`] || [];
  const list = document.getElementById('hours-detail-list');
  document.getElementById('hours-detail-title').textContent = `Détails - ${profName} (${monthStr})`;
  
  if (records.length === 0) {
    list.innerHTML = '<p>Aucune prestation validée pour ce mois.</p>';
  } else {
    // Sort by date
    records.sort((a, b) => {
      const aDate = a.date.split('/').reverse().join('-');
      const bDate = b.date.split('/').reverse().join('-');
      return aDate.localeCompare(bDate);
    });
    
    let html = '<table class="data-table" style="font-size: 0.9rem;"><thead><tr><th>Date</th><th>Cours</th><th>Heures</th></tr></thead><tbody>';
    records.forEach(r => {
      const c = DATA.getCourseById(r.courseId);
      const cName = c ? c.name : 'Cours inconnu';
      html += `<tr><td>${r.date}</td><td>${cName}</td><td><strong>${r.hours}</strong></td></tr>`;
    });
    html += '</tbody></table>';
    list.innerHTML = html;
  }
  
  openModal('modal-hours-detail');
};

window.exportProfHours = function() {
  const monthInput = document.getElementById('admin-hours-month');
  if (!monthInput || !monthInput.value) return;
  const [targetYear, targetMonth] = monthInput.value.split('-');
  
  const monthRecords = (DATA.prof_hours || []).filter(r => {
    if (!r.date) return false;
    const parts = r.date.split('/');
    if (parts.length === 3) return parts[1] === targetMonth && parts[2] === targetYear;
    return false;
  });
  
  if (monthRecords.length === 0) {
    alert("Aucune donnée à exporter pour ce mois.");
    return;
  }
  
  let csv = "Professeur,Email,Date,Cours,Heures\\n";
  monthRecords.forEach(r => {
    const prof = DATA.users.find(u => u.id === r.profId);
    const profName = prof ? (prof.firstname ? `${prof.firstname} ${prof.lastname}` : prof.name) : r.profId;
    const profEmail = prof ? prof.email : '';
    const course = DATA.getCourseById(r.courseId);
    const courseName = course ? course.name.replace(/,/g, '') : 'Cours inconnu'; // avoid comma break
    csv += `"${profName}","${profEmail}","${r.date}","${courseName}",${r.hours}\\n`;
  });
  
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", `heures_profs_${targetYear}_${targetMonth}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
"""

js = js.replace("function renderAdminInscriptions()", hours_js + "\nfunction renderAdminInscriptions()")

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
