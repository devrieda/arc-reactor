const History = require('./History');
const Keys = require("./Integration/Keys");

let _instance;

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
  // const keys = new KeyCommands();
  // keys.use(UnderlineHotkey, { after: 'bold-hotkey' });
  //
  use(keyObj, options) {
    const { before, after } = options || {};

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
    const keys = this.keys.slice(0); // copy keys
    this._executeKeys(keys, event, content, selection, callback);
  }

  // recursively execute each key after the previous finishes
  _executeKeys(keys, event, content, selection, callback) {
    const klass = keys.shift();
    const key = new klass(content, selection);

    // check if the event matches they key
    if (key.matches(event)) {
      const type = event.type === 'keyup' ? 'up' : 'down';
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
    let newKeys = [];
    this.keys.forEach( (key) => {
      const name = key.getName();
      if (name === before) { newKeys.push(keyObj); }
      newKeys.push(key);
      if (name === after) { newKeys.push(keyObj); }
    });
    this.keys = newKeys;
  }

  // Default key 
  _installDefaultKeys() {
    Keys.forEach( (key) => { this.use(key); });
  }
}

module.exports = KeyCommands;
