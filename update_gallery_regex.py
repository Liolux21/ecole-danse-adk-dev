import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

pattern = r'const stylePhotos = \{.*?const photos = stylePhotos\[key\].*?;'
new_code = """let photos = [];
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
"""

html = re.sub(pattern, new_code, html, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
