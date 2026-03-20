const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'c:/Users/PC/OneDrive/Desktop/fifa/fifa/src/pages');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Replace stark white backgrounds with premium glass layers
  content = content.replace(/bg-white text-slate-900/g, 'bg-transparent text-slate-900');
  content = content.replace(/bg-white\/100/g, 'bg-slate-50/90');
  // Match standalone bg-white in card classNames, avoiding <option className="bg-white"> 
  // We'll replace bg-white rounded-2xl border border-slate-200 with glass-card
  content = content.replace(/bg-white rounded-\[?2?\.?5?rem\]? border border-slate-200/g, 'glass-card');
  content = content.replace(/bg-white rounded-2xl border border-slate-200/g, 'glass-card');
  content = content.replace(/bg-white rounded-xl border border-slate-200/g, 'glass-card rounded-xl');
  content = content.replace(/bg-white border border-slate-200/g, 'bg-slate-900/5 border border-slate-900/10');
  
  // Update inputs
  content = content.replace(/bg-white border border-slate-200/g, 'bg-slate-900/5 border-slate-900/10 focus:border-emerald-500/50 focus:ring-emerald-500/20');
  
  // Replace drop shadows with premium, softer shadows
  content = content.replace(/shadow-xl shadow-slate-200\/50/g, 'shadow-2xl shadow-slate-900/5');
  content = content.replace(/shadow-sm/g, 'shadow-lg shadow-slate-900/5');
  
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

walkDir('c:/Users/PC/OneDrive/Desktop/fifa/fifa/src');
console.log('Refactoring complete.');
