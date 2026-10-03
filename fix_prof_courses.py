import re

def fix_prof_course_ids():
    with open('js/app.js', 'r', encoding='utf-8') as f:
        app_js = f.read()

    old_code = """    } else if (role === 'prof') {
      userCourseIds = (currentUser.courseIds || []).map(String);
    }"""
    
    new_code = """    } else if (role === 'prof') {
      if (currentUser.realRole === 'admin') {
         userCourseIds = DATA.courses.map(c => String(c.id));
      } else {
         userCourseIds = DATA.courses.filter(c => c.prof && (c.prof.includes(currentUser.name) || (currentUser.firstname && c.prof.includes(currentUser.firstname)))).map(c => String(c.id));
      }
    }"""

    if old_code in app_js:
        app_js = app_js.replace(old_code, new_code)
        with open('js/app.js', 'w', encoding='utf-8') as f:
            f.write(app_js)
        print("Fixed userCourseIds for prof")
    else:
        print("COULD NOT FIND BLOCK")

fix_prof_course_ids()
