const fs = require('fs');
let dataStr = fs.readFileSync('js/data.js', 'utf8').replace('export const DATA =', 'global.DATA =');
dataStr = dataStr.replace(/import .*;/, '');
dataStr = dataStr.replace(/export \{.*\};/, '');
eval(dataStr);

let appStr = fs.readFileSync('js/app.js', 'utf8');

let evalStr = 'const planningState = { offset: 0, styleFilter: \"all\", lieuFilter: \"all\", mobileDay: 0 };\n';
let start1 = appStr.indexOf('function initPlanning()');
let end1 = appStr.indexOf('function slotMatchesFilters');
evalStr += appStr.substring(start1, end1);

let start2 = appStr.indexOf('function slotMatchesFilters');
let end2 = appStr.indexOf('function refreshPlanning');
evalStr += appStr.substring(start2, end2);

let start3 = appStr.indexOf('function refreshPlanning');
let end3 = appStr.indexOf('function renderMobileDayCourses');
evalStr += appStr.substring(start3, end3);

let start4 = appStr.indexOf('function renderMobileDayCourses');
let end4 = appStr.indexOf('function initInscription');
evalStr += appStr.substring(start4, end4);

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
