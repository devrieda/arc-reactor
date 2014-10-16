jest.dontMock('../../app/modules/Formatter');

describe('Formatter', function() {
  it('formats text with anchor tag', function() {
    var Formatter = require('../../app/modules/Formatter');
    var format = new Formatter('a string of linked text');

    var expected = 'a string of linked text';
    expect(format.applyMarkup({})).toBe(expected);
  });
});

