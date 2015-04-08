var Immutable = require('immutable');

/**
 * Use to enforce immutable propTypes
 *
 * propTypes: {
 *   improps: React.PropTypes.instanceOf(Immutable.Map),
 *   name: impropType.impropString,
 *   required: impropType.impropBool,
 *   errors: impropType.immutableList
 * }
 *
 */
function impropType(expectedType) {
  return function(props, propName, componentName) {
    var propType = typeof props.improps.get(propName);
    if (propType !== expectedType) {
      return new Error(
        `Warning: Invalid prop '${propName}' of type '${propType}' ` +
        `supplied to '${componentName}'; expected '${expectedType}'.`
      );
    }
  };
}

function impropImmutableInstance(expectedConstructor) {
  return function(props, propName, componentName) {
    if (!(props.improps.get(propName) instanceof expectedConstructor)) {
      return new Error(
        `Warning: Invalid prop '${propName}' supplied to '${componentName}'; ` +
        `expected instance of '${expectedConstructor.name}'.`
      );
    }
  };
}

var impropType = {
  impropString: impropType('string'),
  impropBool: impropType('boolean'),
  immutableList: impropImmutableInstance(Immutable.List)
};

module.exports = impropType;
