// SUPER-HACK - just regexp in the markup. This will fail as soon as there
// is a string with multiple of the same word marked up
//
// <a href="#">
// <strong>
//   <em>Something</em>
// </strong>
// </a>
class Formatter {
  constructor(text) {
    this.text = text;
  }

  applyMarkup(markups) {
    if (Object.keys(markups).length == 0) { return this.text; }

    this.text = this._escape(this.text);

    this.applyLinks(markups.links);
    this.applyBolds(markups.bolds);
    this.applyItalics(markups.italics);

    return this.text;
  }

  applyLinks(links) {
    (links || []).forEach( (link) => {
      var re = new RegExp(`(${link.text})`);
      this.text = this.text.replace(re,
        `<a class="ic-Editor-Block__a" href="${link.url}">$1</a>`);
    })
  }

  applyBolds(bolds) {
    (bolds || []).forEach( (bold) => {
      var re = new RegExp(`(${bold.text})`);
      this.text = this.text.replace(re,
        "<strong class=\"ic-Editor-Block__strong\">$1</strong>");
    })
  }

  applyItalics(italics) {
    (italics || []).forEach( (italic) => {
      var re = new RegExp(`(${italic.text})`);
      this.text = this.text.replace(re,
        "<em class=\"ic-Editor-Block__em\">$1</em>");
    })
  }

  _escape(string) {
    return String(string).replace(/[&<>"]/g, (s) => {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': '&quot;' }[s];
    });
  }

  _strip(html) {
    var tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  }
}

module.exports = Formatter;
