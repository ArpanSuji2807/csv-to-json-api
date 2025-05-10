const fs = require('fs');

function parseCSV(filePath) {
  const data = fs.readFileSync(filePath, 'utf8').trim().split('\n');
  const headers = data[0].split(',').map(h => h.trim());
  return data.slice(1).map(line => {
    const values = line.split(',').map(v => v.trim());
    const rowObj = {};
    headers.forEach((header, idx) => {
      rowObj[header] = values[idx];
    });
    return rowObj;
  });
}

module.exports = parseCSV;