var Immutable  = require('immutable');

var ReturnKey  = require('./Commands/ReturnKey');
var DeleteKey  = require('./Commands/DeleteKey');
var BspaceKey  = require('./Commands/BspaceKey');
var BoldKey    = require('./Commands/BoldKey');
var ItalicKey  = require('./Commands/ItalicKey');
var CenterKey  = require('./Commands/CenterKey');
var H1Key      = require('./Commands/H1Key');
var H2Key      = require('./Commands/H2Key');
var H3Key      = require('./Commands/H3Key');
var QuoteKey   = require('./Commands/QuoteKey');
var CodeKey    = require('./Commands/CodeKey');
var UndoKey    = require('./Commands/UndoKey');
var RedoKey    = require('./Commands/RedoKey');

var _instance;

// commands are and processed top down
class Commands {
  constructor() {
    this.commands = [];
    this._installDefaultCommands();
  }

  // instance for getting access to singleton of commands
  static getInstance() {
    if (!_instance) {
      _instance = new Commands();
    }
    return _instance;
  }

  // register a new command
  //
  // var commands = new Commands();
  // commands.use(UnderlineHotkey, { after: 'bold-hotkey' });
  //
  use(commandObj, options) {
    var { before, after } = options || {};

    // insert the command in the stack
    if (before || after) {
      this._insertCommand(commandObj, before, after);

    // add to the end of the stack
    } else {
      this.commands.push(commandObj);
    }
  }

  // execute only the first command that matches
  //
  // returns { content: "{}", selection: Selection, passThru: false }
  //
  execute(event, content, selection, callback) {
    var commands = this.commands.slice(0); // copy commands
    this._executeCommands(commands, event, content, selection, callback);
  }

  // recursively execute each command after the previous finishes
  _executeCommands(commands, event, content, selection, callback) {
    var klass = commands.shift();
    var command = new klass(content, selection)

    if (command.matches(event)) {
      command.execute( (result) => {
        content   = result.content;
        selection = result.selection;

        // prevent event
        if (result.preventDefault) { event.preventDefault(); }

        // stop stack here
        if (result.stopPropagation || commands.length === 0) {
          callback(result);

        // next in the stack
        } else {
          this._executeCommands(commands, event, content, selection, callback);
        }
      });

    } else if (commands.length > 0) {
      this._executeCommands(commands, event, content, selection, callback);
    }
  }

  getCommands() {
    return this.commands;
  }

  _insertCommand(commandObj, before, after) {
    var newCommands = [];
    this.commands.forEach( (command) => {
      var name = command.getName();
      if (name === before) { newCommands.push(commandObj); }
      newCommands.push(command);
      if (name === after) { newCommands.push(commandObj); }
    });
    this.commands = newCommands;
  }

  // Default key 
  _installDefaultCommands() {
    this.use(ReturnKey);
    this.use(BspaceKey);
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
  }
}

module.exports = Commands;
