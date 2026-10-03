import re

def update_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except FileNotFoundError:
        return
        
    # 1. Add sortCourses method to DATA
    sort_func = """
  sortCourses() {
    const order = [12, 11, 5, 6, 4, 10, 7, 21, 2, 3, 38, 30, 28, 22, 20, 23, 1, 27, 24, 25, 26, 19, 18, 34, 35, 36, 17, 13, 8, 16, 37, 14, 39, 29, 9, 15, 32, 33, 31];
    this.courses.sort((a, b) => {
      let ia = order.indexOf(parseInt(a.id));
      let ib = order.indexOf(parseInt(b.id));
      if (ia === -1) ia = 999;
      if (ib === -1) ib = 999;
      return ia - ib;
    });
  },
"""
    if "sortCourses()" not in content:
        content = content.replace("getCourseById(id)", sort_func + "  getCourseById(id)")
    
    # 2. Call sortCourses() after syncFromFirebase loads courses
    if "this.sortCourses();" not in content and "results[2].value.forEach(doc => this.courses.push({ docId: doc.id, id: doc.id, ...doc.data() }));" in content:
        content = content.replace(
            "results[2].value.forEach(doc => this.courses.push({ docId: doc.id, id: doc.id, ...doc.data() }));",
            "results[2].value.forEach(doc => this.courses.push({ docId: doc.id, id: doc.id, ...doc.data() }));\n        this.sortCourses();"
        )

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
        
    print(f"Updated {filepath}")

update_file(r"C:\Users\lione\OneDrive\Documents\ADK-VITRINE\js\data.js")
update_file(r"C:\Users\lione\OneDrive\Documents\ADK-VITRINE\temp_prod\js\data.js")

# We also need to sort the hardcoded initial list to ensure it's correct before firebase sync finishes
# It's easier to just call DATA.sortCourses() at the very bottom of data.js
def append_sort_call(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except FileNotFoundError:
        return
        
    if "DATA.sortCourses();" not in content:
        content += "\nDATA.sortCourses();\n"
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

append_sort_call(r"C:\Users\lione\OneDrive\Documents\ADK-VITRINE\js\data.js")
append_sort_call(r"C:\Users\lione\OneDrive\Documents\ADK-VITRINE\temp_prod\js\data.js")

