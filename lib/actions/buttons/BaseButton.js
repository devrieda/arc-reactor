var ContentState = require('../../state/ContentState');
var SelectionState = require('../../state/SelectionState');

var buttons = {
  H1Button:     require('./H1Button'),
  H2Button:     require('./H2Button'),
  H3Button:     require('./H3Button'),
  QuoteButton:  require('./QuoteButton'),
  CenterButton: require('./CenterButton'),
  BoldButton:   require('./BoldButton'),
  ItalicButton: require('./ItalicButton'),
  LinkButton:   require('./LinkButton')
}

class BaseButton {
  constructor() {
    this.content   = ContentState.get();
    this.selection = SelectionState.get();

    // observe state changes
    ContentState.register( (state) => { this.content = state.content; });
    SelectionState.register( (state) => { this.selection = state.selection; });
  }

  press(type, value) {
    new buttons[type+ 'Button'](this.content, this.selection).press(value);
  }

  static types() {
    return [
      {type: 'strong',     action: 'Bold',   icon: 'fa-bold',         text: 'Bold'},
      {type: 'em',         action: 'Italic', icon: 'fa-italic',       text: 'Italic'},
      {type: 'h2',         action: 'H1',     icon: null,              text: 'H1'},
      {type: 'h3',         action: 'H2',     icon: null,              text: 'H2'},
      {type: 'h4',         action: 'H3',     icon: null,              text: 'H3'},
      {type: 'center',     action: 'Center', icon: 'fa-align-center', text: 'Center'},
      {type: 'blockquote', action: 'Quote',  icon: 'fa-quote-left',   text: 'Quote'},
      {type: 'a',          action: 'Link',   icon: 'fa-link',         text: 'Link'}
    ]
  }
}

module.exports = BaseButton;
