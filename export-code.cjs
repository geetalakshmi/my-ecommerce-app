const fs = require('fs');
const path = require('path');

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      // Skip node_modules and other build directories
      if (!['node_modules', 'dist', '.git', '.bolt'].includes(file)) {
        arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
      }
    } else {
      // Skip certain file types
      if (!file.endsWith('.lock') && !file.startsWith('.')) {
        arrayOfFiles.push(fullPath);
      }
    }
  });

  return arrayOfFiles;
}

function exportProjectFiles() {
  const projectRoot = '/home/project';
  const files = getAllFiles(projectRoot);
  
  console.log('='.repeat(80));
  console.log('COMPLETE PROJECT CODE EXPORT');
  console.log('='.repeat(80));
  console.log();
  
  files.forEach(filePath => {
    const relativePath = path.relative(projectRoot, filePath);
    const content = fs.readFileSync(filePath, 'utf8');
    
    console.log(`\n${'='.repeat(60)}`);
    console.log(`FILE: ${relativePath}`);
    console.log(`${'='.repeat(60)}`);
    console.log(content);
  });
  
  console.log('\n' + '='.repeat(80));
  console.log('END OF PROJECT EXPORT');
  console.log('='.repeat(80));
}

exportProjectFiles();