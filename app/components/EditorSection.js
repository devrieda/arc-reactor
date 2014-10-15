/** @jsx React.DOM */

var React = require('react');
var addons = require('react/addons');
var EditorBlock = require('./EditorBlock');
require('./EditorSection.css');


var EditorSection = React.createClass({
  propTypes: {
    content: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      content: {blocks: [], meta: {}}
    }
  },

  buildClassName: function() {
    return React.addons.classSet({
      'ic-EditorSection': true,
      'ic-EditorSection--first': this.props.content.meta.first
    });
  },

  render: function() {
    var blocks = this.props.content.blocks.map(function(block) {
      return <EditorBlock key={block.id} content={block} />
    }.bind(this));

    return (
      <section className={this.buildClassName()}>
        <div className="ic-EditorSection__divider">
          <hr className="ic-EditorSection__hr" />
        </div>

        <div className="ic-EditorSection__content">
          <div className="ic-EditorSection__inner">
            {blocks}
          </div>
        </div>
      </section>
    )
  }
});

module.exports = EditorSection;
