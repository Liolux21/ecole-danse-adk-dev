import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

old_logic = """          const stylePhotos = {
            'eveil': ['assets/images/eveil_kids.png', 'assets/images/dance_ballet.png'],
            'classique': ['assets/images/dance_ballet.png', 'assets/images/compagnie_stage.png', 'assets/images/dance_contemporary.png'],
            'hiphop': ['assets/images/breakdance_freeze.png', 'assets/images/hiphop_dancer.png']
          };
          const photos = stylePhotos[key] || [data.modalImage || 'assets/images/hero_dancer.png', 'assets/images/compagnie_stage.png', 'assets/images/dance_contemporary.png'];"""

new_logic = """          let photos = [];
          if (typeof VITRINE_DATA !== 'undefined' && VITRINE_DATA.gallery && VITRINE_DATA.gallery[key]) {
             photos = VITRINE_DATA.gallery[key];
          } else {
             const stylePhotos = {
               'eveil': ['assets/images/eveil_kids.png', 'assets/images/dance_ballet.png'],
               'classique': ['assets/images/dance_ballet.png', 'assets/images/compagnie_stage.png', 'assets/images/dance_contemporary.png'],
               'hiphop': ['assets/images/breakdance_freeze.png', 'assets/images/hiphop_dancer.png']
             };
             photos = stylePhotos[key] || [data.modalImage || 'assets/images/hero_dancer.png', 'assets/images/compagnie_stage.png', 'assets/images/dance_contemporary.png'];
          }
          
          if (photos.length > 0 && photos.length < 3) {
            const originalPhotos = [...photos];
            while (photos.length < 3) {
              photos.push(originalPhotos[photos.length % originalPhotos.length]);
            }
          }"""

html = html.replace(old_logic, new_logic)

# Make sure photos.forEach is working properly
# Wait, before there was `const photos = ` now it is `let photos = `.
# Let's check if the replacement worked.

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
