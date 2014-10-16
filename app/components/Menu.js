/** @jsx React.DOM */

var React = require('react/addons');
var MenuItem = require('./MenuItem');
var classSet = React.addons.classSet;
require('../stylesheets/Menu.css');

var Menu = React.createClass({
  propTypes: {
    active: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      active: false,
      selection: {type: "p"}
    }
  },
  getInitialState: function() {
    return { linkMode: false }
  },

  buttonTypes: function() {
    var buttons = [
      {type: 'strong',     icon: 'fa-bold',         text: 'Bold'},
      {type: 'italic',     icon: 'fa-italic',       text: 'Italic'},
      {type: 'h2',         icon: null,              text: 'H1'},
      {type: 'h3',         icon: null,              text: 'H2'},
      {type: 'h4',         icon: null,              text: 'H3'},
      {type: 'center',     icon: 'fa-align-center', text: 'Center'},
      {type: 'blockquote', icon: 'fa-quote-left',   text: 'Quote'},
      {type: 'a',          icon: 'fa-link',         text: 'Link'}
    ];

    var isHeader = ['h2', 'h3', 'h4'].indexOf(this.props.selection.type) != -1;
    return isHeader ? buttons.slice(2) : buttons;
  },

  render: function() {
    var buttons = this.buttonTypes().map(function(button) {
      return <MenuItem key={button.type}
                      type={button.type}
                      text={button.text}
                      icon={button.icon}
                    active={this.props.selection.type == button.type} />
    }.bind(this));

    var menuClasses = classSet({
      'ic-Editor-Menu': true,
      'ic-Editor-Menu--active': this.props.active,
      'ic-Editor-Menu--link': this.state.linkMode
    });

    var itemsClasses = classSet({
      'ic-Editor-Menu__inner': true,
      'ic-Editor-Menu__inner--active': !this.state.linkMode
    });

    var linkClasses = classSet({
      'ic-Editor-Menu__linkinput': true,
      'ic-Editor-Menu__linkinput--active': this.state.linkMode
    });

    return (
      <div className={menuClasses}>
        <div className="ic-Editor-Menu__inner">
          <ul className={itemsClasses}>
            {buttons}
          </ul>

          <div className={linkClasses}>
            <input className="ic-Editor-Menu__linkinput-field" type="text" placeholder="Paste or type a link" />
            <button className="ic-Editor-MenuItem__button" data-action="cancelLink">
              <span className="ic-Editor-MenuItem__icon">x</span>
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

