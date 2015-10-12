var History = require('../History');

class BaseKey {
  constructor(content, selection) {
    this.content   = content;
    this.selection = selection;
  }

  matches() {
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
      position: null,
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
}

module.exports = BaseKey;
