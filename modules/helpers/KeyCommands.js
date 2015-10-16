import History from './History';
import KeyConfig from "./Config/KeyConfig";

// key commands stack is fifo
const KeyCommands = {
  // execute only the first key that matches
  //
  // returns { content: "{}", selection: Selection, passThru: false }
  //
  execute(event, content, selection, callback) {
    // find keys from config
    const keys = KeyConfig.getItems().slice(0);
    const matching = keys.filter((k) => k.matches(event));
    if (matching.length) {
      this._executeKeys(matching, event, content, selection, callback);
    }
  },

  // recursively execute each key after the previous finishes
  _executeKeys(keys, event, content, selection, callback) {
    const klass = keys.shift();
    const key = new klass(content, selection);
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
  },

  // save history for everything except undo/redo
  _saveHistory(results, selection) {
    if (results.skipHistory) { return; }

    History.getInstance().push({
      content: results.content,
      position: selection.position()
    });
  }
}

export default KeyCommands;
