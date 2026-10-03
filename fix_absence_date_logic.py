import re

def fix_absence_date_logic():
    with open('js/app.js', 'r', encoding='utf-8') as f:
        app_js = f.read()

    old_code = """function populateAbsenceDates(courseId) {
  const select = document.getElementById('absence-date');
  if (!select) return;
  select.innerHTML = '';
  
  const slot = DATA.schedule.slots.find(s => String(s.courseId) === String(courseId));
  const courseDay = slot ? slot.day : 0;
  const targetJsDay = (courseDay + 1) % 7;
  
  const today = new Date();
  let d = new Date(today);
  while (d.getDay() !== targetJsDay) {
    d.setDate(d.getDate() + 1);
  }
  
  const dates = [];
    let safeguard = 0;
    const c = DATA.getCourseWithOverride(courseId);"""

    new_code = """function populateAbsenceDates(courseId) {
  const select = document.getElementById('absence-date');
  if (!select) return;
  select.innerHTML = '';
  
  const c = DATA.getCourseWithOverride(courseId);
  const daysMap = { 'Lundi': 1, 'Mardi': 2, 'Mercredi': 3, 'Jeudi': 4, 'Vendredi': 5, 'Samedi': 6, 'Dimanche': 0, 'lundi': 1, 'mardi': 2, 'mercredi': 3, 'jeudi': 4, 'vendredi': 5, 'samedi': 6, 'dimanche': 0 };
  
  let targetJsDay = 1; // Default to Monday
  
  if (c && c.schedule) {
    const dayStr = c.schedule.split(' ')[0];
    if (daysMap.hasOwnProperty(dayStr)) {
        targetJsDay = daysMap[dayStr];
    }
  } else {
    const slot = DATA.schedule.slots.find(s => String(s.courseId) === String(courseId));
    if (slot) {
        targetJsDay = (slot.day + 1) % 7;
    }
  }
  
  const today = new Date();
  let d = new Date(today);
  while (d.getDay() !== targetJsDay) {
    d.setDate(d.getDate() + 1);
  }
  
  const dates = [];
    let safeguard = 0;"""

    if old_code in app_js:
        app_js = app_js.replace(old_code, new_code)
    else:
        print("COULD NOT FIND EXACT MATCH!")
    
    with open('js/app.js', 'w', encoding='utf-8') as f:
        f.write(app_js)
        
    print("Fixed absence date logic")

fix_absence_date_logic()
