var Guid = require('../modules/Guid');

var ContentState = require('../state/ContentState');
var SelectionState = require('../state/SelectionState');

var Header1Button = require('./buttons/Header1Button');
var Header2Button = require('./buttons/Header2Button');
var Header3Button = require('./buttons/Header3Button');
var QuoteButton = require('./buttons/QuoteButton');
var CenterButton = require('./buttons/CenterButton');

var BoldButton = require('./buttons/BoldButton');
var ItalicButton = require('./buttons/ItalicButton');
var LinkButton = require('./buttons/LinkButton');

class MenuActions {
  constructor() {
    this.content   = ContentState.get();
    this.selection = SelectionState.get();

    // observe state changes
    ContentState.register( (state) => { this.content = state.content; });
    SelectionState.register( (state) => { this.selection = state.selection; });
  }

  pressButton(button, active) {
    this[`press${button}`](active)
  }

  // block changes
  pressH1(active) {
    var button = new Header1Button(this.content, this.selection);
    return button.press(active);
  }
  pressH2(active) {
    var button = new Header2Button(this.content, this.selection);
    return button.press(active);
  }
  pressH3(active) {
    var button = new Header3Button(this.content, this.selection);
    return button.press(active);
  }
  pressQuote(active) {
    var button = new QuoteButton(this.content, this.selection);
    return button.press(active);
  }
  pressCenter(active) {
    var button = new CenterButton(this.content, this.selection);
    return button.press(active);
  }

  // inline changes
  pressBold(active) {
    var button = new BoldButton(this.content, this.selection);
    return button.press(active);
  }
  pressItalic(active) {
    var button = new ItalicButton(this.content, this.selection);
    return button.press(active);
  }
  pressLink(active, value) {
    var button = new LinkButton(this.content, this.selection);
    return button.press(active, value);
  }
}

module.exports = MenuActions;
