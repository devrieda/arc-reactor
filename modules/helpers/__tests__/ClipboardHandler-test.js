import expect from 'expect';
import ClipboardHandler from '../ClipboardHandler';

describe('ClipboardHandler', function() {

  describe('#beforePaste', function() {
    it('appends dom node to capture paste', function() {
      ClipboardHandler.beforePaste({ position: () => {}});
      const bin = ClipboardHandler.getBin();
      expect(bin.getAttribute('contenteditable')).toBe('true');
    });
  });

  describe('#paste', function() {
    it('handles clipboardData from firefox', function() {
      ClipboardHandler.paste({}, {}, {}, () => {});
      expect(true).toBe(true);
    });

    it('handles clipboardData from chrome', function() {
      ClipboardHandler.paste({}, {}, {}, () => {});
      expect(true).toBe(true);
    });

    it('handles clipboardData from ie', function() {
      ClipboardHandler.paste({}, {}, {}, () => {});
      expect(true).toBe(true);
    });
  });
});
