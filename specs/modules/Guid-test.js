var expect = require('expect');
var React = require('react');

var Guid = require('../../lib/modules/Guid');

describe('Guid', function() {
  it('generates a unique guid', function() {
    var id1 = Guid.unique();
    var id2 = Guid.unique();

    expect(id1).toNotBe(id2);
  });
});
