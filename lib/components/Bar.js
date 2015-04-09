var React = require('react/addons');
var Immutable = require('immutable');
var ContentFinder = require('../modules/ContentFinder');
var cx = require("classnames");

require('../stylesheets/Bar.scss');

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
    if (!this.isActive() && this.state.open) {
      this.setState({open: false});
    }
  },

  componentDidMount() {
    this.recalculatePosition();
  },

  componentDidUpdate() {
    this.recalculatePosition();
  },

  // update position based on the selected anchor node
  recalculatePosition() {
    if (!this.isActive()) { return; }

    var selection = this.props.selection;
    var guid = selection.guids().anchor;
    var node = document.getElementsByName(guid)[0];

    var rect = node.getBoundingClientRect();
    var scrollTop =  window.pageYOffset || document.documentElement.scrollTop;

    var node = React.findDOMNode(this);
    node.style.top  = rect.top + scrollTop - 5 + "px";
    node.style.left = rect.left - 70 + "px";
  },

  // content is empty and a new paragraph block
  isActive() {
    var selection = this.props.selection;
    var isRange = selection.isRange();
    var isBeg   = selection.begOfBlock();
    if (isRange || !isBeg) { return false; }

    var guid = selection.guids().anchor;
    var path = new ContentFinder(this.props.content).findPath(guid);
    var block = this.props.content.getIn(path);
    return block.get('text') === '' && block.get('type') === 'p';
  },

  // switch to allow input if button needs a value
  handleSetValue(obj, ref) {
    this.valueButton = this.refs[ref];
    this.setState({inputMode: true});
  },

  // toggle menu open/closed
  handleClickTrigger(e) {
    var open = this.state.open;
    this.setState({open: !open});

    // focus on the button
    if (!open) {
      setTimeout( () => {
        React.findDOMNode(this.refs.trigger).focus();
      }, 100);
    }
  },

  // switch to allow input if button needs a value
  handleSetValue(obj, ref) {
    this.valueButton = this.refs[ref];
    this.setState({inputMode: true});
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
    return cx({
      'ic-Editor-Bar': true,
      'ic-Editor-Bar--active': this.isActive()
    });
  },

  triggerClasses() {
    return cx({
      'ic-Editor-Bar__trigger': true,
      'ic-Editor-Bar__trigger--active': this.state.open
    });
  },

  iconClasses() {
    return cx({
      'ic-Editor-Bar__trigger-icon fa fa-plus': true,
      'ic-Editor-Bar__trigger-icon--active': this.state.open
    });
  },

  menuClasses() {
    return cx({
      'ic-Editor-Bar__menu-items': true,
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

        {this.isActive() &&
          <ul className={this.menuClasses()}>
            {this.renderButtons()}
          </ul>
        }
      </div>
    );
  }
});

module.exports = Bar;
