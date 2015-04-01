var ContentManager = require('../ContentManager');

class BoldKey {
  constructor(content, selection) {
    this.content   = content;
    this.selection = selection;
    this.manager   = new ContentManager(this.content);
  }

  static getName() {
    return 'bold-key';
  }

  matches(event) {
    return false;
  }

  execute() {
    var guids   = this.selection.guids();
    var offsets = this.selection.offsets();

    this.manager.toggleMarkup(guids, offsets, 'strong');

    return {
      content: this.content,
      selection: this.selection
    };
  }
}

module.exports = BoldKey;
