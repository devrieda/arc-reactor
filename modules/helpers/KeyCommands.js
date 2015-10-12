var History    = require('./History');
var ReturnKey  = require('./Keys/ReturnKey');
var DeleteKey  = require('./Keys/DeleteKey');
var BspaceKey  = require('./Keys/BspaceKey');
var DownKey    = require('./Keys/DownKey');
var UpKey      = require('./Keys/UpKey');
var BoldKey    = require('./Keys/BoldKey');
var ItalicKey  = require('./Keys/ItalicKey');
var CenterKey  = require('./Keys/CenterKey');
var H1Key      = require('./Keys/H1Key');
var H2Key      = require('./Keys/H2Key');
var H3Key      = require('./Keys/H3Key');
var QuoteKey   = require('./Keys/QuoteKey');
var CodeKey    = require('./Keys/CodeKey');
var UndoKey    = require('./Keys/UndoKey');
var RedoKey    = require('./Keys/RedoKey');
var OtherKey   = require('./Keys/OtherKey');

var _instance;

// key commands stack is fifo
class KeyCommands {
  constructor() {
    this.keys = [];
    this._installDefaultKeys();
  }

  // instance for getting access to singleton of commands
  static getInstance() {
    if (!_instance) {
      _instance = new KeyCommands();
    }
    return _instance;
  }

  // register a new key
  //
  // var keys = new KeyCommands();
  // keys.use(UnderlineHotkey, { after: 'bold-hotkey' });
  //
  use(keyObj, options) {
    var { before, after } = options || {};

    // insert the key in the stack
    if (before || after) {
      this._insertKey(keyObj, before, after);

    // add to the end of the stack
    } else {
      this.keys.push(keyObj);
    }
  }

  // execute only the first key that matches
  //
  // returns { content: "{}", selection: Selection, passThru: false }
  //
  execute(event, content, selection, callback) {
    var keys = this.keys.slice(0); // copy keys
    this._executeKeys(keys, event, content, selection, callback);
  }

  // recursively execute each key after the previous finishes
  _executeKeys(keys, event, content, selection, callback) {
    var klass = keys.shift();
    var key = new klass(content, selection);

    // check if the event matches they key
    if (key.matches(event)) {
      var type = event.type === 'keyup' ? 'up' : 'down';
      key[type]( (results) => {
        content = results.content;

        // prevent event
        if (results.preventDefault) { event.preventDefault(); }

        // stop stack here
        if (results.stopPropagation || keys.length === 0) {
          callback(results);
          this._saveHistory(results, selection);

        // next in the stack
        } else {
          this._executeKeys(keys, event, content, selection, callback);
        }
      });

    // check next key in the stack
    } else if (keys.length > 0) {
      this._executeKeys(keys, event, content, selection, callback);
    }
  }

  getKeys() {
    return this.keys;
  }

  // save history for everything except undo/redo
  _saveHistory(results, selection) {
    if (results.skipHistory) { return; }

    History.getInstance().push({
      content: results.content,
      position: selection.position()
    });
  }

  _insertKey(keyObj, before, after) {
    var newKeys = [];
    this.keys.forEach( (key) => {
      var name = key.getName();
      if (name === before) { newKeys.push(keyObj); }
      newKeys.push(key);
      if (name === after) { newKeys.push(keyObj); }
    });
    this.keys = newKeys;
  }

  // Default key 
  _installDefaultKeys() {
    this.use(ReturnKey);
    this.use(BspaceKey);
    this.use(DownKey);
    this.use(UpKey);
    this.use(DeleteKey);
    this.use(BoldKey);
    this.use(ItalicKey);
    this.use(CenterKey);
    this.use(H1Key);
    this.use(H2Key);
    this.use(H3Key);
    this.use(QuoteKey);
    this.use(CodeKey);
    this.use(RedoKey);
    this.use(UndoKey);
    this.use(OtherKey);
  }
}

module.exports = KeyCommands;
