import re

def fix_absence_date():
    with open('js/app.js', 'r', encoding='utf-8') as f:
        app_js = f.read()

    # Find the slot logic
    old_code = "const slot = DATA.schedule.slots.find(s => s.courseId === courseId);"
    new_code = "const slot = DATA.schedule.slots.find(s => String(s.courseId) === String(courseId));"
    
    app_js = app_js.replace(old_code, new_code)
    
    with open('js/app.js', 'w', encoding='utf-8') as f:
        f.write(app_js)
        
    print("Fixed absence dates")

fix_absence_date()
