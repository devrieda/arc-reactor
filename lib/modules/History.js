var _instance;

class History {
  constructor() {
    this._history = [];
    this._position = 0;
  }

  // instance for getting access to singleton of commands
  static getInstance() {
    if (!_instance) {
      _instance = new History();
    }
    return _instance;
  }

  /**
   * Return the current history state
   */
  current() {
    return this._history[this._position];
  }

  /**
   * Push a modified map onto the stack
   */
  push(map) {
    // make sure to overwrite if we've done an undo
    while (this._history.length > this._position + 1) {
      this._history.pop();
    }

    this._history.push(map);
    this._position = this._history.length - 1;

    return this.current();
  }

  /**
   * Decrement the cursor in the state
   */
  undo() {
    if (this._stepExists(this._position - 1)) { this._position--; }
    return this.current();
  }

  /**
   * Increment the cursor in the stack
   */
  redo() {
    if (this._stepExists(this._position + 1)) { this._position++; }
    return this.current();
  }

  _stepExists(pos) {
    return !!this._history[pos];
  }
} 

module.exports = History;
