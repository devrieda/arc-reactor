import ChangeText from '../Manipulation/ChangeText';
import CombineBlocks from '../Manipulation/CombineBlocks';

const KEY_CODES = {
  'shift': 16, 'ctrl': 17, 'alt': 18, 'meta': 91,
  'left': 37, 'up': 38, 'right': 39, 'down': 40
};

class OtherKey {
  constructor(content, selection) {
    this.content   = content;
    this.selection = selection;
  }

  static getName() {
    return 'other';
  }

  // catch-all for all content keys
  static matches(event) {
    const ignores = Object.keys(KEY_CODES).map(key => KEY_CODES[key]);
    return ignores.indexOf(event.keyCode) === -1;
  }

  down(callback) {
    const guids = this.selection.guids();
    const offsets = this.selection.offsets();
    let results;

    if (this.selection.crossBlock()) {
      results = this._combineBlocks().execute(guids, offsets);
    }
    this._complete(results, callback);
  }

  up(callback) {
    const guids = this.selection.guids();
    const offsets = this.selection.offsets();

    const node = document.getElementsByName(guids.anchor)[0];
    let text;
    if (false && node && node.getAttribute('data-figure')) {
      const caption = node.getElementsByTagName("figcaption")[0];
      text = caption.textContent;
    } else {
      text = node && node.textContent;
    }

    const results = this._changeText().execute(guids, offsets, { node: node, text: text });

    this._complete(results, callback);
  }

  _complete(results, callback) {
    const content = results ? results.content : this.content;
    const position = results ? results.position : null;

    callback({
      content: content,
      position: position,
      stopPropagation: false,
      preventDefault: false,
      emit: false
    });
  }

  _changeText() {
    return new ChangeText(this.content);
  }

  _combineBlocks() {
    return new CombineBlocks(this.content);
  }
}

export default OtherKey;
