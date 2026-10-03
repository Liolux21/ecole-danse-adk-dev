import json
import re

students = json.load(open('students_import.json', encoding='utf-8'))

course_keywords = {
    'HH 1': 23, 'HIPHOP 1': 23, 'HIP HOP 1': 23,
    'HH 2': 24, 'HIPHOP 2': 24,
    'HH 3': 25, 'HIPHOP 3': 25,
    'HH 4': 38, 'HIPHOP 4': 38,
    'HH 5': 59, 'HIPHOP 5': 59,
    'HH 6': 60, 'HIPHOP 6': 60,
    'HH 7': 61, 'HIPHOP 7': 61,
    'ADULTES HH': 26, 'ADULTES HIPHOP': 26, 'ADULTES HIP HOP': 26, 'ADULTES HIP-HOP': 26,
    
    'JAZZ 1': 47, 'JAZZ-CONTEMPORAIN 1': 47,
    'JAZZ 2': 44, 'JAZZ-CONTEMPORAIN 2': 44,
    'JAZZ 3': 56, 'JAZZ-CONTEMPORAIN 3': 56,
    'JAZZ 4': 39, 'JAZZ-CONTEMPORAIN 4': 39,
    'JAZZ 5': 40, 'JAZZ-CONTEMPORAIN 5': 40,
    
    'ADULTES JAZZ': 57, 'ADULTE JAZZ': 57,
    'STREET JAZZ': 46, 'STREETJAZZ': 46,
    
    'CONTEMPO PRO': 54, 'CONTEMPORAIN PRO': 54,
    'CONTEMPO': 51, 'CONTEMPORAIN': 51, # Assume JAZZ-CONTEMPORAIN or wait...
    
    'CL 1': 42, 'CLASSIQUE 1': 42,
    'CL 2': 43, 'CLASSIQUE 2': 43,
    'CL 3': 55, 'CLASSIQUE 3': 55,
    'POINTES': 41, 'BALLET': 41,
    
    'RAGGA 1': 52,
    'RAGGA 2': 50,
    'RAGGA 3': 45,
    'RAGGA': 52, # Default
    
    'EVEIL': 49,
    'INITIATION': 48,
    
    'GIRLY PRO': 53,
    'GIRLY': 62, # Maybe ADK SHOW Girly? Let's check IDs in DATA.courses
    
    'POMDANCE': 63, # Fake ID for now, let's just do a naive regex search.
    'BREAKDANCE': 58, 'BREAK': 58,
    
    'BERTRIX 9 ANS': 28, 'BERTRIX 13 ANS': 29, 'BERTRIX ADOS': 30, 'BERTRIX': 28, # need real ids
    'ROX CONTEMPO': 31, 'ROX GIRLY': 32, 'ROX HH': 33, 'ROX RAGGA': 34,
    
    'CIE TEAM': 64, 'CIE UNITY': 65, 'CIE MOOVE': 66
}

# Wait, let's extract all real courses from data.js
data_js = open('js/data.js', encoding='utf-8').read()
matches = re.finditer(r"id:\s*([0-9a-zA-Z_]+).*?name:\s*['\"]([^'\"]+)['\"]", data_js)
real_courses = []
for m in matches:
    cid = m.group(1)
    if cid.isdigit(): cid = int(cid)
    real_courses.append({
        'id': cid,
        'name': m.group(2).upper()
    })

print("Found real courses:", len(real_courses))
