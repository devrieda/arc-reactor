var ReturnKey  = require('./Commands/ReturnKey');
var DeleteKey  = require('./Commands/DeleteKey');
var BspaceKey  = require('./Commands/BspaceKey');
var BoldKey    = require('./Commands/BoldKey');
var ItalicKey  = require('./Commands/ItalicKey');
var CenterKey  = require('./Commands/CenterKey');
var ToolbarKey = require('./Commands/ToolbarKey');
var OtherKey   = require('./Commands/OtherKey');

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
  execute(event) {
    for (var i = 0, j = this.commands.length; i < j; i++) {
      var command = new this.commands[i](this.content, this.selection);
      if (command.matches(event)) {
        var result = command.execute();
        return {
          content: result.content,
          selection: result.selection
        };
      }
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
    this.use(ToolbarKey);
    this.use(OtherKey);
  }
}

module.exports = Commands;