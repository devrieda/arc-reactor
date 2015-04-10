var History = require('../History');

var CombineBlocks    = require('../Manipulation/CombineBlocks');
var CombineBlockNext = require('../Manipulation/CombineBlockNext');

var KEY_CODES = { 'delete': 46 };

class DeleteKey {
  constructor(content, selection) {
    this.content   = content;
    this.selection = selection;
  }

  static getName() {
    return 'delete-key';
  }

  matches(event) {
    return event.keyCode === KEY_CODES.delete;
  }

  execute(callback) {
    var guids = this.selection.guids();
    var offsets = this.selection.offsets();
    var results;

    if (window.DEBUG) { console.log('delete', guids, offsets); }

    if (this.selection.crossBlock()) {
      results = this._combineBlocks().execute(guids, offsets);

    } else if (this.selection.endOfBlock()) {
      results = this._combineBlockNext().execute(guids);
    }

    this._complete(results, callback);
  }

  _complete(results, callback) {
    var prevent;

    // if we need to focus on the new block
    if (results && results.block) {
      this.selection.focusOn(results.block.get('id'), results.offset);
      prevent = true;
    }

    var content = results ? results.content : this.content;
    this._saveHistory(content);

    callback({
      content: content,
      selection: this.selection,
      stopPropagation: true,
      preventDefault: prevent,
      emit: true
    });
  }

  _saveHistory(content) {
    var position = this.selection.position();
    History.getInstance().push({ content: content, position: position });
  }

  _combineBlocks() {
    return new CombineBlocks(this.content);
  }

  _combineBlockNext() {
    return new CombineBlockNext(this.content);
  }
}

module.exports = DeleteKey;
