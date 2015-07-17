var React = require('react/addons');
var Immutable = require('immutable');
var cx = require("classnames");

var cloneWithProps = React.addons.cloneWithProps;
var { object, func, instanceOf } = React.PropTypes;

var Menu = React.createClass({
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
  handleSetValue(obj, ref) {
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
    var escapeKey = 27;
    if (e.keyCode === escapeKey) { this.handleCancelInput(); }

    var returnKey = 13;
    if (e.keyCode !== returnKey) { return; }

    e.stopPropagation();
    e.preventDefault();

    var value = e.target.value;
    this.valueButton.handleClick(e, null, value);
    React.findDOMNode(this.refs.linkInput).value = "";
    this.setState({inputMode: false});
  },

  // pass the selection snapshot upstream to restore it
  handleCancelInput() {
    this.setState({inputMode: false});
    this.props.onChange(this.selSnapshot);
  },

  menuClasses() {
    return cx('ic-Editor-Menu', {
      'ic-Editor-Menu--active': this.props.selection.showMenuButtons(),
      'ic-Editor-Menu--link': this.state.inputMode
    });
  },
  itemsClasses() {
    return cx('ic-Editor-Menu__items', {
      'ic-Editor-Menu__items--active': !this.state.inputMode
    });
  },
  linkClasses() {
    return cx('ic-Editor-Menu__linkinput', {
      'ic-Editor-Menu__linkinput--active': this.state.inputMode
    });
  },

  // move menu to selected text
  menuStyles() {
    if (!this.props.selection.bounds) { return {}; }

    var selection = this.props.selection;
    var bounds = selection.bounds;
    if (!bounds.top && !bounds.left) { return {}; }

    var buttonHeight = 50;
    var menuWidth = Object.keys(this.renderButtons()).length * 38;

    return {
      top: window.pageYOffset + bounds.top - buttonHeight,
      left: bounds.left + (bounds.width / 2) - (menuWidth / 2)
    };
  },

  // build buttons from children
  renderButtons() {
    var buttons = [];
    React.Children.forEach(this.props.children, (child, i) => {
      var refName = `button_${child.props.type}`;
      var cloned = cloneWithProps(child, {
        content: this.props.content,
        selection: this.props.selection,
        handleSetValue: this.handleSetValue.bind(this, child, refName),
        ref: refName
      });

      // some buttons may not be visible based on the selection
      if (cloned.type.isVisible(this.props.content, this.props.selection)) {
        buttons.push(
          <li className="ic-Editor-Menu__item" key={`button_${i}`}>
            {cloned}
          </li>
        );
      }
    });
    return buttons;
  },

  render() {
    return (
      <div ref="menu" className={this.menuClasses()} style={this.menuStyles()}>
        <div className="ic-Editor-Menu__inner">
          <ul className={this.itemsClasses()}>
            {this.renderButtons()}
          </ul>

          <div className={this.linkClasses()}>
            <input
              type="text"
              ref="linkInput"
              className="ic-Editor-Menu__linkinput-field"
              placeholder="Paste or type a link"
              onKeyUp={this.handleOnKeyUp}
              onKeyDown={this.handleOnKeyDown} />

            <button className="ic-Editor-Menu__linkinput_button ic-Editor-MenuButton"
              onClick={this.handleCancelInput}
            >
              <i className="ic-Editor-MenuButton__icon fa fa-times"></i>
              <span className="ic-Editor-MenuButton__icon-text ic-Editor-MenuButton__icon-text--sr">
                Close
              </span>
            </button>
          </div>
        </div>

        <div className="ic-Editor-Menu__arrow-clip">
          <span className="ic-Editor-Menu__arrow"></span>
        </div>
      </div>
    );
  }
});

module.exports = Menu;
