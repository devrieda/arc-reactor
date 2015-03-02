var React = require('react/addons');

require('../stylesheets/Menu.scss');

var classSet = React.addons.classSet;
var cloneWithProps = React.addons.cloneWithProps;
var { shape, array, object } = React.PropTypes;

var Menu = React.createClass({
  propTypes: {
    content: shape({ sections: array }).isRequired,
    selection: object.isRequired
  },

  getInitialState() {
    return {
      linkMode: false
    }
  },

  componentDidUpdate() {
    if (!this.state.linkMode) { return; }

    setTimeout( () => {
      this.refs.linkInput.getDOMNode().focus();
    }, 1);
  },

  clickMenu(e) {
    // var target = e.target.nodeName == 'BUTTON' ? e.target : e.target.parentNode;
    // var action = target.getAttribute('data-action');
    // var active = target.className.indexOf('active') != -1;

    // // toggle link mode
    // if ((action == 'Link' && !active) || action == 'cancelLink') {
    //   this.setState({linkMode: (action == 'Link')});

    // } else if (action) {
    //   this.button.press(this.props.selection, this.props.content, action);
    // }
  },

  // activate link when we prese return
  onKeyUp(e) {
    var returnKey = 13;
    if (e.keyCode !== returnKey) { return; }

    // add link href
    // this.button.press(
    //   this.props.selection, this.props.content, 'Link', e.target.value
    // );
    // this.refs.linkInput.getDOMNode().value = "";

    // EditorStore.set({selection: new Selection(document.getSelection())});
  },

  menuClasses() {
    return classSet({
      'ic-Editor-Menu': true,
      'ic-Editor-Menu--active': this.props.selection.text,
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
    if (!this.props.selection.bounds) { return {}; }

    var selection = this.props.selection;
    var bounds = selection.bounds;
    var buttonHeight = 50;
    var menuWidth = Object.keys(this.buttons()).length * 38;

    return {
      top: window.pageYOffset + bounds.top - buttonHeight,
      left: bounds.left + (bounds.width / 2) - (menuWidth / 2)
    };
  },

  handleActivateButton(e) {
    // var target = e.target.nodeName == 'BUTTON' ? e.target : e.target.parentNode;
    // var action = target.getAttribute('data-action');
    // var active = target.className.indexOf('active') != -1;

    // // toggle link mode
    // if ((action == 'Link' && !active) || action == 'cancelLink') {
    //   this.setState({linkMode: (action == 'Link')});

    // } else if (action) {
    //   this.button.press(this.props.selection, this.props.content, action);
    // }
  },

  // build buttons from children
  buttons() {
    var buttons = [];
    React.Children.forEach(this.props.children, (child, i) => {
      var cloned = cloneWithProps(child, {
        content: this.props.content,
        selection: this.props.selection,
        onActivate: this.handleActivateButton.bind(this, child)
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
            {this.buttons()}
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
