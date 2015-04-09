var React = require('react/addons');
var Immutable = require('immutable');
var ContentFinder = require('../modules/ContentFinder');
var cx = require("classnames");

require('../stylesheets/Bar.scss');

var { object, instanceOf } = React.PropTypes;

var Bar = React.createClass({
  propTypes: {
    content: instanceOf(Immutable.Map),
    selection: object.isRequired,
  },

  getInitialState() {
    return {
      open: false
    };
  },

  componentDidMount() {
    this.recalculatePosition();
  },
  componentDidUpdate() {
    this.recalculatePosition();
  },
  recalculatePosition() {
    if (!this.isActive()) { return; }

    var selection = this.props.selection;
    var guid = selection.guids().anchor;
    var node = document.getElementsByName(guid)[0];

    var rect = node.getBoundingClientRect();

    var winTop =  window.pageYOffset || document.documentElement.scrollTop;
    console.log(winTop)


    // find position relative to 
    var node = React.findDOMNode(this);
    node.style.top  = rect.top + winTop + "px";
    node.style.left = rect.left - 40 + "px";
  },


  handleClick() {
    console.log("toggle it")
  },

  isActive() {
    var selection = this.props.selection;
    var isRange = selection.isRange();
    var isBeg   = selection.begOfBlock();
    if (isRange || !isBeg) { return false; }

    // content is empty at this node
    var guid = selection.guids().anchor;
    var path = new ContentFinder(this.props.content).findPath(guid);
    return this.props.content.getIn(path.concat('text')) === '';
  },

  // move menu to selected text
  barStyles() {
    // if (!this.isActive) { return {}; }

    // var selection = this.props.selection;
    // var guid = selection.guids().anchor;
    // var nodes = document.getElementsByName(guid);

    return {};
  },

  barClasses() {
    return cx({
      'ic-Bar': true,
      'ic-Bar--active': this.isActive()
    });
  },

  render() {
    return (
      <div className={this.barClasses()} style={this.barStyles()}>
        <button className="ic-Bar-Trigger" onClick={this.handleClick}>
          Bar
        </button>
      </div>
    );
  }
});

module.exports = Bar;
