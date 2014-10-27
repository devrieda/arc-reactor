var CODES = {
  'b': 66,      // meta+b  = bold
  'i': 73,      // meta+i  = italic 
  'u': 85,      // meta+u  = underline
  'e': 69,      // meta+e  = center
  'm': 77,      // ctrl+m  = enter
  'f10': 121,   // alt+f10 = toolbar 
  'meta': 91,   // meta 
  'return': 13, // return 
  'bspace': 8,  // bspace
  'delete': 46  // delete
}

class KeyIntent {
  constructor(e) {
    this.keyCode = e.keyCode;
    this.metaKey = e.metaKey;
    this.ctrlKey = e.ctrlKey;
    this.altKey  = e.altKey;

    this.intent = null;
  }

  // determine intent
  checkMarkupHotkey() {
    if (!this.metaKey && !this.ctrlKey) { return; }

    if (this.keyCode == CODES['b']) {
      this.intent = 'pressBold';

    } else if (this.keyCode == CODES['i']) {
      this.intent = 'pressItalic';

    } else if (this.keyCode == CODES['e']) {
      this.intent = 'pressCenter';
    }
  }

  checkAltHotkey() {
    if (!this.altKey) { return; }

    if (this.keyCode == CODES['f10']) {
      this.intent = 'focusToolbar';
    }
  }
  checkReturn() {
    if (this.keyCode == CODES['return'] || (this.keyCode == CODES['m'] && this.ctrlKey)) {
      this.intent = 'pressReturn';
    }
  }

  checkDelete() {
    if (this.keyCode == CODES['delete']) {
      this.intent = 'pressDelete';
    }
  }

  checkBspace() {
    if (this.keyCode == CODES['bspace']) {
      this.intent = 'pressBspace';
    }
  }

  // check intent
  getIntent() {
    this.checkMarkupHotkey();
    this.checkAltHotkey();

    this.checkReturn();
    this.checkDelete();
    this.checkBspace();

    return this.intent;
  }
}

module.exports = KeyIntent;
