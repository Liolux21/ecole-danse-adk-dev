import re

def fix_calendar():
    with open('js/app.js', 'r', encoding='utf-8') as f:
        app_js = f.read()

    app_js = app_js.replace(
        "const slots = DATA.schedule.slots.filter(s => s.courseId === id);",
        "const slots = DATA.schedule.slots.filter(s => String(s.courseId) === String(id));"
    )
    
    with open('js/app.js', 'w', encoding='utf-8') as f:
        f.write(app_js)

    with open('css/style.css', 'r', encoding='utf-8') as f:
        css = f.read()
        
    old_css = """.cal-day.has-courses {
  background: #ffffff;
  border-color: #9C5858;
  box-shadow: 0 4px 12px rgba(156, 88, 88, 0.15);
}
.cal-day.has-courses .cal-day-header {
  background: #9C5858;
  color: #ffffff;
}"""

    new_css = """.cal-day.has-courses {
  background: #ffffff;
  border-color: rgba(156, 88, 88, 0.2);
  box-shadow: 0 4px 12px rgba(0,0,0,0.03);
}"""

    css = css.replace(old_css, new_css)
    
    with open('css/style.css', 'w', encoding='utf-8') as f:
        f.write(css)

    # Bump cache
    with open('portail.html', 'r', encoding='utf-8') as f:
        portail = f.read()

    portail = re.sub(r'css/style\.css\?v=\d+', 'css/style.css?v=208', portail)
    portail = re.sub(r'js/app\.js\?v=\d+', 'js/app.js?v=46', portail)
    
    with open('portail.html', 'w', encoding='utf-8') as f:
        f.write(portail)

    print("Fixed calendar")

fix_calendar()
