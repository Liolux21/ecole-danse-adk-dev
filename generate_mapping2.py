import json

students = json.load(open('students_import.json', encoding='utf-8'))
courses = set()
for s in students:
    courses.add(s.get('coursesRaw', '').strip())

def parse_raw(raw):
    s = raw.lower()
    ids = set()
    
    if 'hh 1' in s or 'hiphop 1' in s or 'hh1' in s: ids.add(22)
    if 'hh 2' in s or 'hiphop 2' in s or 'hh2' in s: ids.add(20)
    if 'hh 3' in s or 'hiphop 3' in s or 'hh3' in s: ids.add(23)
    if 'hh 4' in s or 'hiphop 4' in s or 'hh4' in s: ids.add(1)
    if 'hh 5' in s or 'hiphop 5' in s or 'hh5' in s: ids.add(27)
    if 'hh 6' in s or 'hiphop 6' in s or 'hh6' in s: ids.add(24)
    if 'adultes hh' in s or 'adultes hiphop' in s or 'adultes hip hop' in s: ids.add(32)
    
    if 'jazz 1' in s: ids.add(10)
    if 'jazz 2' in s: ids.add(7)
    if 'jazz 3' in s: ids.add(21)
    if 'jazz 4' in s: ids.add(2)
    if 'jazz 5' in s: ids.add(3)
    if 'adultes jazz' in s or 'adulte jazz' in s: ids.add(33)
    if 'street jazz' in s or 'streetjazz' in s: ids.add(9)
    
    if 'cl 1' in s or ('classique 1' in s and 'pointes' not in s): ids.add(5)
    if 'cl 2' in s or 'classique 2' in s: ids.add(6)
    if 'pointes' in s or 'ballet' in s: ids.add(4)
    if 'cl 3' in s: ids.add(4) # Map CL 3 to Ballet Classique & Pointes since there's no CL 3
    
    if 'ragga 1' in s or 'ragga r1' in s: ids.add(17)
    if 'ragga 2' in s or 'ragga2' in s: ids.add(13)
    if 'ragga 3' in s or 'ragga3' in s: ids.add(8)
    if 'ragga 4' in s or 'ragga4' in s: ids.add(16)
    
    if 'initiation' in s: ids.add(11)
    if 'eveil' in s or 'éveil' in s: ids.add(12)
    
    if 'girly pro' in s or 'girly pro' in s: ids.add(29)
    elif 'girly' in s and 'rox' in s: ids.add(39)
    elif 'girly' in s or 'gilry' in s: ids.add(14)
    
    if 'contempo pro' in s: ids.add(30)
    elif 'contempo' in s and 'rox' in s: ids.add(38)
    elif 'contempo' in s: ids.add(38) # Default to rox contempo or should it be Jazz Contempo? Let's assume Rox Contempo for generic 'contempo'. Wait, 'Contempo' alone often means Atelier Pro Contemporain if they are advanced. Let's just leave it if they have other clues, or 30. Let's map 'contempo' to 30 (Atelier Pro) if they also have 'pro' or just 38 (Rox). We'll map 'contempo' to 38 unless 'pro'.
    
    if 'rox hh' in s: ids.add(36)
    if 'rox ragga' in s: ids.add(37)
    
    if 'pomdance' in s: ids.add(15)
    if 'break' in s: ids.add(18)
    
    if 'cie moove' in s: ids.add(25)
    if 'cie unity' in s or 'adk unity' in s or 'cie  unity' in s: ids.add(26)
    if 'cie team' in s or 'adk team' in s: ids.add(28)
    
    if 'pole dance' in s: ids.add(31)
    
    if 'bertrix 9' in s: ids.add(34)
    elif 'bertrix' in s: ids.add(35)
    
    if 'tous rox' in s: ids.add(36); ids.add(37); ids.add(38); ids.add(39)
    if 'line dance' in s: pass
    
    return list(ids)

mapping = {}
empty_count = 0
for c in sorted(list(courses)):
    m = parse_raw(c)
    if not m:
        empty_count += 1
        print("EMPTY:", c)
    mapping[c] = m

print(empty_count, "empty mappings")
with open('mapping.json', 'w', encoding='utf-8') as f:
    json.dump(mapping, f, indent=2)
