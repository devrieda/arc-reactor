import ToggleBlockType from '../../helpers/Manipulation/ToggleBlockType';

const KEY_CODES = { 'bspace': 8 };

class BspaceKey {
  constructor(content, selection) {
    this.content   = content;
    this.selection = selection;
  }

  static getName() {
    return 'list-bspace';
  }

  // return or ctrl+m
  matches(event) {
    return event.keyCode === KEY_CODES.bspace;
  }

  down(callback) {
    const guids = this.selection.guids();
    const offsets = this.selection.offsets();
    let results;

    // is this a list item
    const node = document.getElementsByName(guids.anchor)[0];
    const type = node.tagName.toLowerCase();

    // beginning of a list item converts to a paragraph
    if (this.selection.begOfBlock() && type === 'li') {
      const command = new ToggleBlockType(this.content);
      const results = command.execute(guids, offsets, { type: 'li' });
      callback({
        content: results.content,
        position: results.position,
        stopPropagation: true,
        preventDefault: true,
        emit: true
      });

    } else {
      callback({ content: this.content });
    }
  }

  up(callback) {
    callback({ content: this.content });
  }
}

export default BspaceKey;
