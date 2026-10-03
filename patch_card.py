import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    content = f.read()

old_block = r"""    if (typeLabel) {
      img = `<img src="${typeLabel}" alt="${course.name}" class="course-img" loading="lazy">`;
    } else {
      img = `<div class="course-img-placeholder" style="background:linear-gradient(135deg,#1a1a1a,#242424)">${course.emoji || '💃'}</div>`;
    }"""

new_block = r"""    if (typeLabel) {
      img = `<img src="${typeLabel}" alt="${course.name}" class="course-img" loading="lazy">`;
    } else {
      let vitrineImg = null;
      if (window.VITRINE_DATA && window.VITRINE_DATA.cours && window.VITRINE_DATA.cours[course.style]) {
        vitrineImg = window.VITRINE_DATA.cours[course.style].avatar;
      }
      if (vitrineImg) {
        img = `<img src="${vitrineImg}" alt="${course.name}" class="course-img" style="object-fit: cover;" loading="lazy">`;
      } else {
        img = `<div class="course-img-placeholder" style="background:linear-gradient(135deg,#1a1a1a,#242424)">${course.emoji || '💃'}</div>`;
      }
    }"""

# I need to be careful with the emoji replacement if encoding gets weird.
# Since my script reads/writes utf-8, python might complain if the old block has unicode.
# I will use a simple regex replacing just the else block.

match = re.search(r'if \(typeLabel\) \{[\s\S]*?\} else \{[\s\S]*?\}', content)
if match:
    # Safely replace only inside the function `createCourseCard`
    card_start = content.find('function createCourseCard')
    card_end = content.find('return card;', card_start)
    if card_start != -1 and card_end != -1:
        card_content = content[card_start:card_end]
        
        replacement = """    if (typeLabel) {
      img = `<img src="${typeLabel}" alt="${course.name}" class="course-img" loading="lazy">`;
    } else {
      let vitrineImg = null;
      if (window.VITRINE_DATA && window.VITRINE_DATA.cours && window.VITRINE_DATA.cours[course.style]) {
        vitrineImg = window.VITRINE_DATA.cours[course.style].avatar;
      }
      if (vitrineImg) {
        img = `<img src="${vitrineImg}" alt="${course.name}" class="course-img" style="object-fit: cover;" loading="lazy">`;
      } else {
        img = `<div class="course-img-placeholder" style="background:linear-gradient(135deg,#1a1a1a,#242424)">${course.emoji || '💃'}</div>`;
      }
    }"""
        
        # simple string replace inside card_content
        import re
        new_card_content = re.sub(r'if \(typeLabel\) \{[\s\S]*?else \{[\s\S]*?\}[\s]*\}', replacement, card_content)
        
        content = content[:card_start] + new_card_content + content[card_end:]
        
        with open('js/app.js', 'w', encoding='utf-8') as f:
            f.write(content)
        print("Success")
    else:
        print("Could not find bounds")
else:
    print("Could not find match")
