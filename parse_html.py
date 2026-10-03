from html.parser import HTMLParser

class MyHTMLParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.in_h = False
        self.current_name = None
        self.results = []
    
    def handle_starttag(self, tag, attrs):
        if tag in ['h4', 'h5']:
            self.in_h = True
        elif tag == 'img':
            attrs_dict = dict(attrs)
            if 'src' in attrs_dict and 'gallery' in attrs_dict['src']:
                # The name is usually associated nearby. We just collect all images.
                self.results.append(('img', attrs_dict['src']))
                
    def handle_endtag(self, tag):
        if tag in ['h4', 'h5']:
            self.in_h = False
            
    def handle_data(self, data):
        if self.in_h and data.strip():
            self.results.append(('name', data.strip()))

parser = MyHTMLParser()
with open(r'C:\Users\lione\.gemini\antigravity\brain\9c6b55f5-9dd1-4d48-87c6-e7c2afa921e4\.system_generated\steps\1478\content.md', 'r', encoding='utf-8') as f:
    parser.feed(f.read())

for r in parser.results:
    print(r)
