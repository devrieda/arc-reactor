var expect = require('expect');
var assert = require('assert');

var KeyIntent = require('../../lib/modules/KeyIntent');

describe('KeyIntent', () => {

  describe('#getIntent', () => {

    it('finds intent for bold hotkey', () => {
      var event = {
        keyCode: 66,
        metaKey: true
      }
      var keyIntent = new KeyIntent(event);

      var intent = keyIntent.getIntent();
      expect(intent).toEqual('Bold');
    })

    it('finds intent for italic hotkey', () => {
      var event = {
        keyCode: 73,
        metaKey: true
      }
      var keyIntent = new KeyIntent(event);

      var intent = keyIntent.getIntent();
      expect(intent).toEqual('Italic');
    })

    it('finds intent for center hotkey', () => {
      var event = {
        keyCode: 69,
        metaKey: true
      }
      var keyIntent = new KeyIntent(event);

      var intent = keyIntent.getIntent();
      expect(intent).toEqual('Center');
    })

    it('finds intent for focus toolbar hotkey', () => {
      var event = {
        keyCode: 121,
        altKey: true
      }
      var keyIntent = new KeyIntent(event);

      var intent = keyIntent.getIntent();
      expect(intent).toEqual('Toolbar');
    })

    it('finds intent for return key', () => {
      var event = {
        keyCode: 13
      }
      var keyIntent = new KeyIntent(event);

      var intent = keyIntent.getIntent();
      expect(intent).toEqual('Return');
    })

    it('finds intent for delete key', () => {
      var event = {
        keyCode: 46
      }
      var keyIntent = new KeyIntent(event);

      var intent = keyIntent.getIntent();
      expect(intent).toEqual('Delete');
    })

    it('finds intent for bspace key', () => {
      var event = {
        keyCode: 8
      }
      var keyIntent = new KeyIntent(event);

      var intent = keyIntent.getIntent();
      expect(intent).toEqual('Bspace');
    })
  })
})
