class BaseButton {
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
