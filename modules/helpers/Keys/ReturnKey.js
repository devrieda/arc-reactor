var BaseKey = require('./BaseKey');

var AppendBlock   = require('../Manipulation/AppendBlock');
var PrependBlock  = require('../Manipulation/PrependBlock');
var SplitBlock    = require('../Manipulation/SplitBlock');
var InsertImage   = require('../Manipulation/InsertImage');
var InsertYoutube = require('../Manipulation/InsertYoutube');
var InsertNewline = require('../Manipulation/InsertNewline');

var KEY_CODES = { 'return': 13, 'm': 77 };

class ReturnKey extends BaseKey {
  constructor(content, selection) {
    super(content, selection);
  }

  static getName() {
    return 'return-key';
  }

  // return or ctrl+m
  matches(event) {
    return event.keyCode === KEY_CODES.return ||
      (event.keyCode === KEY_CODES.m && event.ctrlKey);
  }

  down(callback) {
    var guids = this.selection.guids();
    var offsets = this.selection.offsets();
    var results;

    // is this a photo/video link
    var node = document.getElementsByName(guids.anchor)[0];
    var text = node && node.textContent;
    var type = node.tagName.toLowerCase();

    // range
    if (this.selection.isRange()) {
      results = this._splitBlock().execute(guids, offsets);

    // photo
    } else if (text.match(/^http.+(gif|png|jpe?g)$/)) {
      var cb = (results) => { this._asyncComplete(results, callback); };
      results = this._insertImage().execute(guids, offsets, { src: text }, cb);

    // video
    } else if (text.match(/^http.+youtu.+$/)) {
      results = this._insertYoutube().execute(guids, offsets, { src: text });

    // code
    } else if (type === 'pre') {
      results = this._insertNewline().execute(guids, offsets);

    // caret
    } else if (this.selection.endOfBlock()) {
      results = this._appendBlock().execute(guids);

    // enter at beginning of block
    } else if (this.selection.begOfBlock()) {
      results = this._prependBlock().execute(guids);

    // split current two
    } else {
      results = this._splitBlock().execute(guids, offsets);
    }

    this._complete(results, callback);
  }

  _complete(results, callback) {
    this.focusResults(results);

    var content = results ? results.content : this.content;
    this.saveHistory(content);

    callback({
      content: content,
      selection: this.selection,
      stopPropagation: true,
      preventDefault: true,
      emit: true
    });
  }

  _asyncComplete(results, callback) {
    this.saveHistory(results.content);

    callback({
      content: results.content,
      selection: this.selection,
      preventDefault: false,
      stopPropagation: true,
      emit: true
    });
  }

  _splitBlock() {
    return new SplitBlock(this.content);
  }

  _appendBlock() {
    return new AppendBlock(this.content);
  }

  _prependBlock() {
    return new PrependBlock(this.content);
  }

  _insertImage() {
    return new InsertImage(this.content);
  }

  _insertYoutube() {
    return new InsertYoutube(this.content);
  }

  _insertNewline() {
    return new InsertNewline(this.content);
  }
}

module.exports = ReturnKey;