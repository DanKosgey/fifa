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

  // Single pass replacement using regex with a replacer function
  content = content.replace(/\b(bg-slate-950|bg-slate-900|bg-slate-800|text-slate-100|text-slate-400|text-slate-950|text-white|bg-white|from-slate-950|text-white\/[0-9]+|bg-white\/[0-9]+|border-white\/[0-9]+|shadow-white\/[0-9]+|placeholder-white\/[0-9]+|placeholder:text-white\/[0-9]+|ring-white\/[0-9]+|from-white\/[0-9]+|via-white\/[0-9]+|to-white\/[0-9]+)\b/g, (match) => {
    switch (match) {
      case 'bg-slate-950': return 'bg-slate-50';
      case 'bg-slate-900': return 'bg-white';
      case 'bg-slate-800': return 'bg-slate-100';
      
      case 'text-slate-100': return 'text-slate-900';
      case 'text-slate-400': return 'text-slate-500';
      case 'text-slate-950': return 'text-white';
      
      case 'text-white': return 'text-slate-900';
      case 'bg-white': return 'bg-slate-900';
      
      case 'from-slate-950': return 'from-slate-50';
    }
    
    // Handle opacity cases
    if (match.startsWith('text-white/')) return match.replace('text-white/', 'text-slate-900/');
    if (match.startsWith('bg-white/')) return match.replace('bg-white/', 'bg-slate-900/');
    if (match.startsWith('border-white/')) return match.replace('border-white/', 'border-slate-900/');
    if (match.startsWith('shadow-white/')) return match.replace('shadow-white/', 'shadow-slate-900/');
    if (match.startsWith('placeholder-white/')) return match.replace('placeholder-white/', 'placeholder-slate-900/');
    if (match.startsWith('placeholder:text-white/')) return match.replace('placeholder:text-white/', 'placeholder:text-slate-900/');
    if (match.startsWith('ring-white/')) return match.replace('ring-white/', 'ring-slate-900/');
    if (match.startsWith('from-white/')) return match.replace('from-white/', 'from-slate-900/');
    if (match.startsWith('via-white/')) return match.replace('via-white/', 'via-slate-900/');
    if (match.startsWith('to-white/')) return match.replace('to-white/', 'to-slate-900/');
    
    return match;
  });

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

walkDir('./src', replaceInFile);
