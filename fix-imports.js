const fs = require('fs');
const path = require('path');

function walk(dir){
  fs.readdirSync(dir, { withFileTypes: true }).forEach(ent=>{
    const p = path.join(dir, ent.name);
    if(ent.isDirectory()) return walk(p);
    if(!/\.(ts|tsx|js|jsx)$/.test(ent.name)) return;
    let s = fs.readFileSync(p,'utf8');
    const before = s;
    // remove ...@1.2.3 and ...@1.2.3/... patterns in import specifiers
    s = s.replace(/(['"])((?:@?[^'"]+?)@)(\d+(?:\.\d+)*)(?=(?:[\/'"]|$))/g, (m, q, nameAt, ver)=>{
      return q + nameAt.slice(0, -1) + q;
    });
    // fallback: remove @version when at end of package name inside quotes
    s = s.replace(/(['"])(@[^'"]+?)@\d+(?:\.\d+)*(?=\1)/g, (m,q,n)=> q + n + q);
    if(s !== before) fs.writeFileSync(p, s, 'utf8');
  });
}

const src = path.resolve('src');
if(!fs.existsSync(src)){
  console.error('src directory not found at', src);
  process.exit(1);
}
if(!fs.existsSync('src_backup')){
  fs.cpSync(src, 'src_backup', { recursive: true });
  console.log('backup created at src_backup');
} else {
  console.log('src_backup already exists, not overwriting');
}
walk(src);
console.log('done — imports cleaned. If you see issues, restore from src_backup');