var BaseKey = require('./BaseKey');

var ChangeText = require('../Manipulation/ChangeText');
var CombineBlocks = require('../Manipulation/CombineBlocks');

var KEY_CODES = {
  'shift': 16, 'ctrl': 17, 'alt': 18, 'meta': 91,
  'left': 37, 'up': 38, 'right': 39, 'down': 40
};

class OtherKey extends BaseKey {
  constructor(content, selection) {
    super(content, selection);
  }

  static getName() {
    return 'other-key';
  }

  // catch-all for all content keys
  matches(event) {
    var ignores = Object.keys(KEY_CODES).map(key => KEY_CODES[key]);
    return ignores.indexOf(event.keyCode) === -1;
  }

  down(callback) {
    var guids = this.selection.guids();
    var offsets = this.selection.offsets();
    var results;

    if (this.selection.crossBlock()) {
      results = this._combineBlocks().execute(guids, offsets);
    }
    this._complete(results, callback);
  }

  up(callback) {
    var guids = this.selection.guids();
    var offsets = this.selection.offsets();

    var node = document.getElementsByName(guids.anchor)[0];
    var text;
    if (node && node.getAttribute('data-figure')) {
      var caption = node.getElementsByTagName("figcaption")[0];
      text = caption.textContent;
    } else {
      text = node && node.textContent;
    }

    var results = this._changeText().execute(guids, offsets, { node: node, text: text });

    this._complete(results, callback);
  }

  _complete(results, callback) {
    var content = results ? results.content : this.content;
    var position = results ? results.position : null;
    this.saveHistory(content);

    callback({
      content: content,
      position: position,
      stopPropagation: false,
      preventDefault: false,
      emit: false
    });
  }

  _changeText() {
    return new ChangeText(this.content);
  }

  _combineBlocks() {
    return new CombineBlocks(this.content);
  }
}

module.exports = OtherKey;
