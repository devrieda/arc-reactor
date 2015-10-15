// import TweetPlugin from "./twitter";
// import ImageUploadPlugin from "./image_upload";

const Config = {

  /**
   * Plugins provided by ARC. If left empty, it will install all defaults
   */
  arcPlugins() {
    return [
      "bold", "italic", "h1", "h2", "h3", "center", "quote", "link", "code"
    ];
  },

  plugins() {
    return [
      // { name: "tweet", src: TweetPlugin }
      // { name: "image_upload", src: ImageUploadPlugin }
    ];
  },

  menuButtons() {
    return [
      "bold", "italic", "h1", "h2", "h3", "center", "quote", "link"
    ];
  },

  barButtons() {
    return [
      "section"
    ];
  }
};

export default Config;
