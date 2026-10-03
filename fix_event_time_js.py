import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

pattern_open = r'''      \} else \{\n\s*document\.getElementById\('admin-course-day'\)\.value = 'Lundi';\n\s*document\.getElementById\('admin-course-time'\)\.value = '';\n\s*if\(course\.schedule\) \{\n\s*let sp = course\.schedule\.split\(' - '\);\n\s*if\(sp\.length >= 1\) \{\n\s*let d1 = sp\[0\]\.split\('/'\);\n\s*if\(d1\.length === 3\) document\.getElementById\('admin-course-start-date'\)\.value = `\$\{d1\[2\]\}-\$\{d1\[1\]\}-\$\{d1\[0\]\}`;\n\s*\}\n\s*if\(sp\.length >= 2\) \{\n\s*let d2 = sp\[1\]\.split\('/'\);\n\s*if\(d2\.length === 3\) document\.getElementById\('admin-course-end-date'\)\.value = `\$\{d2\[2\]\}-\$\{d2\[1\]\}-\$\{d2\[0\]\}`;\n\s*\}\n\s*\}\n\s*\}'''

replacement_open = r'''      } else {
        document.getElementById('admin-course-day').value = 'Lundi';
        document.getElementById('admin-course-time').value = '';
        document.getElementById('admin-course-start-date').value = '';
        document.getElementById('admin-course-end-date').value = '';
        document.getElementById('admin-course-event-start-time').value = '';
        document.getElementById('admin-course-event-end-time').value = '';
        
        if(course.schedule) {
           let sp = course.schedule.split(' - ');
           if(sp.length >= 1) {
             let p1 = sp[0].trim().split(' ');
             let d1 = p1[0].split('/');
             if(d1.length === 3) document.getElementById('admin-course-start-date').value = `${d1[2]}-${d1[1]}-${d1[0]}`;
             if(p1.length > 1 && p1[1].includes('h')) {
               document.getElementById('admin-course-event-start-time').value = p1[1].replace('h', ':');
             }
           }
           if(sp.length >= 2) {
             let p2 = sp[1].trim().split(' ');
             p2.forEach(pt => {
               if(pt.includes('/')) {
                 let d2 = pt.split('/');
                 if(d2.length === 3) document.getElementById('admin-course-end-date').value = `${d2[2]}-${d2[1]}-${d2[0]}`;
               }
               if(pt.includes('h')) {
                 document.getElementById('admin-course-event-end-time').value = pt.replace('h', ':');
               }
             });
           }
        }
      }'''

pattern_submit = r'''    \} else \{\n\s*let sd = document\.getElementById\('admin-course-start-date'\)\.value;\n\s*let ed = document\.getElementById\('admin-course-end-date'\)\.value;\n\s*if\(sd\) \{\n\s*let dp = sd\.split\('-'\);\n\s*scheduleStr = `\$\{dp\[2\]\}/\$\{dp\[1\]\}/\$\{dp\[0\]\}`;\n\s*\}\n\s*if\(ed\) \{\n\s*let dp2 = ed\.split\('-'\);\n\s*scheduleStr \+= ` - \$\{dp2\[2\]\}/\$\{dp2\[1\]\}/\$\{dp2\[0\]\}`;\n\s*\}\n\s*\}'''

replacement_submit = r'''    } else {
        let sd = document.getElementById('admin-course-start-date').value;
        let ed = document.getElementById('admin-course-end-date').value;
        let st = document.getElementById('admin-course-event-start-time').value;
        let et = document.getElementById('admin-course-event-end-time').value;
        
        let startPart = '';
        if(sd) {
           let dp = sd.split('-');
           startPart = `${dp[2]}/${dp[1]}/${dp[0]}`;
        }
        if(st) {
           startPart += (startPart ? ' ' : '') + st.replace(':', 'h');
        }
        scheduleStr = startPart;
        
        let endPart = '';
        if(ed) {
           let dp2 = ed.split('-');
           endPart = `${dp2[2]}/${dp2[1]}/${dp2[0]}`;
        }
        if(et) {
           endPart += (endPart ? ' ' : '') + et.replace(':', 'h');
        }
        
        if(endPart) {
           scheduleStr += (scheduleStr ? ' - ' : '') + endPart;
        }
    }'''

js = re.sub(pattern_open, replacement_open, js)
js = re.sub(pattern_submit, replacement_submit, js)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
