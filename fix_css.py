import re

def fix_css():
    with open('css/style.css', 'r', encoding='utf-8') as f:
        css = f.read()

    old_css = """.cal-day.has-courses {
  background: #ffffff;
  border-color: rgba(156, 88, 88, 0.2);
  box-shadow: 0 4px 12px rgba(0,0,0,0.03);
}"""

    new_css = """.cal-day.has-courses {
  background: #ffffff;
  border-color: #9C5858;
  box-shadow: 0 4px 12px rgba(156, 88, 88, 0.15);
}
.cal-day.has-courses .cal-day-header {
  background: #9C5858;
  color: #ffffff;
}"""

    css = css.replace(old_css, new_css)
    
    with open('css/style.css', 'w', encoding='utf-8') as f:
        f.write(css)
        
    print("Fixed CSS")

fix_css()
