var History = require('../History');

class BaseKey {
  constructor(content, selection) {
    this.content   = content;
    this.selection = selection;
  }

  matches(event) {
    return false;
  }

  down(callback) {
    callback(this.defaultResponse());
  }

  up(callback) {
    callback(this.defaultResponse());
  }

  defaultResponse() {
    return {
      content: this.content,
      selection: this.selection,
      stopPropagation: false,
      preventDefault: false,
      emit: false
    };
  }

  // add to the history stack
  saveHistory(content) {
    var position = this.selection.position();
    History.getInstance().push({ content: content, position: position });
  }

  // if we need to focus on the new block
  focusResults(results) {
    if (!results || !results.block) { return; }
    this.selection.focusOn(results.block.get('id'), results.offset);
  }
}

module.exports = BaseKey;
