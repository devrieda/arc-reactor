import InsertSection from './lib/InsertSection';

const KEY_CODES = { 'return': 13 };

class SectionKey {
  constructor(content, selection) {
    this.content   = content;
    this.selection = selection;
  }

  static getName() {
    return 'section-return';
  }

  // meta+return
  static matches(event) {
    if (!event.metaKey && !event.ctrlKey) { return false; }

    return event.keyCode === KEY_CODES.return
  }

  down(callback) {
    const guids   = this.selection.guids();
    const offsets = this.selection.offsets();

    const command = new InsertSection(this.content);
    const results = command.execute(guids, offsets);

    callback({
      content: results.content,
      position: null,
      stopPropagation: true,
      preventDefault: true,
      emit: true
    });
  }

  up(callback) {
    callback({ content: this.content });
  }
}

export default SectionKey;
