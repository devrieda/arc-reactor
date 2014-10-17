var mixInto = require('react/lib/mixInto');

var CODES = {
  'b': 66,      // meta+b  = bold
  'i': 73,      // meta+i  = italic 
  'u': 85,      // meta+u  = underline
  'e': 69,      // meta+e  = center
  'm': 77,      // ctrl+m  = enter
  'f10': 121,   // alt+f10 = toolbar 
  'meta': 91,   // meta 
  'return': 13, // return 
  'delete': 8,  // delete
  'bspace': 46  // backspace 
}

var KeyIntent = function(e) {
  this.intent = null;

  this.checkMarkupHotkey(e);
  this.checkAltHotkey(e);
  this.checkReturn(e);
  this.checkDelete(e);
}

mixInto(KeyIntent, {
  // determine intent
  checkMarkupHotkey: function(e) {
    if (!e.metaKey && !e.ctrlKey) { return; }

    if (e.keyCode == CODES['b']) {
      this.intent = 'boldText';

    } else if (e.keyCode == CODES['i']) {
      this.intent = 'italicText';

    } else if (e.keyCode == CODES['u']) {
      this.intent = 'underlineText';

    } else if (e.keyCode == CODES['e']) {
      this.intent = 'centerText';
    }
  },

  checkAltHotkey: function(e) {
    if (!this.altKey) { return; }

    if (e.keyCode == CODES['f10']) {
      this.intent = 'focusToolbar';
    }
  },
  checkReturn: function(e) {
    if (e.keyCode == CODES['return'] || (e.keyCode == CODES['m'] && e.ctrlKey)) {
      this.intent = 'pressReturn';
    }
  },
  checkDelete: function(e) {
    if (e.keyCode == CODES['delete'] || e.keyCode == CODES['bspace']) {
      this.intent = 'pressDelete';
    }
  },

  // check intent
  getIntent: function() {
    return this.intent;
  }
});

module.exports = KeyIntent;
