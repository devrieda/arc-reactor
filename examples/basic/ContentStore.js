var ContentStore = {
  findNew: function() {
    return (
      {"sections": [
        {
          "id": "de5f",
          "blocks": [
            {
              "id": "56ef",
              "type": "h2",
              "text": "Page Title"
            },
            {
              "id": "667a",
              "type": "p",
              "text": "Build your page here"
            }
          ]
        }
      ]}
    );
  },
  find: function() {
    return (
      {"sections": [
        {
          "id": "de5f",
          "blocks": [
            {
              "id": "56ef",
              "type": "h2",
              "text": "History of Photography"
            },
            {
              "id": "667a",
              "type": "p",
              "text": "Photography is a word derived from the Greek words photos (“light”) and graphein (“to draw”) The word was first used by the scientist Sir John F.W. Herschel in 1839."
            },
            {
              "id": "67a3",
              "type": "p",
              "text": "The metal-based daguerreotype process soon had some competition from the paper-based calotype negative and salt print processes invented by Henry Fox Talbot."
            },
            {
              "id": "667b",
              "type": "blockquote",
              "text": "For me, the camera is a sketch book, an instrument of intuition and spontaneity."
            },
            {
              "id": "c277",
              "type": "h3",
              "text": "Pinhole Camera"
            },
            {
              "id": "cca9",
              "type": "p",
              "text": "Alhazen (Ibn Al-Haytham), a great authority on optics in the Middle Ages who lived around 1000AD, invented the first pinhole camera, (also called the Camera Obscura and was able to explain why the images were upside down."
            },
            {
              "id": "a141",
              "type": "h4",
              "text": "The First Photograph"
            },
            {
              "id": "59b1",
              "type": "ul",
              "blocks": [
                {
                  "id": "4007",
                  "type": "li",
                  "text": "Joseph Nicephore Niepce"
                },
                {
                  "id": "4ca9",
                  "type": "li",
                  "text": "View from an upstairs window at Niépce's estate"
                }
              ]
            },
            {
              "id": "fce3",
              "type": "h4",
              "text": "Alfred Steiglitz"
            },
            {
              "id": "dc62",
              "type": "ol",
              "blocks": [
                {
                  "id": "f5a4",
                  "type": "li",
                  "text": "Early years (1864–1890)"
                },
                {
                  "id": "cc96",
                  "type": "li",
                  "text": "New York and the Camera Club (1891–1901)"
                }
              ]
            }
          ]
        },
        {
          "id": "9fb3",
          "blocks": [
            {
              "id": "6353",
              "type": "p",
              "text": "Development of Photography as a Technology in different eras",
              "meta": {
                "align": "center"
              }
            },
            {
              "id": "e07e",
              "type": "p",
              "text": "The metal-based daguerreotype process soon had some competition from the paper-based calotype negative and salt print processes invented by Henry Fox Talbot. Subsequent innovations reduced the required camera exposure time from minutes to seconds and eventually to a small fraction of a second",
              "markups": {
                "links": [{ 
                  "begin": 16, "end": 29, "url": "http://google.com"
                }]
              }
            },
            {
              "id": "1d6f",
              "type": "p",
              "text": "And something here bold and italic words.",
              "markups": {
                "bolds": [{ 
                  "begin": 19, "end": 23
                }],
                "italics": [{
                  "begin": 28, "end": 34
                }]
              }
            },
            {
              "id": "067c",
              "type": "blockquote",
              "text": "Today everything exists to end in a photograph.",
              "meta": {
                "align": "center"
              }
            },
            {
              "id": "e5fe",
              "type": "p",
              "text": "And more paragraphs of text that are <b>escaped</b>"
            },
            {
              "id": "e5ff",
              "type": "p",
              "text": "And that can combine both markup and <b>escaped</b>",
              "markups": {
                "bolds": [{
                  "begin": 21, "end": 25
                }],
                "italics": [{
                  "begin": 21, "end": 25
                }],
                "links": [{
                  "begin": 21, "end": 25, "url": "http://google.com"
                }]
              }

            }

          ]
        }
      ]}
    )
  },
  update: function(json) {
    var str = JSON.stringify(json);
    //
    // save when content changes
    //
  }
}

module.exports = ContentStore;
