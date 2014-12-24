var React = require('react/addons');
var MenuItem = require('./MenuItem');

var Selection = require('../modules/Selection');
var SelectedContent= require('../modules/SelectedContent');

var ContentState = require('../state/ContentState');
var SelectionState = require('../state/SelectionState');
var BaseButton = require('../actions/buttons/BaseButton');

require('../stylesheets/Menu.scss');

var classSet = React.addons.classSet;

var Menu = React.createClass({
  getInitialState() {
    var selection = new Selection(document.getSelection());
    return {
      content: {},
      selection: selection,
      selContent: new SelectedContent(selection, {}),
      linkMode: false
    }
  },

  // keep selected content up to date
  componentDidMount() {
    this.button = new BaseButton;

    SelectionState.register( (state) => {
      state.selContent = new SelectedContent(
        state.selection, this.state.content);
      this.setState(state);
    });

    ContentState.register( (state) => {
      state.selContent = new SelectedContent(
        this.state.selection, state.content);
      this.setState(state);
    });
  },

  componentDidUpdate() {
    if (!this.state.linkMode) { return; }

    setTimeout( () => {
      this.refs.linkInput.getDOMNode().focus();
    }, 1);
  },

  clickMenu(e) {
    var target = e.target.nodeName == 'BUTTON' ? e.target : e.target.parentNode;
    var action = target.getAttribute('data-action');
    var active = target.className.indexOf('active') != -1;

    // toggle link mode
    if ((action == 'Link' && !active) || action == 'cancelLink') {
      this.setState({linkMode: (action == 'Link')});

    } else if (action) {
      this.button.press(action);
    }
  },
  onKeyUp(e) {
    var returnKey = 13;
    if (e.keyCode != returnKey) { return; }

    // add link href
    this.button.press('Link', e.target.value);
    this.refs.linkInput.getDOMNode().value = "";
    SelectionState.set({selection: new Selection(document.getSelection())});
  },

  isHeader() {
    return this.state.selContent.isHeader();
  },
  buttonTypes() {
    var buttons = BaseButton.types();
    return this.isHeader() ? buttons.slice(2) : buttons;
  },
  menuClasses() {
    return classSet({
      'ic-Editor-Menu': true,
      'ic-Editor-Menu--active': this.state.selection.text,
      'ic-Editor-Menu--link': this.state.linkMode
    });
  },
  itemsClasses() {
    return classSet({
      'ic-Editor-Menu__items': true,
      'ic-Editor-Menu__items--active': !this.state.linkMode
    });
  },
  linkClasses() {
    return classSet({
      'ic-Editor-Menu__linkinput': true,
      'ic-Editor-Menu__linkinput--active': this.state.linkMode
    });
  },

  // move menu to selected text
  menuStyles() {
    if (!this.state.selection.bounds) { return {}; }

    var selection = this.state.selection;
    var bounds = selection.bounds;
    var buttonHeight = 50;
    var menuWidth = this.buttonTypes().length * 38;

    return {
      top: window.pageYOffset + bounds.top - buttonHeight,
      left: bounds.left + (bounds.width / 2) - (menuWidth / 2)
    };
  },

  render() {
    var buttons = this.buttonTypes().map( (button) => {
      return <MenuItem key={button.type}
                      type={button.type}
                      text={button.text}
                      icon={button.icon}
                    action={button.action}
                selContent={this.state.selContent} />
    });

    return (
      <div ref="menu" className={this.menuClasses()} style={this.menuStyles()}>
        <div className="ic-Editor-Menu__inner" onClick={this.clickMenu}>
          <ul className={this.itemsClasses()}>
            {buttons}
          </ul>

          <div className={this.linkClasses()}>
            <input className="ic-Editor-Menu__linkinput-field" type="text" ref="linkInput"
              placeholder="Paste or type a link" onKeyUp={this.onKeyUp} />

            <button className="ic-Editor-Menu__linkinput_button ic-Editor-MenuItem__button" data-action="cancelLink">
              <i className="ic-Editor-MenuItem__icon fa fa-times"></i>
              <span className="ic-Editor-MenuItem__icon-text ic-Editor-MenuItem__icon-text--sr">Close</span>
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

