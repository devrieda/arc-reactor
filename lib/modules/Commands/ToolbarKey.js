var ContentManager = require('../ContentManager');

class ToolbarKey {
  constructor(content, selection) {
    this.content   = content;
    this.selection = selection;
    this.manager   = new ContentManager(this.content);
  }

  static getName() {
    return 'toolbar-key';
  }

  matches(event) {
    return false;
  }

  execute() {
    console.log('toolbar!')

    return {
      content: this.content,
      selection: this.selection
    };
  }
}

module.exports = ToolbarKey;
