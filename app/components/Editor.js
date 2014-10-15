/** @jsx React.DOM */

var React = require('react');
var EditorSection = require('./EditorSection');
var k = function(){};
require('./Editor.css');


var Editor = React.createClass({
  propTypes: {
    content: React.PropTypes.object,
    onChange: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      content: {sections: []},
      onChange: k
    }
  },

  componentWillMount: function() {
    this.setState({content: this.props.content});
  },

  sectionChanged: function(json) {
    // handle when section content changes
  },

  render: function() {
    var sections = this.state.content.sections.map(function(sect, i) {
      sect.meta = sect.meta || {};
      if (i == 0) { sect.meta.first = true; }
      return <EditorSection data-id={sect.id} key={sect.id} onChange={this.sectionChanged} content={sect} />
    }.bind(this));

    return (
      <div className="ic-Editor" onChange={this.onChange} contentEditable="true">
        {sections}
      </div>
    )
  }
});

module.exports = Editor;
