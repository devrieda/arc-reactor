var React = require('react/addons');
var Immutable = require('immutable');
var cx = require("classnames");
var SelectedContent = require('../modules/SelectedContent');
var EditorStore = require('../stores/EditorStore');

require('../stylesheets/BarButton.scss');

var { string, bool, object, func, instanceOf } = React.PropTypes;

var BarButtonMixin = {
  handleClick(e, _reactid, value) {

  },

  isActive() {
  },

  buttonClasses(active) {
  },

  iconClasses(active) {
  },

  textClasses() {
  },

  render() {
    var active = this.isActive();

    return (
      <button className={this.buttonClasses(active)} onClick={this.handleClick}>
      </button>
    );
  }
};

module.exports = BarButtonMixin;
