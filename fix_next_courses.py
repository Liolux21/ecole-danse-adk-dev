import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

pattern = r'function calculateNextCourses\(children\) \{\n\s*const daysMap = \{ \'Lundi\': 1, \'Mardi\': 2, \'Mercredi\': 3, \'Jeudi\': 4, \'Vendredi\': 5, \'Samedi\': 6, \'Dimanche\': 0 \};\n\s*const now = new Date\(\);\n\s*const currentDay = now\.getDay\(\);'

replacement = r'''function isDateValid(date, course) {
    if (course && course.isPriority) return true;
    if (DATA.settings && DATA.settings.season) {
        if (DATA.settings.season.start) {
            const s = new Date(DATA.settings.season.start);
            s.setHours(0,0,0,0);
            if (date < s) return false;
        }
        if (DATA.settings.season.end) {
            const e = new Date(DATA.settings.season.end);
            e.setHours(23,59,59,999);
            if (date > e) return false;
        }
    }
    if (DATA.settings && DATA.settings.holidays) {
        for (let h of DATA.settings.holidays) {
            const hs = new Date(h.start);
            hs.setHours(0,0,0,0);
            const he = new Date(h.end);
            he.setHours(23,59,59,999);
            if (date >= hs && date <= he) return false;
        }
    }
    return true;
}

function calculateNextCourses(children) {
    const daysMap = { 'Lundi': 1, 'Mardi': 2, 'Mercredi': 3, 'Jeudi': 4, 'Vendredi': 5, 'Samedi': 6, 'Dimanche': 0 };
    const now = new Date();
    const currentDay = now.getDay();'''

js = re.sub(pattern, replacement, js)


pattern_calc = r'let diffDays = cDay - currentDay;\n\s*if \(diffDays < 0 \|\| \(diffDays === 0 && \(hour \* 60 \+ minute\) <= currentHour\)\) diffDays \+= 7;\n\s*let nextDate = new Date\(now\);\n\s*nextDate\.setDate\(now\.getDate\(\) \+ diffDays\);'

replacement_calc = r'''let diffDays = cDay - currentDay;
          if (diffDays < 0 || (diffDays === 0 && (hour * 60 + minute) <= currentHour)) diffDays += 7;
          let nextDate = new Date(now);
          nextDate.setDate(now.getDate() + diffDays);
          
          if (!c.isPriority) {
              let safeguard = 0;
              while (!isDateValid(nextDate, c) && safeguard < 52) {
                  nextDate.setDate(nextDate.getDate() + 7);
                  safeguard++;
              }
              if (safeguard >= 52) return; // Saison terminée
          }'''

js = re.sub(pattern_calc, replacement_calc, js)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
