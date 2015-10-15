import TweetPlugin from "./twitter";

const Config = {
  // default plugins provided by ARC are:
  // code:
  //   - allow for simple inline code formatting
  plugins() {
    return [
      { name: "bold" },
      { name: "italic" },
      { name: "h1" },
      { name: "h2" },
      { name: "h3" },
      { name: "center" },
      { name: "quote" },
      { name: "code" },
      { name: "link" },
      // { name: "tweet", src: TweetPlugin }
    ];
  },

  menuButtons() {
    return [
      "bold", "italic", "h1", "h2", "h3", "center", "quote", "link"
    ];
  },

  barButtons() {
    return [
      "image", "section"
    ];
  }
};

export default Config;
