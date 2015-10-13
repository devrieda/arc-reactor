const AppendBlock   = require('../Manipulation/AppendBlock');
const PrependBlock  = require('../Manipulation/PrependBlock');
const SplitBlock    = require('../Manipulation/SplitBlock');
const InsertImage   = require('../Manipulation/InsertImage');
const InsertYoutube = require('../Manipulation/InsertYoutube');
const InsertNewline = require('../Manipulation/InsertNewline');

const KEY_CODES = { 'return': 13, 'm': 77 };

class ReturnKey {
  constructor(content, selection) {
    this.content   = content;
    this.selection = selection;
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
    const guids = this.selection.guids();
    const offsets = this.selection.offsets();
    let results;

    // is this a photo/video link
    const node = document.getElementsByName(guids.anchor)[0];
    const text = node && node.textContent;
    const type = node.tagName.toLowerCase();

    // range
    if (this.selection.isRange()) {
      results = this._splitBlock().execute(guids, offsets);

    // photo
    } else if (text.match(/^http.+(gif|png|jpe?g)$/)) {
      const cb = (results) => { this._complete(results, callback, false); };
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

    this._complete(results, callback, true);
  }

  up(callback) {
    callback({ content: this.content });
  }

  _complete(results, callback, prevent) {
    const content = results ? results.content : this.content;
    const position = results ? results.position : null;

    callback({
      content: content,
      position: position,
      stopPropagation: true,
      preventDefault: prevent,
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

export default ReturnKey;
