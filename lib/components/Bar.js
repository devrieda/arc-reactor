var React = require('react/addons');
var Immutable = require('immutable');
var ContentFinder = require('../modules/ContentFinder');
var cx = require("classnames");

var cloneWithProps = React.addons.cloneWithProps;
var { object, instanceOf } = React.PropTypes;

var Bar = React.createClass({
  propTypes: {
    content: instanceOf(Immutable.Map),
    selection: object.isRequired,
  },

  getInitialState() {
    return { open: false };
  },

  // collapse buttons when inactive
  componentWillUpdate() {
    if (!this._isActive() && this.state.open) {
      this.setState({open: false});
    }
  },

  componentDidUpdate() {
    this._recalculatePosition();
  },

  componentDidMount() {
    this._recalculatePosition();
    document.addEventListener("keyup", this.handleTyping);
  },

  componentWillUnmount() {
    document.removeEventListener("keyup", this.handleTyping);
  },

  // we're super conservative about rendering typed content,
  // so sometimes the data being passed here isn't as up to date as
  // we'd like
  handleTyping(e) {
    this.forceUpdate();
  },

  // update position based on the selected anchor node
  _recalculatePosition() {
    if (!this._isActive()) { return; }

    var anchorNode = this._getAnchorNode();
    var rect = anchorNode.getBoundingClientRect();
    var scrollTop =  window.pageYOffset || document.documentElement.scrollTop;

    var node = React.findDOMNode(this);
    node.style.top  = rect.top + scrollTop - 5 + "px";
    node.style.left = rect.left - 70 + "px";
  },

  // content is empty and a new paragraph block
  _isActive() {
    var selection = this.props.selection;
    var isRange = selection.isRange();
    var isBeg   = selection.begOfBlock();
    if (isRange || !isBeg) { return false; }

    var guid = selection.guids().anchor;
    var path = new ContentFinder(this.props.content).findPath(guid);
    if (!path) { return false; }

    var block = this.props.content.getIn(path);

    // first check node content directly
    var anchorNode = this._getAnchorNode();
    if (anchorNode) {
      return anchorNode.textContent === '' && block.get('type') === 'p';
    } else {
      return block.get('text') === '' && block.get('type') === 'p';
    }
  },

  _getAnchorNode() {
    var selection = this.props.selection;
    var guid = selection.guids().anchor;
    return document.getElementsByName(guid)[0];
  },

  // switch to allow input if button needs a value
  handleSetValue(obj, ref) {
    this.valueButton = this.refs[ref];
    this.setState({inputMode: true});
  },

  // toggle menu open/closed
  handleClickTrigger() {
    var open = this.state.open;
    this.setState({open: !open});

    // focus on the button
    if (!open) {
      setTimeout( () => {
        React.findDOMNode(this.refs.trigger).focus();
      }, 50);
    }
  },

  // send click with value when we press return
  handleOnKeyUp(e) {
    var returnKey = 13;
    if (e.keyCode !== returnKey) { return; }

    var value = e.target.value;
    this.valueButton.handleClick(e, null, value);
    React.findDOMNode(this.refs.linkInput).value = "";
    this.setState({inputMode: false});
  },

  handleCancelInput() {
    this.setState({inputMode: false});
  },

  // class names
  barClasses() {
    return cx('ic-Editor-Bar', {
      'ic-Editor-Bar--active': this._isActive()
    });
  },

  triggerClasses() {
    return cx('ic-Editor-Bar__trigger', {
      'ic-Editor-Bar__trigger--active': this.state.open
    });
  },

  iconClasses() {
    return cx('ic-Editor-Bar__trigger-icon fa fa-plus', {
      'ic-Editor-Bar__trigger-icon--active': this.state.open
    });
  },

  menuClasses() {
    return cx('ic-Editor-Bar__menu-items', {
      'ic-Editor-Bar__menu-items--active': this.state.open
    });
  },

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

      buttons.push(
        <li className="ic-Editor-Bar__menu-item" key={`button_${i}`}>
          {cloned}
        </li>
      );
    });
    return buttons;
  },

  render() {
    return (
      <div className={this.barClasses()}>
        <button ref="trigger"
          className={this.triggerClasses()}
          onClick={this.handleClickTrigger}
        >
          <i className={this.iconClasses()}></i>
          <span className="ic-Editor-Bar__trigger-text">Show Menu</span>
        </button>

        {this._isActive() &&
          <ul className={this.menuClasses()}>
            {this.renderButtons()}
          </ul>
        }
      </div>
    );
  }
});

module.exports = Bar;
