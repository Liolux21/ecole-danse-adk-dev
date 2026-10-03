from html.parser import HTMLParser
import re

class MyHTMLParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.in_h = False
        self.results = []
    
    def handle_starttag(self, tag, attrs):
        if tag in ['h3', 'h4', 'h5', 'h6']:
            self.in_h = True
                
    def handle_endtag(self, tag):
        if tag in ['h3', 'h4', 'h5', 'h6']:
            self.in_h = False
            
    def handle_data(self, data):
        if self.in_h and data.strip():
            self.results.append(data.strip())

parser = MyHTMLParser()
with open(r'C:\Users\lione\.gemini\antigravity\brain\9c6b55f5-9dd1-4d48-87c6-e7c2afa921e4\.system_generated\steps\1612\content.md', 'r', encoding='utf-8') as f:
    parser.feed(f.read())

for r in parser.results:
    print(r)
