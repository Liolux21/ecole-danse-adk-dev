import os

with open('js/app.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace block 1 (Vitrine)
target1 = """  let img = '';
  if (course.image) {
    img = `<img src="${course.image}" alt="${course.name}" class="course-img" loading="lazy">`;
  } else {
    let typeLabel = '';
    if (course.eventType === 'pro') typeLabel = 'ADK Pro';
    else if (course.eventType === 'stage') typeLabel = 'ADK Stage';
    else if (course.eventType === 'show') typeLabel = 'ADK Show';
    
    if (typeLabel) {
      img = `<div class="course-img" style="display:flex; flex-direction:column; align-items:center; justify-content:center; background:linear-gradient(135deg,#2a2a2a,#111); color:#fff; text-align:center;">
        <img src="img/apple-touch-icon.png" style="width:50px; height:50px; object-fit:contain; margin-bottom:10px;" alt="ADK">
        <strong style="font-size:1.1rem; color:var(--gold); font-family:'Playfair Display', serif;">${typeLabel}</strong>
      </div>`;
    } else {
      img = `<div class="course-img-placeholder" style="background:linear-gradient(135deg,#1a1a1a,#242424)">${course.emoji || '💃'}</div>`;
    }
  }"""

replacement1 = """  let img = '';
  if (course.image) {
    img = `<img src="${course.image}" alt="${course.name}" class="course-img" loading="lazy">`;
  } else {
    let typeLabel = '';
    if (course.eventType === 'pro') typeLabel = 'img/adk_pro.png';
    else if (course.eventType === 'stage') typeLabel = 'img/adk_stage.png';
    else if (course.eventType === 'show') typeLabel = 'img/adk_show.png';
    
    if (typeLabel) {
      img = `<img src="${typeLabel}" alt="${course.name}" class="course-img" loading="lazy">`;
    } else {
      img = `<div class="course-img-placeholder" style="background:linear-gradient(135deg,#1a1a1a,#242424)">${course.emoji || '💃'}</div>`;
    }
  }"""

# Replace block 2 (Planning)
target2 = """    let imgHtml = '';
    if (c.image && c.image !== 'undefined') {
      imgHtml = `<img src="${c.image}" class="portal-course-img" alt="${c.name}">`;
    } else {
      let typeLabel = 'ADK';
      if (c.eventType === 'pro') typeLabel = 'ADK Pro';
      else if (c.eventType === 'stage') typeLabel = 'ADK Stage';
      else if (c.eventType === 'show') typeLabel = 'ADK Show';
      else typeLabel = c.style ? c.style.toUpperCase() : 'ADK';
      
      imgHtml = `<div class="portal-course-img" style="display:flex; flex-direction:column; align-items:center; justify-content:center; background:linear-gradient(135deg,#2a2a2a,#111); color:#fff; text-align:center; overflow:hidden;">
        <img src="img/apple-touch-icon.png" style="width:30px; height:30px; object-fit:contain; margin-bottom:4px;" alt="ADK">
        <strong style="font-size:0.65rem; color:var(--gold); font-family:'Playfair Display', serif; line-height:1; padding: 0 2px;">${typeLabel}</strong>
      </div>`;
    }"""

replacement2 = """    let imgHtml = '';
    if (c.image && c.image !== 'undefined') {
      imgHtml = `<img src="${c.image}" class="portal-course-img" alt="${c.name}">`;
    } else {
      let fallbackSrc = '';
      if (c.eventType === 'pro') fallbackSrc = 'img/adk_pro.png';
      else if (c.eventType === 'stage') fallbackSrc = 'img/adk_stage.png';
      else if (c.eventType === 'show') fallbackSrc = 'img/adk_show.png';
      
      if (fallbackSrc) {
          imgHtml = `<img src="${fallbackSrc}" class="portal-course-img" alt="${c.name}">`;
      } else {
          let typeLabel = c.style ? c.style.toUpperCase() : 'ADK';
          imgHtml = `<div class="portal-course-img" style="display:flex; flex-direction:column; align-items:center; justify-content:center; background:linear-gradient(135deg,#2a2a2a,#111); color:#fff; text-align:center; overflow:hidden;">
            <img src="img/apple-touch-icon.png" style="width:30px; height:30px; object-fit:contain; margin-bottom:4px;" alt="ADK">
            <strong style="font-size:0.65rem; color:var(--gold); font-family:'Playfair Display', serif; line-height:1; padding: 0 2px;">${typeLabel}</strong>
          </div>`;
      }
    }"""

if target1 in content:
    content = content.replace(target1, replacement1)
    print("Replaced target1.")
else:
    print("Target1 not found.")

if target2 in content:
    content = content.replace(target2, replacement2)
    print("Replaced target2.")
else:
    print("Target2 not found.")

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(content)
