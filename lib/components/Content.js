var React = require('react');
var Section = require('./Section');

var Selection = require('../modules/Selection');
var KeyIntent = require('../modules/KeyIntent');

var ContentState = require('../state/ContentState');
var SelectionState = require('../state/SelectionState');
var BaseKey = require('../actions/keys/BaseKey');

require('../stylesheets/Content.scss');

var { func } = React.PropTypes;

var Content = React.createClass({
  propTypes: {
    onChange: func
  },

  getDefaultProps() {
    return {
      onChange() {}
    }
  },

  getInitialState() {
    return {
      content: {sections: []},
      selection: new Selection(document.getSelection())
    }
  },

  // update when store changes
  componentDidMount() {
    ContentState.register(this.setState.bind(this));
    SelectionState.register(this.setState.bind(this));

    this.key = new BaseKey;
  },

  // if content changed, selection may have changed
  componentDidUpdate() {
    if (this.state.selection.reselect() || this.state.selection.rebound()) {
      this.checkSelection();
    }
  },

  checkSelection() {
    SelectionState.set({selection: new Selection(document.getSelection())});
  },

  // handle changes
  onChange(e) {
    this.props.onChange(this.state.content);
  },
  onMouseUp(e) {
    setTimeout(this.checkSelection, 1);
  },

  onBlur(e) {
    setTimeout(this.checkSelection, 1);
  },
  onKeyUp(e) {
    this.checkSelection();
    if (e.keyCode == 91) { this.metaKey = false; }

    this.key.press('Other');
  },
  onKeyDown(e) {
    if (e.keyCode == 91) { this.metaKey = true; }
    e.metaKey = this.metaKey;

    var keyIntent = new KeyIntent(e);
    this.intent = keyIntent.getIntent();
    if (this.intent) {
      if (this.key.press(this.intent)) {
        e.preventDefault();
      }
    }
  },

  render() {
    var sections = this.state.content.sections.map( (sect, i) => {
      sect.meta = sect.meta || {};
      if (i == 0) { sect.meta.first = true; }
      return <Section key={sect.id} {...sect} />
    });

    return (
      <div className="ic-Editor-Content" ref="editor"
           onInput={this.onChange}
           onKeyDown={this.onKeyDown}
           onKeyUp={this.onKeyUp}
           onBlur={this.onBlur}
           onMouseUp={this.onMouseUp}
           contentEditable="true"
           role="textbox" aria-multiline="true" aria-label="Editable Content">
        {sections}
      </div>
    )
  }
});

module.exports = Content;
