const Config = {
  // default plugins provided by ARC are:
  // code:
  //   - allow for simple inline code formatting
  plugins() {
    return [
      { name: "code" },
      // { name: "syntax", src: SyntaxPlugin }
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
