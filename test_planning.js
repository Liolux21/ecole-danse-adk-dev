import fs from 'fs';

// Mock DOM
import { JSDOM } from 'jsdom';
const dom = new JSDOM(\
  <div id="planning-grid"></div>
  <div id="planning-week"></div>
  <div id="plan-prev"></div>
  <div id="plan-next"></div>
  <div id="planning-style-filters"></div>
  <div id="planning-lieu-filters"></div>
  <div id="mobile-day-tabs"></div>
\);
global.document = dom.window.document;
global.window = dom.window;

// Load data.js
const dataCode = fs.readFileSync('js/data.js', 'utf8');
const dataModule = dataCode.replace('export const DATA', 'global.DATA = DATA; const DATA');
eval(dataModule); // Eval data.js in global scope

// Load app.js functions related to planning
const appCode = fs.readFileSync('js/app.js', 'utf8');
const planningCode = appCode.substring(
  appCode.indexOf('const planningState'),
  appCode.indexOf('// =============================================', appCode.indexOf('const planningState'))
);

eval(planningCode);

try {
  initPlanning();
  console.log('initPlanning SUCCESS!');
} catch (e) {
  console.log('initPlanning FAILED:', e);
}
