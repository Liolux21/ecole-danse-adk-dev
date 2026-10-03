import re

def fix_prof_course_ids():
    with open('js/app.js', 'r', encoding='utf-8') as f:
        app_js = f.read()

    pattern = r"\} else if \(role === 'prof'\) \{\s*userCourseIds = \(currentUser\.courseIds \|\| \[\]\)\.map\(String\);\s*\}"
    
    new_code = """} else if (role === 'prof') {
      if (currentUser.realRole === 'admin') {
         userCourseIds = DATA.courses.map(c => String(c.id));
      } else {
         userCourseIds = DATA.courses.filter(c => c.prof && (c.prof.includes(currentUser.name) || (currentUser.firstname && c.prof.includes(currentUser.firstname)))).map(c => String(c.id));
      }
    }"""

    app_js = re.sub(pattern, new_code, app_js)
    with open('js/app.js', 'w', encoding='utf-8') as f:
        f.write(app_js)
    print("Fixed userCourseIds for prof")

fix_prof_course_ids()
