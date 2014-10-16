/** @jsx React.DOM */

var React = require('react/addons');
var classSet = React.addons.classSet;
require('../stylesheets/Menu.css');

var Menu = React.createClass({
  propTypes: {
  },

  getDefaultProps: function() {
    return {
      active: false,
      selection: {type: "p"}
    }
  },

  buttonTypes: function() {
    var buttonTypes = ['h2', 'h3', 'h4', 'center', 'blockquote', 'link'];
    if (['h2', 'h3', 'h4'].indexOf(this.props.selection.type) != -1) {
      buttonTypes.push('bold', 'italic');
    }
    return buttonTypes;
  },
  buttons: function() {
    var selectedType = this.props.selection.type;

    return this.buttonTypes().map(function(type) {
      var itemClass = {
        'ic-Editor-Menu__item': true,
        'ic-Editor-Menu__item--active': selectedType == type 
      }
      itemClass['ic-Editor-Menu__item--'+type] = true;

      var iconClass = {
        'ic-Editor-Menu__icon': true
      }
      itemClass['ic-Editor-Menu__icon--'+type] = true;

      return (
        <li className={classSet(itemClass)}>
          <button className="ic-Editor-Menu__button" data-action={type}>
            <span className={classSet(iconClass)}></span>
          </button>
        </li>
      )
    });
  },

  render: function() {
    var classes = classSet({
      'ic-Editor-Menu': true,
      'ic-Editor-Menu--active': this.props.active 
    });

    return (
      <div className={classes}>
        <div className="ic-Editor-Menu__inner">
          <ul className="ic-Editor-Menu__buttons">{this.buttons()}</ul>

          <div className="highlightMenu-button highlightMenu-linkinput">
            <input className="highlightMenu-linkinputField" type="text" placeholder="Paste or type a link" />
            <button className="button-highlightMenu" data-action="cancelLink">
              <span className="icon icon--remove"></span>
            </button>
          </div>
        </div>
        <div className="highlightMenu-arrowClip">
          <span className="highlightMenu-arrow"></span>
        </div>
      </div>
    )
  }
});

module.exports = Menu;

