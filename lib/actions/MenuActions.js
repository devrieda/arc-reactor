var ContentState = require('../state/ContentState');
var SelectionState = require('../state/SelectionState');

var buttons = {
  H1Button:     require('./buttons/H1Button'),
  H2Button:     require('./buttons/H2Button'),
  H3Button:     require('./buttons/H3Button'),
  QuoteButton:  require('./buttons/QuoteButton'),
  CenterButton: require('./buttons/CenterButton'),
  BoldButton:   require('./buttons/BoldButton'),
  ItalicButton: require('./buttons/ItalicButton'),
  LinkButton:   require('./buttons/LinkButton')
}

class MenuActions {
  constructor() {
    this.content   = ContentState.get();
    this.selection = SelectionState.get();

    // observe state changes
    ContentState.register( (state) => { this.content = state.content; });
    SelectionState.register( (state) => { this.selection = state.selection; });
  }

  pressButton(button) {
    new buttons[button + 'Button'](this.content, this.selection).press();
  }
}

module.exports = MenuActions;
