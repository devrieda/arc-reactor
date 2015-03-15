var React = require('react');
var Section = require('./Section');

var KeyIntent = require('../modules/KeyIntent');
var BaseKey = require('../actions/keys/BaseKey');

require('../stylesheets/Content.scss');

var { shape, array, object } = React.PropTypes;

var Content = React.createClass({
  propTypes: {
    content: shape({ sections: array }).isRequired,
    selection: object.isRequired
  },

  // update when store changes
  componentDidMount() {
    this.key = new BaseKey();
  },

  // handle changes

  handleKeyUp(e) {
    if (e.keyCode == 91) { this.metaKey = false; }

    this.key.press(this.props.content, this.props.selection, 'Other');
  },

  handleKeyDown(e) {
    if (e.keyCode == 91) { this.metaKey = true; }
    e.metaKey = this.metaKey;

    var keyIntent = new KeyIntent(e);
    this.intent = keyIntent.getIntent();
    if (this.intent) {
      if (this.key.press(this.props.content, this.props.selection, this.intent)) {
        e.preventDefault();
      }
    }
  },

  render() {
    var sections = this.props.content.sections.map( (sect, i) => {
      sect.meta = sect.meta || {};
      if (i == 0) { sect.meta.first = true; }
      return <Section key={sect.id} {...sect} />
    });

    return (
      <div className="ic-Editor-Content" ref="editor"
        onKeyDown={this.handleKeyDown}
        onKeyUp={this.handleKeyUp}
        contentEditable="true"
        role="textbox"
        aria-multiline="true"
        aria-label="Editable Content"
      >
        {sections}
      </div>
    )
  }
});

module.exports = Content;
