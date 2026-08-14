import urllib.request
html = urllib.request.urlopen('https://liolux21.github.io/ecole-danse-adk-dev/index.html').read().decode('utf-8')
if 'class="vitrine-section"' in html:
    print('YES')
else:
    print('NO')
