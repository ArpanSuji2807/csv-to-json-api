const parseCSV = require('../utils/csvParser');
const unflatten = require('../utils/flatten');
const db = require('../config/db');
const path = require('path');
require('dotenv').config();

async function uploadData(req, res) {
  try {
    console.log('inside upload')
    const filePath = path.resolve(process.env.CSV_FILE_PATH);
    const rows = parseCSV(filePath);

    const ageGroups = { '<20': 0, '20-40': 0, '40-60': 0, '>60': 0 };

    for (const row of rows) {
      const flatJson = row;
      const nested = unflatten(flatJson);

      const name = `${nested.name.firstName} ${nested.name.lastName}`;
      const age = parseInt(nested.age);
      const address = nested.address || null;

      // Remove known fields
      delete nested.name;
      delete nested.age;
      delete nested.address;

      const additional_info = Object.keys(nested).length > 0 ? nested : null;

      if (age < 20) ageGroups['<20']++;
      else if (age <= 40) ageGroups['20-40']++;
      else if (age <= 60) ageGroups['40-60']++;
      else ageGroups['>60']++;

      await db.query(
        'INSERT INTO users (name, age, address, additional_info) VALUES ($1, $2, $3, $4)',
        [name, age, address, additional_info]
      );
    }

    const total = rows.length;
    console.log('Age-Group % Distribution');
    for (const [group, count] of Object.entries(ageGroups)) {
      console.log(`${group}: ${((count / total) * 100).toFixed(2)}%`);
    }

    res.status(200).json({ message: 'CSV processed successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
}

module.exports = uploadData;