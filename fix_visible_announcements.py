import re

def fix_visible_announcements():
    with open('js/app.js', 'r', encoding='utf-8') as f:
        app_js = f.read()

    pattern = r"(if \(ann\.target\.startsWith\('course_'\)\) \{[^}]+\})"
    replacement = r"\1\n      if (ann.target.startsWith('prof_course_') && role === 'prof') {\n        const cid = ann.target.replace('prof_course_', '');\n        if (userCourseIds.includes(String(cid))) return true;\n      }"

    app_js = re.sub(pattern, replacement, app_js)

    with open('js/app.js', 'w', encoding='utf-8') as f:
        f.write(app_js)
        
    print("Fixed visible announcements filter")

fix_visible_announcements()
