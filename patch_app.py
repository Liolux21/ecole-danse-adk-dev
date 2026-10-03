import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add PROF_FULL_NAMES at the top
prof_full_names_code = """
const PROF_FULL_NAMES = {
  'Janis': 'Janis Romain', 'Jeanne': 'Jeanne Lefèvre', 'Loreen': 'Loreen Poncelet',
  'Maeva': 'Maeva Delgoffe', 'Margaux': 'Margaux Hubert', 'Maurine': 'Maurine Baudon',
  'Pauline': 'Pauline Gérard', 'Zoé': 'Zoé Lambert', 'Jade': 'Jade Nélis',
  'Daisy': 'Daisy Theunissen', 'Corentin': 'Corentin Milosevic', 'Charlotte': 'Charlotte Varoquaux',
  'Andrew': 'Andrew Schmitz', 'Clémentine': 'Clémentine Mamdy', 'Lili': 'Lili Maury',
  'Florence': 'Florence', 'Adam': 'Adam'
};
"""
if "const PROF_FULL_NAMES" not in content:
    content = prof_full_names_code + content

# 2. Patch renderAdminProfs
admin_profs_regex = r"(function renderAdminProfs\(\) \{[\s\S]*?tbody\.innerHTML = profs\.map\(p => \{)([\s\S]*?)(const vitrineProf = )"

def admin_profs_repl(m):
    return m.group(1) + """
    const searchName = p.firstname || (p.name ? p.name.split(' ')[0] : '');
    const fullName = PROF_FULL_NAMES[searchName] || (p.firstname ? p.firstname + ' ' + p.lastname : p.name);
    
    // Check if they exist in DATA.students to link
    const studentMatch = DATA.students.find(s => s.firstname === searchName || (s.firstname + ' ' + s.lastname) === fullName || s.name === fullName);
    const studentBadge = studentMatch ? `<br><span class="badge badge-parent" style="font-size:0.6rem; padding:0.1rem 0.3rem;">Élève lié</span>` : '';
    
    const taughtCourses = DATA.courses.filter(c => c.prof && (c.prof.includes(p.name) || c.prof.includes(fullName) || c.prof.includes(searchName)));
    const coursesNames = taughtCourses.map(c => c.name).join(', ');
    const allStudentIds = new Set();
    taughtCourses.forEach(c => {
      DATA.getStudentsByCourse(c.id).forEach(s => allStudentIds.add(s.id));
    });
    const nbEleves = allStudentIds.size;
    """ + m.group(3)

content = re.sub(admin_profs_regex, admin_profs_repl, content)

# 3. Patch the return HTML in renderAdminProfs to show the full name
content = re.sub(
    r'(<div class="contact-item-value" style="font-weight: 600;">)\$\{p\.name\}(</div>)',
    r'\1${fullName}${studentBadge}\2',
    content
)

# 4. Patch renderProfDashboard
prof_dash_regex = r"(function renderProfDashboard\(user\) \{[\s\S]*?document\.getElementById\('prof-name'\)\.textContent = user\.name;)"

def prof_dash_repl(m):
    return m.group(1) + """
    const searchName = user.firstname || (user.name ? user.name.split(' ')[0] : '');
    const fullName = PROF_FULL_NAMES[searchName] || (user.firstname ? user.firstname + ' ' + user.lastname : user.name);
    document.getElementById('prof-name').textContent = fullName;
    
    // Lier automatiquement les cours de l'élève
    const studentMatch = DATA.students.find(s => s.firstname === searchName || (s.firstname + ' ' + s.lastname) === fullName || s.name === fullName);
    if (studentMatch && studentMatch.courseIds) {
      user.courseIds = [...new Set([...(user.courseIds || []), ...studentMatch.courseIds])];
    }
"""

content = re.sub(prof_dash_regex, prof_dash_repl, content)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("js/app.js successfully patched!")
