const projectId = 'adk-vitrine';
const key = 'AIzaSyBPOPRg9AxDqojhkskOIRO-4AHxvLICP7Q';

async function testWrite() {
  const url = 'https://firestore.googleapis.com/v1/projects/' + projectId + '/databases/(default)/documents/prof_hours?key=' + key;
  const payload = {
    fields: {
      profId: { stringValue: 'test@test.com' },
      hours: { doubleValue: 1.0 }
    }
  };
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  console.log(data);
}
testWrite();
