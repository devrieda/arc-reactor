/** @jsx React.DOM */

var React = require('react');
var EditorSection = require('./EditorSection');
require('./Editor.css');

var k = function(){};

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

  sectionChanged: function(section) {
  },

  render: function() {
    var sections = this.state.content.sections.map(function(sect) {
      return <EditorSection onChange={this.sectionChanged} content={sect} />
    });

    return (
      <div className="ReactEditor" contentEditable="true">
        {sections}
      </div>
    )
  }
});

module.exports = Editor;
