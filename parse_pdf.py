import PyPDF2
import json
import re

pdf_path = "C:/Users/lione/.gemini/antigravity/brain/9c6b55f5-9dd1-4d48-87c6-e7c2afa921e4/.user_uploaded/media_1788264199682.pdf"

with open(pdf_path, 'rb') as f:
    reader = PyPDF2.PdfReader(f)
    num_pages = len(reader.pages)
    half = num_pages // 2
    
    records = []
    
    for i in range(half):
        left_text = reader.pages[i].extract_text()
        right_text = reader.pages[i + half].extract_text()
        
        left_lines = left_text.strip().split('\n')
        right_lines = right_text.strip().split('\n')
        
        # Sometimes there's a mismatch if a line was wrapped.
        # But looking at PyPDF2 output, it seemed 1-to-1.
        for l_idx in range(min(len(left_lines), len(right_lines))):
            lline = left_lines[l_idx].strip()
            rline = right_lines[l_idx].strip()
            
            if not lline or not rline: continue
            if '@' not in rline: continue # skip malformed right lines
            
            # Parse right line (Email | DOB | Course 1 | Course 2 ...)
            r_parts = re.split(r'\s+', rline)
            email = r_parts[0].lower()
            dob = ""
            courses = []
            
            if len(r_parts) > 1 and re.match(r'\d{2}-\d{2}-\d{2}', r_parts[1]):
                dob = r_parts[1]
                # Reconstruct courses. Sometimes they have spaces like "ROX Girly"
                # The remaining text after the DOB
                c_text = rline[rline.find(dob)+len(dob):].strip()
                # Split by known course names or just leave as a single string?
                # Actually, separating courses is hard because of spaces. Let's just store as raw string, 
                # or split by 2 spaces if any? 
                # PyPDF2 separates words by 1 space.
                courses = [c.strip() for c in c_text.split('  ') if c.strip()]
                if not courses:
                    courses = [c_text]
            else:
                courses = [" ".join(r_parts[1:])]
                
            # Parse left line
            # "LAST_NAME FirstName Address ... Phone ParentName"
            # It's tricky. But usually: FIRST word(s) ALL CAPS = Last Name. Next word = First Name.
            l_parts = lline.split(' ')
            last_name = []
            first_name = ""
            idx = 0
            while idx < len(l_parts) and (l_parts[idx].isupper() or l_parts[idx] in ["DE", "DU", "VAN", "DER"]):
                last_name.append(l_parts[idx])
                idx += 1
            if idx < len(l_parts):
                first_name = l_parts[idx]
                idx += 1
                
            # The rest is address, phone, parent name. We don't strictly need it for the app, 
            # except parent name if we want, but email is the unique ID for parent.
            # Phone usually has digits and slashes.
            
            records.append({
                "studentFirstName": first_name.capitalize(),
                "studentLastName": " ".join(last_name).capitalize(),
                "parentEmail": email,
                "dob": dob,
                "coursesRaw": courses[0] if courses else ""
            })
            
    with open('students_import.json', 'w', encoding='utf-8') as out:
        json.dump(records, out, indent=2, ensure_ascii=False)
        
    print(f"Extracted {len(records)} records.")
