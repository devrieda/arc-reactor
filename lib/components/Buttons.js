require('../stylesheets/Button.scss');

var Buttons = {
  Bold:   require('./menu-buttons/BoldButton'),
  Italic: require('./menu-buttons/ItalicButton'),
  H1:     require('./menu-buttons/H1Button'),
  H2:     require('./menu-buttons/H2Button'),
  H3:     require('./menu-buttons/H3Button'),
  Center: require('./menu-buttons/CenterButton'),
  Quote:  require('./menu-buttons/QuoteButton'),
  Link:   require('./menu-buttons/LinkButton')
};
module.exports = Buttons;
