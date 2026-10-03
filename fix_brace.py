import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    content = f.read()

# I will find the EXACT string and just add `\n  }` where it's missing!
old = """      }
    }
    const lieuName = DATA.locations.find(l => l.id === course.lieu)?.name || formatLieu(course.lieu);"""

new = """      }
    }
  }
    const lieuName = DATA.locations.find(l => l.id === course.lieu)?.name || formatLieu(course.lieu);"""

content = content.replace(old, new)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(content)
