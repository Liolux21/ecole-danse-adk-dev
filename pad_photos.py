import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Pad photos array to always have at least 3 elements
old_photos = "let photos = (VITRINE_DATA.gallery && VITRINE_DATA.gallery[key]) ? VITRINE_DATA.gallery[key] : [data.modalImage || data.avatar];"
new_photos = """let photos = (VITRINE_DATA.gallery && VITRINE_DATA.gallery[key]) ? VITRINE_DATA.gallery[key] : [data.modalImage || data.avatar];
          // Ensure at least 3 photos for the carousel
          if (photos.length > 0 && photos.length < 3) {
            const originalPhotos = [...photos];
            while (photos.length < 3) {
              photos.push(originalPhotos[photos.length % originalPhotos.length]);
            }
          }"""
          
html = html.replace(old_photos, new_photos)

# Also let's ensure the carousel height is adjusted for 3 side by side.
# 260px is a bit tall for 33% width if they are wide.
# Let's change 260px to 200px or keep it as is.
html = html.replace('<div style="position: relative; width: 100%; height: 260px; border-radius: var(--radius); overflow: hidden; margin-bottom: 1.5rem; box-shadow: 0 4px 15px rgba(0,0,0,0.15);">',
                    '<div style="position: relative; width: 100%; height: 180px; border-radius: var(--radius); overflow: hidden; margin-bottom: 1.5rem; box-shadow: 0 4px 15px rgba(0,0,0,0.15);">')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
