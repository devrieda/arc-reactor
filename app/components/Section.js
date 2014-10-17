/** @jsx React.DOM */

var React = require('react');
var addons = require('react/addons');
var Block = require('./Block');
require('../stylesheets/Section.css');

var Section = React.createClass({
  propTypes: {
    content: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      content: { blocks: [], meta: {} }
    }
  },

  // add class modifiers
  buildClassName: function() {
    var meta = this.props.content.meta;
    return React.addons.classSet({
      'ic-Editor-Section': true,
      'ic-Editor-Section--first': meta && meta.first
    });
  },

  render: function() {
    var blocks = this.props.content.blocks.map(function(block) {
      return <Block key={block.id} content={block} />
    });

    return (
      <section className={this.buildClassName()} name={this.props.content.id}>
        <div className="ic-Editor-Section__divider">
          <hr className="ic-Editor-Section__hr" />
        </div>

        <div className="ic-Editor-Section__content">
          <div className="ic-Editor-Section__inner">
            {blocks}
          </div>
        </div>
      </section>
    )
  }
});

module.exports = Section;
