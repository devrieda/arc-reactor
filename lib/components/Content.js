var React = require('react');
var Section = require('./Section');

var Commands = require('../modules/Commands');
var EditorStore = require('../stores/EditorStore');

var pick = require('lodash.pick');

require('../stylesheets/Content.scss');

var { shape, array, object } = React.PropTypes;

var Content = React.createClass({
  propTypes: {
    content: shape({ sections: array }).isRequired,
    selection: object.isRequired
  },

  // update when store changes
  componentDidMount() {
    this.commands = Commands.getInstance();
  },

  // handle changes

  handleKeyUp(e) {
    if (e.keyCode === 91) { this.metaKey = false; }
  },

  handleKeyDown(e) {
    if (e.keyCode === 91) { this.metaKey = true; }
    e.metaKey = this.metaKey;

    // execute commands that match key down
    var results = this.commands.execute(
      e, this.props.content, this.props.selection
    );

    // update results in the store
    if (results) {
      EditorStore.set(pick(results, ["content", "selection"]), results.emit);
    }
  },

  render() {
    var sections = this.props.content.sections.map( (sect, i) => {
      sect.meta = sect.meta || {};
      if (i === 0) { sect.meta.first = true; }
      return <Section key={sect.id} {...sect} />;
    });

    return (
      <div className="ic-Editor-Content"
        onKeyDown={this.handleKeyDown}
        onKeyUp={this.handleKeyUp}
        contentEditable="true"
        role="textbox"
        aria-multiline="true"
        aria-label="Editable Content"
      >
        {sections}
      </div>
    );
  }
});

module.exports = Content;
