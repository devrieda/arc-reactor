var Immutable  = require('immutable');

var ReturnKey  = require('./Commands/ReturnKey');
var DeleteKey  = require('./Commands/DeleteKey');
var BspaceKey  = require('./Commands/BspaceKey');
var BoldKey    = require('./Commands/BoldKey');
var ItalicKey  = require('./Commands/ItalicKey');
var CenterKey  = require('./Commands/CenterKey');
var UndoKey    = require('./Commands/UndoKey');
var RedoKey    = require('./Commands/RedoKey');
var ToolbarKey = require('./Commands/ToolbarKey');

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
  execute(event, content, selection) {
    for (var i = 0, j = this.commands.length; i < j; i++) {
      var command = new this.commands[i](content, selection);

      if (command.matches(event)) {
        var result = command.execute();
        content   = result.content;
        selection = result.selection;

        if (result.preventDefault) {
          event.preventDefault();
        }

        // return the result if we want to stop propogation
        if (result.stopPropogation) {
          return {
            content: content,
            selection: result.selection,
            emit: result.emit
          };
        }
      }
    }

    return { content: content, selection: selection, emit: false };
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
    this.use(RedoKey);
    this.use(UndoKey);
    this.use(ToolbarKey);
  }
}

module.exports = Commands;
