var ContentManager = require('../ContentManager');

var KEY_CODES = { 'f10': 121 };

// Key to focus the toolbar for accessibility purposes
class ToolbarKey {
  constructor(content, selection) {
    this.content   = content;
    this.selection = selection;
    this.manager   = new ContentManager(this.content);
  }

  static getName() {
    return 'toolbar-key';
  }

  // alt+f10
  matches(event) {
    return event.altKey && event.keyCode === KEY_CODES['f10'];
  }

  execute() {
    // TODO - actually show/focus on the toolbar
    console.log('toolbar!')

    return {
      content: this.content,
      selection: this.selection
    };
  }
}

module.exports = ToolbarKey;
