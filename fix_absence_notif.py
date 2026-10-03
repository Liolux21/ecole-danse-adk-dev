import re

def fix_absence_notification():
    with open('js/app.js', 'r', encoding='utf-8') as f:
        app_js = f.read()

    # 1. Update visibleAnnouncements filter
    old_filter = """    const visibleAnnouncements = (DATA.announcements || []).filter(ann => {
      if (ann.target === 'all') return true;
      if (ann.target === 'parents' && role === 'parent') return true;
      if (ann.target === 'profs' && role === 'prof') return true;
      if (ann.target.startsWith('course_')) {
        const cid = ann.target.replace('course_', '');
        if (userCourseIds.includes(String(cid))) return true;
      }
      return false;
    });"""

    new_filter = """    const visibleAnnouncements = (DATA.announcements || []).filter(ann => {
      if (ann.target === 'all') return true;
      if (ann.target === 'parents' && role === 'parent') return true;
      if (ann.target === 'profs' && role === 'prof') return true;
      if (ann.target.startsWith('course_')) {
        const cid = ann.target.replace('course_', '');
        if (userCourseIds.includes(String(cid))) return true;
      }
      if (ann.target.startsWith('prof_course_') && role === 'prof') {
        const cid = ann.target.replace('prof_course_', '');
        if (userCourseIds.includes(String(cid))) return true;
      }
      return false;
    });"""

    if old_filter in app_js:
        app_js = app_js.replace(old_filter, new_filter)
    else:
        print("COULD NOT FIND VISIBLE ANNOUNCEMENTS FILTER!")

    # 2. Update absence-form submit
    # Because of encoding issues with "enregistrée", let's use regex
    
    match_str = r"(if \(dateStr\) \{\s*DATA\.markAttendance\(sid, cid, dateStr, status\);\s*if \(status !== 'absent' \|\| document\.getElementById\('absence-status'\)\.value !== 'excuse'\) \{\s*alert\('[^']+'\);\s*\})"
    
    replacement = r"""\1
      (async () => {
         try {
           const firebase = await import('./firebase-config.js');
           const course = DATA.getCourseWithOverride(cid);
           const child = DATA.getStudentById(sid);
           if (course && child) {
             const statLabel = status === 'present' ? 'Présent(e)' : (status === 'excuse' ? 'Excusé(e)' : 'Absent(e)');
             const title = status === 'present' ? `Signalement de présence : ${child.firstname}` : `Signalement d'absence : ${child.firstname}`;
             const annData = {
               title: title,
               content: `${child.firstname} a été signalé(e) ${statLabel.toLowerCase()} pour le cours "${course.name}" du ${dateStr}.`,
               target: "prof_course_" + cid,
               timestamp: Date.now(),
               authorId: window.AUTH.currentUser.id
             };
             DATA.announcements.push({...annData, id: 'temp_' + Date.now()});
             await firebase.addDoc(firebase.collection(firebase.db, "announcements"), annData);
           }
         } catch(e) {
           console.error("Error sending absence notif:", e);
         }
      })();
"""
    app_js = re.sub(match_str, replacement, app_js)
    
    with open('js/app.js', 'w', encoding='utf-8') as f:
        f.write(app_js)
        
    print("Fixed notifications")

fix_absence_notification()
