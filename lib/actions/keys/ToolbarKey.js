var BaseKey = require('./BaseKey');

class ToolbarKey extends BaseKey {
  press() {
    console.log('toolbar!')
  }
}

module.exports = ReturnKey;

