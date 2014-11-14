var BaseKey = require('./BaseKey');

class OtherKey extends BaseKey {
  press() {
    var guid = this.selection.anchor.guid;

    // find anchor block node by guid
    var klass = `ic-Editor-Block--${guid}`
    var text = document.getElementsByClassName(klass)[0].textContent;

    var block = this.findBlock(guid);
    block.text = text;
  }
}

module.exports = OtherKey;
