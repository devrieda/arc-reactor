/** @jsx React.DOM */

var React = require('react/addons');
var MenuItem = require('./MenuItem');

var ContentActions = require('../actions/ContentActions');
var SelectionState = require('../state/SelectionState');

require('../stylesheets/Menu.css');

var classSet = React.addons.classSet;

var Menu = React.createClass({
  getInitialState: function() {
    return {
      selection: {},
      linkMode: false
    }
  },

  componentDidMount: function() {
    SelectionState.register(this.setState.bind(this));
  },

  clickMenu: function(e) {
    var target = e.target.nodeName == 'BUTTON' ? e.target : e.target.parentNode;
    var action = target.getAttribute('data-action');
    var active = target.className.indexOf('active') != -1;

    ContentActions.pressButton(action, active);
  },

  buttonTypes: function() {
    var buttons = [
      {type: 'strong',     icon: 'fa-bold',         text: 'Bold'},
      {type: 'em',         icon: 'fa-italic',       text: 'Italic'},
      {type: 'h2',         icon: null,              text: 'H1'},
      {type: 'h3',         icon: null,              text: 'H2'},
      {type: 'h4',         icon: null,              text: 'H3'},
      {type: 'center',     icon: 'fa-align-center', text: 'Center'},
      {type: 'blockquote', icon: 'fa-quote-left',   text: 'Quote'},
      {type: 'a',          icon: 'fa-link',         text: 'Link'}
    ];

    var isHeader = ['h2', 'h3', 'h4'].indexOf(this.state.selection.type) != -1;
    return isHeader ? buttons.slice(2) : buttons;
  },
  menuClasses: function() {
    return classSet({
      'ic-Editor-Menu': true,
      'ic-Editor-Menu--active': this.state.selection.text,
      'ic-Editor-Menu--link': this.state.linkMode
    });
  },
  itemsClasses: function() {
    return classSet({
      'ic-Editor-Menu__inner': true,
      'ic-Editor-Menu__inner--active': !this.state.linkMode
    });
  },
  linkClasses: function() {
    return classSet({
      'ic-Editor-Menu__linkinput': true,
      'ic-Editor-Menu__linkinput--active': this.state.linkMode
    });
  },

  menuStyles: function() {
    if (!this.state.selection.type) { return {}; }

    var selection = this.state.selection;
    var buttonHeight = 50;
    var menuWidth = this.buttonTypes().length * 38;

    return {
      top: window.pageYOffset + selection.top - buttonHeight,
      left: selection.left + (selection.width / 2) - (menuWidth / 2)
    };
  },

  render: function() {
    var buttons = this.buttonTypes().map(function(button) {
      return <MenuItem key={button.type}
                      type={button.type}
                      text={button.text}
                      icon={button.icon}
                 selection={this.state.selection} />
    }.bind(this));

    return (
      <div ref="menu" className={this.menuClasses()} style={this.menuStyles()}>
        <div className="ic-Editor-Menu__inner" onClick={this.clickMenu}>
          <ul className={this.itemsClasses()}>
            {buttons}
          </ul>

          <div className={this.linkClasses()}>
            <input className="ic-Editor-Menu__linkinput-field" type="text" placeholder="Paste or type a link" />
            <button className="ic-Editor-MenuItem__button" data-action="cancelLink">
              <i className="ic-Editor-MenuItem__icon fa fa-close"></i>
              <span className="ic-Editor-MenuItem__icon-text screenreader-only">Close</span>
            </button>
          </div>
        </div>

        <div className="ic-Editor-Menu__arrow-clip">
          <span className="ic-Editor-Menu__arrow"></span>
        </div>
      </div>
    )
  }
});

module.exports = Menu;

