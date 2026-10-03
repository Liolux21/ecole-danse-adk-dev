import json

students_data = json.load(open('students_import.json', encoding='utf-8'))
mapping = json.load(open('mapping.json', encoding='utf-8'))

def parse_courses(raw):
    return mapping.get(raw.strip(), [])

def parse_dob(dob_str):
    """Convert DD-MM-YY or DD/MM/YYYY to YYYY-MM-DD"""
    if not dob_str:
        return ''
    dob_str = dob_str.strip()
    for sep in ['-', '/']:
        parts = dob_str.split(sep)
        if len(parts) == 3:
            d, m, y = parts
            if len(y) == 2:
                y = ('20' if int(y) < 30 else '19') + y
            elif len(y) == 4:
                pass
            else:
                continue
            try:
                return f"{y}-{m.zfill(2)}-{d.zfill(2)}"
            except:
                return ''
    return ''

# Group by parentEmail to create parent accounts & link children
parents = {}
all_students = []

for s in students_data:
    email = (s.get('parentEmail') or '').strip().lower()
    firstname = (s.get('studentFirstName') or '').strip()
    lastname = (s.get('studentLastName') or '').strip()
    dob_raw = (s.get('dob') or '').strip()
    dob = parse_dob(dob_raw)
    courses_raw = s.get('coursesRaw', '')
    course_ids = parse_courses(courses_raw)
    
    if not firstname or not lastname:
        continue
    
    # Build a student ID from firstname.lastname
    sid = f"{firstname.lower().replace(' ', '')}.{lastname.lower().replace(' ', '')}"
    
    student_record = {
        'id': sid,
        'firstname': firstname,
        'lastname': lastname,
        'dob': dob,
        'contactEmail': email,
        'parentId': email,
        'courseIds': course_ids,
        'coursesRaw': courses_raw,
        'cotisation': 'en attente',
        'mutuelle': 'attente',
        'absences': [],
        'avatar': f"https://i.pravatar.cc/150?u={sid}"
    }
    all_students.append(student_record)
    
    if email:
        if email not in parents:
            parents[email] = {'email': email, 'childIds': []}
        parents[email]['childIds'].append(sid)

print(f"Total students to import: {len(all_students)}")
print(f"Total unique parent emails: {len(parents)}")

# Save the students as a JSON to embed in JS
with open('students_to_import.json', 'w', encoding='utf-8') as f:
    json.dump(all_students, f, ensure_ascii=False, indent=2)
    
print("Done! students_to_import.json written.")
