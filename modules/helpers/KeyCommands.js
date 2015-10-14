import History from './History';
import KeyConfig from "./Config/KeyConfig";

// key commands stack is fifo
class KeyCommands {
  // execute only the first key that matches
  //
  // returns { content: "{}", selection: Selection, passThru: false }
  //
  execute(event, content, selection, callback) {
    // find keys from config
    const keys = KeyConfig.getItems();
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
}

export default KeyCommands;
