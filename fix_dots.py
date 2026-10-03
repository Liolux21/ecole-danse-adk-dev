import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

old_dots = """          photos.forEach((_, idx) => {
            carouselHtml += `<span class="modal-dot ${idx === 0 ? 'active' : ''}" onclick="goModalCarousel(${idx})" style="width: 9px; height: 9px; border-radius: 50%; background: #ffffff; cursor: pointer; transition: 0.3s; opacity: ${idx === 0 ? '1' : '0.4'}; box-shadow: 0 0 5px rgba(0,0,0,0.6);"></span>`;
          });"""

new_dots = """          const dotsCount = Math.max(1, photos.length - 2);
          for (let idx = 0; idx < dotsCount; idx++) {
            carouselHtml += `<span class="modal-dot ${idx === 0 ? 'active' : ''}" onclick="goModalCarousel(${idx})" style="width: 9px; height: 9px; border-radius: 50%; background: #ffffff; cursor: pointer; transition: 0.3s; opacity: ${idx === 0 ? '1' : '0.4'}; box-shadow: 0 0 5px rgba(0,0,0,0.6);"></span>`;
          }"""

html = html.replace(old_dots, new_dots)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
