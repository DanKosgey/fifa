const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

function replaceInFile(filePath) {
  if (!filePath.endsWith('.tsx') && !filePath.endsWith('.css')) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  content = content.replace(/bg-emerald-500 text-slate-900/g, 'bg-emerald-500 text-white');
  content = content.replace(/bg-emerald-600 text-slate-900/g, 'bg-emerald-600 text-white');
  content = content.replace(/bg-blue-600 text-slate-900/g, 'bg-blue-600 text-white');
  content = content.replace(/bg-emerald-600 hover:bg-emerald-500 text-slate-900/g, 'bg-emerald-600 hover:bg-emerald-500 text-white');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

walkDir('./src', replaceInFile);
