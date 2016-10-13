import React from 'react';
import Immutable from 'immutable';
import Section from './Section';

const PureRenderMixin = require('react-addons-pure-render-mixin');
const { object, instanceOf } = React.PropTypes;

const Content = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    content: instanceOf(Immutable.Map).isRequired,
    guids: object,
    offsets: object,
  },

  getDefaultProps() {
    return {
      guids: {},
      offsets: {}
    };
  },

  render() {
    const sections = this.props.content.get('sections').map( (sect, i) => {
      if (i === 0) { sect = sect.setIn(['meta', 'first'], true); }

      return (
        <Section
          key={sect.get('id')}
          id={sect.get('id')}
          blocks={sect.get('blocks')}
          meta={sect.get('meta')}
          guids={this.props.guids}
          offsets={this.props.offsets}
        />
      );
    });

    return (
      <div className="arc-Editor-Content"
        contentEditable="true"
        suppressContentEditableWarning={true}
        role="textbox"
        data-top="true"
        aria-multiline="true"
        aria-label="Editable Content">
        {sections}
      </div>
    );
  }
});

export default Content;
