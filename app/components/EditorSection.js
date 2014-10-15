/** @jsx React.DOM */

var React = require('react');
var addons = require('react/addons');
var EditorBlock = require('./EditorBlock');
var k = function(){};
require('./EditorSection.css');


var EditorSection = React.createClass({
  propTypes: {
    content: React.PropTypes.object,
    onChange: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      content: {blocks: [], meta: {}},
      onChange: k
    }
  },

  componentWillMount: function() {
    this.setState({content: this.props.content});
  },

  blockChanged: function(json) {
    // handle when block changes
  },

  buildClassName: function() {
    return React.addons.classSet({
      'ic-EditorSection': true,
      'ic-EditorSection--first': this.state.content.meta.first
    });
  },

  render: function() {
    var blocks = this.state.content.blocks.map(function(block) {
      return <EditorBlock data-id={block.id} key={block.id} onChange={this.blockChanged} content={block} />
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
