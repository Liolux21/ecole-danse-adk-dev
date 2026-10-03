import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# In showPortalDashboard:
# function showPortalDashboard(user) {
#   document.getElementById('portal-login-wrapper').style.display = 'none';
pattern_show = r'(function showPortalDashboard\(user\) \{\s*document\.getElementById\(\'portal-login-wrapper\'\)\.style\.display = \'none\';)'
replacement_show = r'\1\n  const subtitle = document.getElementById(\'portal-subtitle\');\n  if (subtitle) subtitle.style.display = \'none\';'

js = re.sub(pattern_show, replacement_show, js)

# In logout handlers (there are multiple, but maybe there's a common logout logic or they are identical)
# Actually, they are attached to 'admin-logout', 'prof-logout', 'parent-logout'
pattern_logout = r'(document\.getElementById\(\'portal-login-wrapper\'\)\.style\.display = \'flex\';)'
replacement_logout = r'\1\n      const subtitle = document.getElementById(\'portal-subtitle\');\n      if (subtitle) subtitle.style.display = \'block\';'
js = re.sub(pattern_logout, replacement_logout, js)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
