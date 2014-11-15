var expect = require('expect');
var React = require('react');

var Formatter = require('../../lib/modules/Formatter');

describe('Formatter', function() {
  it('formats text with anchor tag', function() {
    var format = new Formatter('a string of linked text');

    var expected = 'a string of linked text';
    expect(format.applyMarkup({})).toBe(expected);
  });
});
