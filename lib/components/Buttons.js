require('../stylesheets/Button.scss');

var Buttons = {
  Bold:   require('./buttons/BoldButton'),
  Italic: require('./buttons/ItalicButton'),
  H1:     require('./buttons/H1Button'),
  H2:     require('./buttons/H2Button'),
  H3:     require('./buttons/H3Button'),
  Center: require('./buttons/CenterButton'),
  Quote:  require('./buttons/QuoteButton'),
  Link:   require('./buttons/LinkButton')
};
module.exports = Buttons;
