const fs = require('fs');
const csv = require('csv');

module.exports = () => new Promise(resolve => {
  const cases = [];
  fs.createReadStream('../test-cases.csv')
    .pipe(csv.parse({columns: true}))
    .on('data', row => {
      cases.push(row);
    })
    .on('end', () => {
      resolve(cases);
    });
});
