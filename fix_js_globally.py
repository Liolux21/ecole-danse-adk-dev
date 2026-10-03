import re

with open('js/vitrine-data.js', 'r', encoding='utf-8') as f:
    js = f.read()

# I will just write a very clean regex replacement.
# Replace any `"\\n    },\n    "` with `"\n    },\n    "`
# Wait, the literal string has literal `\n` encoded as `\\n`. 
js = js.replace('"\\n    },    "eveil": {', '"\n    },\n    "eveil": {')
js = js.replace('"\\n    },    "pomdance": {', '"\n    },\n    "pomdance": {')
js = js.replace('"\\n    },    "girly": {', '"\n    },\n    "girly": {')
js = js.replace('"\\n    },    "breakdance": {', '"\n    },\n    "breakdance": {')
js = js.replace('"\\n    },    "streetjazz": {', '"\n    },\n    "streetjazz": {')
js = js.replace('"\\n    },    "hiphop": {', '"\n    },\n    "hiphop": {')
js = js.replace('"\\n    },    "ragga": {', '"\n    },\n    "ragga": {')
js = js.replace('"\\n    },    "classique": {', '"\n    },\n    "classique": {')
js = js.replace('"\\n    },    "jazz_contemporain": {', '"\n    },\n    "jazz_contemporain": {')
js = js.replace('"\\n    },    "compagnie": {', '"\n    },\n    "compagnie": {')
js = js.replace('"\\n    },    "special": {', '"\n    },\n    "special": {')
js = js.replace('"\\n    }\\n  },\\n  "professeurs":', '"\n    }\n  },\n  "professeurs":')

with open('js/vitrine-data.js', 'w', encoding='utf-8') as f:
    f.write(js)
