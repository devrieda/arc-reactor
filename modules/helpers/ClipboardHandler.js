import BaseParser from './Parsers/BaseParser';
import History from './History';
import InsertBlocks from './Manipulation/InsertBlocks';

const ClipboardHandler = {

  // create hidden div to capture the paste in IE
  beforePaste(selection) {
    this.position = selection.position();

    this.bin = document.createElement('div');
    this.bin.className = "pasted-content";
    this.bin.setAttribute('contenteditable', true);
    document.body.appendChild(this.bin);
    this.bin.focus();
  },

  paste(e, content, selection, callback) {
    if (e.clipboardData && e.clipboardData.types) {
      const pasted = this._handlePaste(e);
      e.preventDefault();
      e.stopPropagation();
      this._parseResult(pasted, content, selection, callback);

    // Wait for the paste to happen (next loop?)
    } else if (this.bin) {
      setTimeout(() => {
        const pasted = this.bin.innerHTML;
        this.bin.parentNode.removeChild(this.bin);
        this._parseResult(pasted, content, selection, callback);
      }, 1);
    }
  },

  getBin() {
    return this.bin;
  },

  _parseResult(pasted, content, selection, callback) {
    // clipboard parser works async
    BaseParser.parse(pasted, (blocks) => {
      const guids = selection.guids();
      const offsets = selection.offsets();

      const command = new InsertBlocks(content);
      const results = command.execute(guids, offsets, { blocks: blocks });

      // save history
      History.getInstance().push({
        content: results.content,
        position: results.position
      });

      callback({
        content: results.content,
        position: results.position,
        emit: true
      });
    });
  },

  _handlePaste(e) {
    let pasted;
    if (e.clipboardData.types.contains) {
      pasted = this._handleFirefoxPaste(e);
    } else {
      pasted = this._handleWebkitPaste(e);
    }
    return pasted;
  },

  _handleFirefoxPaste(e) {
    let data = "";
    if (e.clipboardData.types.contains('text/html')) {
      data = e.clipboardData.getData('text/html');
    } else {
      data = e.clipboardData.getData('text/plain');
    }
    return data;
  },

  _handleWebkitPaste(e) {
    let data = "";
    if (/text\/html/.test(e.clipboardData.types)) {
      data = e.clipboardData.getData('text/html');
    } else {
      data = e.clipboardData.getData('text/plain');
    }
    return data;
  }
} 

export default ClipboardHandler;
