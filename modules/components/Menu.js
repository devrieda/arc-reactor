import React from 'react/addons';
import Immutable from 'immutable';
import cx from 'classnames';
import MenuButtons from '../helpers/Integration/MenuButtons';

const { object, func, instanceOf } = React.PropTypes;

const Menu = React.createClass({
  propTypes: {
    content: instanceOf(Immutable.Map),
    selection: object.isRequired,
    onChange: func
  },

  getDefaultProps() {
    return {
      onChange: Function.prototype
    };
  },

  getInitialState() {
    return {
      inputMode: false
    };
  },

  componentDidUpdate() {
    if (!this.state.inputMode) { return; }

    setTimeout( () => {
      React.findDOMNode(this.refs.linkInput).focus();
    }, 1);
  },

  // switch to allow input if button needs a value
  // create a snapshot of the selection so we can restore it if they close
  handleSetValue(ref) {
    this.selSnapshot = this.props.selection;
    this.valueButton = this.refs[ref];
    this.setState({inputMode: true});
  },

  // handle typing in input
  handleOnKeyUp(e) {
    e.stopPropagation();
  },

  // handle enter key for input
  handleOnKeyDown(e) {
    const escapeKey = 27;
    if (e.keyCode === escapeKey) { this.handleCancelInput(); }

    const returnKey = 13;
    if (e.keyCode !== returnKey) { return; }

    e.stopPropagation();
    e.preventDefault();

    const value = e.target.value;
    this.valueButton.setValue(value);
    React.findDOMNode(this.refs.linkInput).value = "";
    this.setState({inputMode: false});
  },

  // pass the selection snapshot upstream to restore it
  handleCancelInput() {
    this.setState({inputMode: false});
    this.props.onChange(this.selSnapshot);
  },

  menuClasses() {
    return cx('arc-Editor-Menu', {
      'arc-Editor-Menu--active': this.props.selection.showMenuButtons(),
      'arc-Editor-Menu--link': this.state.inputMode
    });
  },
  itemsClasses() {
    return cx('arc-Editor-Menu__items', {
      'arc-Editor-Menu__items--active': !this.state.inputMode
    });
  },
  linkClasses() {
    return cx('arc-Editor-Menu__linkinput', {
      'arc-Editor-Menu__linkinput--active': this.state.inputMode
    });
  },

  // move menu to selected text
  menuStyles() {
    if (!this.props.selection.bounds) { return {}; }

    const selection = this.props.selection;
    const bounds = selection.bounds;
    if (!bounds.top && !bounds.left) { return {}; }

    const buttonHeight = 50;
    const menuWidth = Object.keys(this.renderButtons()).length * 43;

    return {
      top: window.pageYOffset + bounds.top - buttonHeight,
      left: bounds.left + (bounds.width / 2) - (menuWidth / 2)
    };
  },

  // build buttons from integration point
  renderButtons() {
    let buttons = [];
    MenuButtons.forEach( (Button, i) => {
      if (Button.isVisible(this.props.content, this.props.selection)) {
        const refName = `button_${i}`;
        buttons.push(
          <li className="arc-Editor-Menu__item" key={`button_${i}`}>
           <Button
             content={this.props.content}
             selection={this.props.selection}
             onSetValue={this.handleSetValue.bind(this, refName)}
             ref={refName}
           />
          </li>
        );
      }
    });
    return buttons;
  },

  render() {
    return (
      <div ref="menu" className={this.menuClasses()} style={this.menuStyles()}>
        <div className="arc-Editor-Menu__inner">
          <ul className={this.itemsClasses()}>
            {this.renderButtons()}
          </ul>

          <div className={this.linkClasses()}>
            <input
              type="text"
              ref="linkInput"
              className="arc-Editor-Menu__linkinput-field"
              placeholder="Paste or type a link"
              onKeyUp={this.handleOnKeyUp}
              onKeyDown={this.handleOnKeyDown} />

            <button className="arc-Editor-Menu__linkinput_button arc-Editor-MenuButton"
              onClick={this.handleCancelInput}
            >
              <i className="arc-Editor-MenuButton__icon fa fa-times"></i>
              <span className="arc-Editor-MenuButton__icon-text arc-Editor-MenuButton__icon-text--sr">
                Close
              </span>
            </button>
          </div>
        </div>

        <div className="arc-Editor-Menu__arrow-clip">
          <span className="arc-Editor-Menu__arrow"></span>
        </div>
      </div>
    );
  }
});

export default Menu;
