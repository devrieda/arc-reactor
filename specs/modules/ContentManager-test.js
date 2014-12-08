var expect = require('expect');
var React = require('react');

var ContentManager = require('../../lib/modules/ContentManager');

describe('ContentManager', () => {

  var content;

  beforeEach(() => {
    content = {
      "sections": [
        {
          "id": "de5f",
          "blocks": [
            {
              "id": "56ef",
              "type": "p",
              "text": "this is the first paragraph"
            },
            {
              "id": "667a",
              "type": "p",
              "text": "and this is the second"
            }
          ]
        }
      ]
    }
  })

  describe('#findBlock', () => {
    it('finds block by guid', () => {
    })
  })

})
