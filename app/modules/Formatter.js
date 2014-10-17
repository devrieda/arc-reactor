var mixInto = require('react/lib/mixInto');

function escape(string) {
  return String(string).replace(/[&<>"]/g, function(s) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': '&quot;' }[s];
  });
}

var Formatter = function(text) {
  this.text = text;
}

// SUPER-HACK - just regexp in the markup. This will fail as soon as there
// is a string with multiple of the same word marked up
//
mixInto(Formatter, {
  applyMarkup: function(markups) {
    if (markups.length == 0) { return this.text; }

    var markups = markups.map(function(markup) {
      markup.text = this.text.slice(markup.offsetStart, markup.offsetEnd);
      return markup;
    }.bind(this));

    this.text = escape(this.text);

    this.applyAction('a', markups);
    this.applyAction('strong', markups);
    this.applyAction('em', markups);

    return this.text;
  },

  applyAction: function(type, markups) {
    var markups = markups.forEach(function(markup) {
      if (markup.type != type) { return; }

      var re = new RegExp("("+markup.text+")");
      if (type == 'a') {
        this.text = this.text.replace(re, 
          "<a class=\"ic-Editor-Block__a\" href=\"" + markup.value + "\">$1</a>");

      } else if (type == 'strong') {
        this.text = this.text.replace(re,
          "<strong class=\"ic-Editor-Block__strong\">$1</strong>");

      } else if (type == 'em') {
        this.text = this.text.replace(re,
          "<em class=\"ic-Editor-Block__em\">$1</em>");
      }
    }.bind(this));
  }
});

module.exports = Formatter;
