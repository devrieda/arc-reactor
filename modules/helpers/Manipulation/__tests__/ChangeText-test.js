import { fromJS } from 'immutable';
import ChangeText from '../ChangeText';

describe('ChangeText', () => {
  let content;

  function createNode(html) {
    const p = document.createElement('p');
    p.innerHTML = html;
    return p;
  }

  beforeEach(() => {
    content = {
      "sections": [
        {
          "id": "de5f",
          "blocks": []
        }
      ]
    };
  });

  describe('#execute', () => {
    it('should update text in a block', () => {
      const block = {
        "id": "c6a8",
        "type": "p",
        "text": "cable?"
      };
      content.sections[0].blocks = [block];
      const manager = new ChangeText(fromJS(content));

      const guids = { anchor: 'c6a8', focus: 'c6a8' };
      const result = manager.execute(guids, {},
        { text: 'cable!!!', node: createNode('this is some text') }
      );

      const blocks = result.content.toJS().sections[0].blocks;
      expect(blocks[0].text).to.equal('cable!!!');
    });

    it('should parse markup from a given node', () => {
    });
  });
});
