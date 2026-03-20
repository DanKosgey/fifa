const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src/pages');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Background and stark white replacements
  content = content.replace(/bg-white text-slate-900/g, 'bg-transparent text-slate-900');
  content = content.replace(/bg-white border border-slate-100/g, 'glass-card');
  content = content.replace(/bg-white rounded-\[?[23]?\.?5?rem\]? p-\d+ md:p-\d+ border border-slate-200/g, 'glass-card p-8 md:p-10');
  content = content.replace(/bg-white rounded-\[?[23]?\.?5?rem\]? p-\d+ border border-slate-200/g, 'glass-card p-8');
  content = content.replace(/bg-white rounded-2xl border border-slate-200/g, 'glass-card rounded-2xl');
  content = content.replace(/bg-white rounded-xl border border-slate-200/g, 'glass-card rounded-xl');
  content = content.replace(/bg-white border border-slate-200/g, 'glass-card');
  
  // Specific flat patches
  content = content.replace(/bg-white\/100/g, 'bg-slate-50/90');
  content = content.replace(/bg-slate-100/g, 'bg-slate-900/10');
  content = content.replace(/border-slate-200/g, 'border-slate-900/10');
  content = content.replace(/border-slate-100/g, 'border-slate-900/5');
  
  // Input patches
  content = content.replace(/bg-white border border-slate-200/g, 'bg-slate-900/5 border-slate-900/10 focus:border-emerald-500/50 focus:ring-emerald-500/20');
  
  // Shadow patches
  content = content.replace(/shadow-xl shadow-slate-200\/50/g, 'shadow-2xl shadow-slate-900/5');
  content = content.replace(/shadow-sm/g, 'shadow-lg shadow-slate-900/5');
  
  // Padding & specific components
  content = content.replace(/px-4 py-2 bg-white/g, 'px-5 py-2.5 glass-card');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      replaceInFile(fullPath);
    }
  }
}

walkDir(directoryPath);
console.log('Refactoring complete.');
