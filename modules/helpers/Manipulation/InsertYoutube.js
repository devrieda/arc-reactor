import ContentFinder from '../ContentFinder';

class InsertYoutube {
  constructor(content) {
    this.content = content;
  }

  execute(guids, _offsets, options) {
    const src = options.src;

    const guid  = guids.anchor;
    const path  = this._finder().findPath(guid);
    let block = this.content.getIn(path);

    const youTubeId = this._parseYouTube(src);
    if (youTubeId) {
      block = block.merge({
        type: 'youtube',
        text: '',
        meta: {
          src: `https://www.youtube.com/embed/${youTubeId}`,
        }
      });
    }

    this.content = this.content.setIn(path, block);
    return {
      content: this.content,
      position: {
        guid: block.get('id'),
        offset: 0
      }
    };
  }

  // Will match these formats:
  //
  // http://www.youtube.com/watch?v=0zM3nApSvMg&feature=feedrec_grec_index
  // http://www.youtube.com/user/IngridMichaelsonVEVO#p/a/u/1/QdK8U-VIH_o
  // http://www.youtube.com/v/0zM3nApSvMg?fs=1&amp;hl=en_US&amp;rel=0
  // http://www.youtube.com/watch?v=0zM3nApSvMg#t=0m10s
  // http://www.youtube.com/embed/0zM3nApSvMg?rel=0
  // http://www.youtube.com/watch?v=0zM3nApSvMg
  // http://youtu.be/0zM3nApSvMg
  //
  _parseYouTube(url) {
    const regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[1] && match[1].length === 11) {
      return match[1];
    } else {
      return false;
    }
  }

  _finder() {
    return new ContentFinder(this.content);
  }
}

export default InsertYoutube;
