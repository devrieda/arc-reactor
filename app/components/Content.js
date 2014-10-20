/** @jsx React.DOM */

var React = require('react');
var Section = require('./Section');

var Selection = require('../modules/Selection');
var KeyIntent = require('../modules/KeyIntent');

var ContentState = require('../state/ContentState');
var SelectionState = require('../state/SelectionState');
var KeyActions = require('../actions/KeyActions');

require('../stylesheets/Content.css');

var Content = React.createClass({
  propTypes: {
    onChange: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      onChange: function() {}
    }
  },
  getInitialState: function() {
    return {
      content: {sections: []},
      selection: new Selection
    }
  },

  // update when store changes
  componentDidMount: function() {
    ContentState.register(this.setState.bind(this));
    SelectionState.register(this.setState.bind(this));

    this.actions = new KeyActions;
  },

  // if content changed, selection may have changed
  componentDidUpdate: function() {
    if (this.state.selection.reselect()) {
      SelectionState.set({selection: this.state.selection});
    }
  },

  checkSelection: function() {
    SelectionState.set({selection: new Selection});
  },

  // handle changes
  onChange: function(e) {
    this.props.onChange(this.state.content);
  },
  onMouseUp: function(e) {
    setTimeout(this.checkSelection, 1);
  },

  onBlur: function(e) {
    setTimeout(this.checkSelection, 1);
  },
  onKeyUp: function(e) {
    this.checkSelection();
    if (e.keyCode == 91) { this.metaKey = false; }

    this.actions.type();
  },
  onKeyDown: function(e) {
    if (e.keyCode == 91) { this.metaKey = true; }
    e.metaKey = this.metaKey;

    var keyIntent = new KeyIntent(e);
    var intent = keyIntent.getIntent();
    if (intent) {
      var prevent = this.actions[intent]();
      if (prevent) { e.preventDefault(); }
    }

  },

  render: function() {
    var sections = this.state.content.sections.map(function(sect, i) {
      sect.meta = sect.meta || {};
      if (i == 0) { sect.meta.first = true; }
      return <Section key={sect.id} content={sect} />
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
