/** @jsx React.DOM */

var React = require('react');
var Section = require('./Section');

var Selection = require('../modules/Selection');
var KeyIntent = require('../modules/KeyIntent');
var ContentState = require('../modules/ContentState');
var ContentActions = require('../actions/ContentActions');

require('../stylesheets/Content.css');

var Content = React.createClass({
  propTypes: {
    content: React.PropTypes.object,
    onChange: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      content: { sections: [] },
      onChange: function() {}
    }
  },
  getInitialState: function() {
    return {
      content: {}
    }
  },

  componentWillMount: function() {
    this.setState({content: this.props.content});
    ContentState.init({content: this.props.content});
  },

  // update when store changes
  componentDidMount: function() {
    ContentState.register(function() {
      this.setState(ContentState.getState())
    }.bind(this));
  },

  checkSelection: function() {
    setTimeout(function() {
      var sel = new Selection;
      this.props.onChange(this.state.content, sel.attr());
    }.bind(this), 1);
  },

  // handle changes
  onChange: function(e) {
    this.checkSelection();
  },
  onMouseUp: function(e) {
    this.checkSelection();
  },
  onBlur: function(e) {
    this.checkSelection();
    this.onChange();
  },

  onKeyDown: function(e) {
    if (e.keyCode == 91) { this.metaKey = true; }
    e.metaKey = this.metaKey;

    // var keyIntent = new KeyIntent(e);
    // var intent = keyIntent.getIntent();
    // if (intent) {
    //   var ce = new ContentEditor(this.state.content);

    //   var prevent = ce[intent](e);
    //   if (prevent) { e.preventDefault(); }

    //   this.setState({ content: ce.getContent() });
    // }
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
           onBlur={this.onBlur}
           onKeyDown={this.onKeyDown}
           onKeyUp={this.onKeyUp}
           onMouseUp={this.onMouseUp}
           contentEditable="true"
           role="textbox" aria-multiline="true" aria-label="Editable Content">
        {sections}
      </div>
    )
  }
});

module.exports = Content;