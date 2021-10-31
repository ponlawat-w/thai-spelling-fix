const fs = require('fs');
const csv = require('csv');

const getValidator = validationList => {
  return {
    _list: validationList.map(validation => ({...validation, regEx: new RegExp(validation.find, 'g')})),
    validate: function(text) {
      for (const validation of this._list) {
        if (validation.regEx.test(text)) {
          return false;
        }
      }
      return true;
    },
    fix: function(text) {
      for (const validation of this._list) {
        text = text.replace(validation.regEx, validation.replace);
      }
      return text;
    }
  };
};

module.exports = () => new Promise(resolve => {
  const validationList = [];
  fs.createReadStream('../validations.csv')
    .pipe(csv.parse({columns: true}))
    .on('data', row => {
      validationList.push(row);
    }).on('end', () => {
      resolve(getValidator(validationList));
    });
});
