var ContentManager = require('../ContentManager');

class CenterKey {
  constructor(content, selection) {
    this.content   = content;
    this.selection = selection;
    this.manager   = new ContentManager(this.content);
  }

  static getName() {
    return 'center-key';
  }

  matches(event) {
    return false;
  }

  execute() {
    var guids   = this.selection.guids();
    var offsets = this.selection.offsets();
    this.manager.toggleCenter(guids, offsets);

    return {
      content: this.content,
      selection: this.selection
    };
  }
}

module.exports = CenterKey;
