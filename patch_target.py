with open('functions/index.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Remove onStudentUpdated
start_idx = content.find('exports.onStudentUpdated')
if start_idx != -1:
    content = content[:start_idx]

# 2. Add prof_course_ target in onAnnouncementCreated
old_target = '} else if (target.startsWith("course_")) {'
new_target = """} else if (target.startsWith("prof_course_")) {
        const courseId = target.replace("prof_course_", "");
        
        // 1. Trouver les profs de ce cours
        const profsSnap = await db.collection("users").where("role", "==", "prof").get();
        profsSnap.forEach(doc => {
          const u = doc.data();
          if (u.courseIds && (u.courseIds.includes(courseId) || u.courseIds.includes(Number(courseId)))) {
            if (u.fcmTokens) tokens.push(...u.fcmTokens);
          }
        });
      } else if (target.startsWith("course_")) {"""

content = content.replace(old_target, new_target)

with open('functions/index.js', 'w', encoding='utf-8') as f:
    f.write(content)
print('Done!')
