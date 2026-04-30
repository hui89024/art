const fs = require('fs');
const path = require('path');

const colorMap = {
  '#fffdf8': 'paper-light',
  '#fcfaf7': 'paper-base',
  '#d8cfbd': 'paper-dark',
  '#f3ede1': 'paper-muted',
  '#3a2f23': 'ink-light',
  '#2f3a32': 'ink-base',
  '#1a1a1a': 'ink-dark',
  '#96ad92': 'bamboo-light',
  '#728275': 'bamboo-base'
};

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walkDir(dirPath, callback);
    } else {
      if (dirPath.endsWith('.vue') || dirPath.endsWith('.js') || dirPath.endsWith('.css')) {
        callback(dirPath);
      }
    }
  });
}

walkDir('src', function(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  Object.keys(colorMap).forEach(hex => {
    // Escape hex string: "#fcfaf7" -> "#fcfaf7"
    // We want to match case insensitive, e.g. /-\[#fcfaf7\]/gi
    // But since JS regex doesn't support (?i:) inline like that in RegExp unless using 'i' flag
    const classRegex = new RegExp(`-\\[${hex}\\]`, 'gi');
    content = content.replace(classRegex, `-${colorMap[hex]}`);
  });

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
});
