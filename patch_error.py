with open('portail.html', 'r', encoding='utf-8') as f:
    content = f.read()

old_error_handling = """  <script>
    window.addEventListener('error', function(e) {
      alert("JS Error: " + e.message + " at " + e.filename + ":" + e.lineno);
    });
    window.addEventListener('unhandledrejection', function(e) {
      alert("Unhandled Promise Rejection: " + e.reason);
    });
  </script>"""

new_error_handling = """  <script>
    window.addEventListener('error', function(e) {
      console.error("JS Error: " + e.message + " at " + e.filename + ":" + e.lineno);
    });
    window.addEventListener('unhandledrejection', function(e) {
      console.error("Unhandled Promise Rejection: ", e.reason);
    });
  </script>"""

content = content.replace(old_error_handling, new_error_handling)

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(content)
print('Fixed error handling in portail.html')
