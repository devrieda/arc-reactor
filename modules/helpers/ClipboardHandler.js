class ClipboardHandler {
  constructor(content, selection) {
    this.content   = content;
    this.selection = selection;
  }

  paste(e) {
    let text;
    if (e.clipboardData) {
      text = event.clipboardData.getData('text/plain');

    // ie
    } else if (window.clipboardData) {
      text = window.clipboardData.getData("Text");
    }

    if (text.match("\n")) {
      e.preventDefault();
      console.log('pasting with newlines totes breaks things...');
    }
    return;

    // TODO - hook up multiline paste
    // this.elt   = e.target;
    // this.saved = this.elt.innerHTML;

    // // webkit
    // let pasted;
    // if (e && e.clipboardData && e.clipboardData.getData) {
    //   pasted = this._handleWebkitPaste(e);

    // // others
    // } else {
    //   this.elt.innerHTML = '';
    //   pasted = this._waitForPaste(e);
    // }

    // // TODO - format content with pasted data
    // console.log('paste', pasted);
    // e.preventDefault();
    // e.stopPropagation();
  }

  _handleWebkitPaste(e) {
    e.preventDefault();
    e.stopPropagation();

    let data;
    if (/text\/html/.test(e.clipboardData.types)) {
      data = e.clipboardData.getData('text/html');
    } else if (/text\/plain/.test(e.clipboardData.types)) {
      data = e.clipboardData.getData('text/plain');
    } else {
      data = "";
    }
    return data;
  }

  _waitForPaste() {
    if (this.elt.childNodes && this.elt.childNodes.length > 0) {
      const pasted = this.elt.innerHTML;
      this.elt.innerHTML = this.saved;
      return pasted;
    } else {
      setTimeout(this._waitForPaste.bind(this), 20);
    }
  }
} 

export default ClipboardHandler;
