import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

pattern = r'const dates = \[\];\n\s*for \(let i = 0; i < 4; i\+\+\) \{\n\s*const futureDate = new Date\(d\);\n\s*futureDate\.setDate\(d\.getDate\(\) \+ \(i \* 7\)\);\n\s*dates\.push\(futureDate\);\n\s*\}'

replacement = r'''const dates = [];
    let safeguard = 0;
    const c = DATA.getCourseWithOverride(courseId);
    while (dates.length < 4 && safeguard < 52) {
      const futureDate = new Date(d);
      if (isDateValid(futureDate, c || {})) {
        dates.push(futureDate);
      }
      d.setDate(d.getDate() + 7);
      safeguard++;
    }'''

js = re.sub(pattern, replacement, js)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
