import fs from 'fs';
const dataStr = fs.readFileSync('js/data.js', 'utf8').replace('export const DATA =', 'global.DATA =');
eval(dataStr);

const appStr = fs.readFileSync('js/app.js', 'utf8');

// just extract the planning functions
const planningFns = [
  'const planningState',
  'function initPlanning',
  'function slotMatchesFilters',
  'function refreshPlanning',
  'function renderMobileDayCourses'
];

let evalStr = '';
for (const fn of planningFns) {
  let start = appStr.indexOf(fn);
  let end = appStr.indexOf('function', start + 10);
  if (end === -1) end = appStr.indexOf('//', start + 10);
  evalStr += appStr.substring(start, end) + '\n';
}
// fake document
global.document = {
  getElementById: (id) => ({
    addEventListener: () => {},
    innerHTML: '',
    appendChild: () => {},
    textContent: ''
  }),
  createElement: () => ({ style: {}, classList: { add: () => {} } }),
  querySelectorAll: () => []
};

try {
  eval(evalStr);
  initPlanning();
  console.log('Success');
} catch (e) {
  console.log('Error:', e);
}
