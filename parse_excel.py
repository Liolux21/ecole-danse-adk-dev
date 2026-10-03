import pandas as pd
import json
import math
import datetime

xl = pd.ExcelFile('Inscriptions 2026-2027 sans paiement.xlsx')

sheet_to_course = {
    '3-4 ans mercredi': [12],
    '5-6 ans mercredi': [11],
    'HH1': [22],
    'HH2': [20],
    'HH3': [23],
    'HH4': [1],
    'HH5': [27],
    'HH6 ': [24],
    'CL 1 et 2': [5, 6], 
    'CL 3': [4],
    'JAZZ 3': [21],
    'JAZZ 4': [2],
    'JAZZ 5': [3],
    'Contempo': [30],
    'STREET JAZZ': [9],
    'R 1': [17],
    'R 2': [13],
    'R 3': [8],
    'R 4': [16],
    'GIRLY': [14],
    'Girly dimanche': [29],
    'POMDANCE': [15],
    'BREAK  ': [18],
    'ROX Contempo': [38],
    'ROX Hiphop': [36],
    'ROX Girly': [39],
    'ROX Ragga ': [37],
    'BERTRIX HH 9 - 12 ans': [34],
    'BERTRIX HH +13 ans': [35],
    'ADULTES Jazz ': [33],
    'ADULTES HH': [32],
    'POLE DANCE': [31]
}

students_map = {} # email+name -> student_dict

def add_student(first, last, email, dob_str, course_ids):
    if pd.isna(first) or pd.isna(last) or first == 'PRENOM' or last == 'NOM' or first == ' ' or last == ' ':
        return
    first = str(first).strip()
    last = str(last).strip()
    email = str(email).strip().lower() if pd.notna(email) else ''
    
    key = f"{first.lower()}_{last.lower()}"
    
    if key not in students_map:
        students_map[key] = {
            "studentFirstName": first,
            "studentLastName": last,
            "parentEmail": email,
            "dob": dob_str,
            "courseIds": set()
        }
    
    for cid in course_ids:
        students_map[key]['courseIds'].add(cid)

for sheet in xl.sheet_names:
    df = xl.parse(sheet)
    
    current_courses = sheet_to_course.get(sheet, [])
    
    for i in range(len(df)):
        row = df.iloc[i]
        val1 = str(row.iloc[1]).strip()
        val3 = str(row.iloc[3]).strip() if len(row) > 3 else ""
        
        # dynamic course updates
        if sheet == 'CIES':
            if val3 == 'ADK MOOVE' or val1 == 'ADK MOOVE':
                current_courses = [25]
            elif val3 == 'ADK UNITY' or val1 == 'ADK UNITY':
                current_courses = [26]
            elif val3 == 'ADK TEAM' or val1 == 'ADK TEAM':
                current_courses = [28]
        
        if sheet == 'JAZZ 1 et 2 ':
            if val1 == 'Jazz 2':
                current_courses = [7]
            elif not current_courses:
                current_courses = [10] # default Jazz 1
                
        # Parse student
        last = row.iloc[1] if len(row) > 1 else None
        first = row.iloc[2] if len(row) > 2 else None
        email = row.iloc[6] if len(row) > 6 else None
        dob = row.iloc[7] if len(row) > 7 else None
        
        if pd.isna(last) or str(last).strip() in ['NOM', 'nan', 'CL 1 & 2', 'Jazz 2']:
            continue
            
        dob_str = ""
        if pd.notna(dob) and hasattr(dob, 'strftime'):
            dob_str = dob.strftime("%d/%m/%Y")
        elif pd.notna(dob):
            dob_str = str(dob).strip()
            if len(dob_str) > 10:
                dob_str = dob_str[:10]
        
        add_student(first, last, email, dob_str, current_courses)

# Convert sets to lists
out_students = []
for k, v in students_map.items():
    v['courseIds'] = list(v['courseIds'])
    out_students.append(v)

with open('clean_students.json', 'w', encoding='utf-8') as f:
    json.dump(out_students, f, ensure_ascii=False, indent=2)

print(f"Parsed {len(out_students)} distinct students.")
