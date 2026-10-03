const projectId = 'adk-vitrine';

async function fetchCollection(col) {
  const url = 'https://firestore.googleapis.com/v1/projects/' + projectId + '/databases/(default)/documents/' + col;
  const res = await fetch(url);
  const data = await res.json();
  console.log(col, data);
}

async function run() {
  await fetchCollection('attendance');
  await fetchCollection('prof_hours');
}
run();
