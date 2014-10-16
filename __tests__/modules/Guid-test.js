jest.dontMock('../../app/modules/Guid');

describe('Guid', function() {
  it('generates a unique guid', function() {
    var Guid = require('../../app/modules/Guid');
    var id1 = Guid.unique();
    var id2 = Guid.unique();

    expect(id1).not.toBe(id2);
  });
});
