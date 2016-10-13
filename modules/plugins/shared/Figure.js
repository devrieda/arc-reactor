import React from 'react';
import cx from 'classnames';
import FigCaption from './FigCaption';

const PureRenderMixin = require('react-addons-pure-render-mixin');
const { bool, string, any } = React.PropTypes;

const Figure = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    id: string,
    text: string,
    selected: bool,
    children: any,
  },

  getDefaultProps() {
    return {
      text: '',
      selected: false
    };
  },

  preventDrag(e) {
    e.preventDefault();
  },

  render() {
    const classNames = cx('arc-Editor-Figure', {
      'arc-Editor-Figure--outset-left': false,
      'arc-Editor-Figure--inset-left': false
    });

    return (
      <figure
        name={this.props.id}
        data-figure="true"
        data-block="true"
        contentEditable="false"
        suppressContentEditableWarning={true}
        onDragStart={this.preventDrag}
        className={classNames}
      >
        <div data-figure="true" className="arc-Editor-Figure__wrapper" data-blockid={this.props.id}>
          {this.props.children}
        </div>

        {false && <div className="arc-Editor-Figure__focus" children=" " />}
        {false && <FigCaption text={this.props.text} />}
      </figure>
    );
  }
});

export default Figure;
