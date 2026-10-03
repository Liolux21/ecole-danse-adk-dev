import re

with open('js/vitrine-data.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Replace literal \n that are outside of strings back to physical newlines.
# We know that the structure is `"\n    },\n    "pomdance": {`
js = js.replace('"\\n    },\\n    "pomdance": {\n', '"\n    },\n    "pomdance": {\n')
js = js.replace('"\\n    },\\n    "girly": {\n', '"\n    },\n    "girly": {\n')
js = js.replace('"\\n    },\\n    "breakdance": {\n', '"\n    },\n    "breakdance": {\n')
js = js.replace('"\\n    },\\n    "streetjazz": {\n', '"\n    },\n    "streetjazz": {\n')
js = js.replace('"\\n    },\\n    "hiphop": {\n', '"\n    },\n    "hiphop": {\n')
js = js.replace('"\\n    },\\n    "ragga": {\n', '"\n    },\n    "ragga": {\n')
js = js.replace('"\\n    },\\n    "classique": {\n', '"\n    },\n    "classique": {\n')
js = js.replace('"\\n    },\\n    "jazz_contemporain": {\n', '"\n    },\n    "jazz_contemporain": {\n')
js = js.replace('"\\n    },\\n    "compagnie": {\n', '"\n    },\n    "compagnie": {\n')
js = js.replace('"\\n    },\\n    "special": {\n', '"\n    },\n    "special": {\n')
js = js.replace('"\\n    }\\n  },\\n  "professeurs":', '"\n    }\n  },\n  "professeurs":')

# Also wait, earlier I replaced \` with \". Did it mess anything up? Probably not.
# Now let's just run it through node to verify syntax.

with open('js/vitrine-data.js', 'w', encoding='utf-8') as f:
    f.write(js)
