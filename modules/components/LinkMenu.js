import React from 'react/addons';
import EditorStore from '../stores/EditorStore';

const { bool, string, shape, number } = React.PropTypes;

const LinkMenu = React.createClass({
  propTypes: {
    active: bool,
    value: string,
    bounds: shape({
      height: number,
      width: number,
      top: number,
      right: number,
      bottom: number,
      left: number,
    }),
  },

  getDefaultProps() {
    return {
      active: false,
      value: "",
      bounds: {},
    };
  },

  handleMouseEnter(e) {
    this.handleHoverLink(e, true);
  },

  handleMouseLeave(e) {
    this.timeout = setTimeout( () => {
      this.handleHoverLink(e, false);
    }, 250);
  },

  handleHoverLink(e, active) {
    const linkState = {
      active: active,
      value: this.props.value,
      bounds: this.props.bounds,
      hovered: active
    };
    EditorStore.set({ linkState: linkState });
  },

  componentDidUpdate() {
    if (!this.props.active) return;

    let node = React.findDOMNode(this.refs.content);
    const button = node.getBoundingClientRect();
    const bounds = this.props.bounds;
    const arrow  = 5;
    const spacer = 14;

    // TODO - if link is too far down, we'll need to show it above
    const below = true;

    let top, left;
    if (below) {
      top = window.pageYOffset + bounds.bottom + spacer + "px";
      left = bounds.left + (bounds.width/2) - (button.width/2) - arrow + "px";
    } else {
      top = 0;
      left = 0;
    }
    node.style.top  = top;
    node.style.left = left;
  },

  render() {
    const styles = {
      visibility: this.props.active ? 'visible' : 'hidden',
      opacity: this.props.active ? 100 : 0
    };

    return (
      <div className="arc-Editor-LinkMenu"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div ref="content" className="arc-Editor-LinkMenu__content" style={styles}>
          <a className="arc-Editor-LinkMenu__a" href={this.props.value}>
            {this.props.value}
          </a>
        </div>
      </div>
    );
  }
});

export default LinkMenu;
