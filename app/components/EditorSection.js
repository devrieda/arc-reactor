/** @jsx React.DOM */

var React = require('react');
var EditorBlock = require('./EditorBlock');

require('./EditorSection.css');

var EditorSection = React.createClass({
  getDefaultProps: function() {
    return {
      content: {blocks: []}
    };
  },

  render: function() {
    var blocks = this.props.content.blocks.map(function(block) {
      return <EditorBlock content={block} />
    });

    return (
      <section className="ReactEditor_Section">
        <div className="ReactEditor_Section__div--separator">
          <hr className="ReactEditor_Section__hr" />
        </div>

        <div className="ReactEditor_Section__div--content">
          <div className="ReactEditor_Section__div--inner">
            {blocks}
          </div>
        </div>
      </section>
    )
  }
});

module.exports = EditorSection;
