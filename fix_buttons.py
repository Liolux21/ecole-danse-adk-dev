import re

def fix_buttons():
    with open('js/app.js', 'r', encoding='utf-8') as f:
        app_js = f.read()

    # Find the old isTeacher logic
    old_code = """    const isTeacher = user && (user.role === 'admin' || user.realRole === 'admin' || (user.role === 'prof' && c.prof && (c.prof.includes(user.name) || c.prof.includes(user.firstname))));
    if (isTeacher) {
      actionButtons += `<button class="btn btn-outline btn-sm btn-manage" data-course-id="${c.id}">⚙️ Modifier cours</button>`;
    }
    if (user && (user.role === 'parent' || user.role === 'eleve' || user.role === 'student') && studentId) {
      actionButtons += `<button class="btn btn-outline btn-sm btn-absent" data-course-id="${c.id}" data-student-id="${studentId}">📅 Présence</button>`;
    }"""
    
    new_code = """    const isTeacher = user && !studentId && (user.role === 'admin' || user.realRole === 'admin' || (user.role === 'prof' && c.prof && (c.prof.includes(user.name) || c.prof.includes(user.firstname))));
    if (isTeacher) {
      actionButtons += `<button class="btn btn-outline btn-sm btn-manage" data-course-id="${c.id}">⚙️ Modifier cours</button>`;
    }
    if (studentId) {
      actionButtons += `<button class="btn btn-outline btn-sm btn-absent" data-course-id="${c.id}" data-student-id="${studentId}">📅 Présence</button>`;
    }"""
    
    if old_code in app_js:
        app_js = app_js.replace(old_code, new_code)
    else:
        print("Could not find the exact code block, trying regex")
        
    with open('js/app.js', 'w', encoding='utf-8') as f:
        f.write(app_js)
        
    print("Fixed buttons")

fix_buttons()
