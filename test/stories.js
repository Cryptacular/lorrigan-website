const fs = require("fs");
const path = require("path");
const assert = require("assert");
const MarkdownIt = require("markdown-it");

const md = new MarkdownIt();

describe("Stories", () => {
  let stories;

  beforeEach(() => {
    stories = require("../api/assets/stories.json");
  });

  describe("JSON", () => {
    it("should have `id` for each entry", () => {
      for (let i = 0; i < stories.length; i++) {
        const s = stories[i];
        assert.notEqual(s.id, undefined);
      }
    });

    it("should have `title` for each entry", () => {
      for (let i = 0; i < stories.length; i++) {
        const s = stories[i];
        assert.notEqual(s.title, undefined);
      }
    });

    it("should have `description` for each entry", () => {
      for (let i = 0; i < stories.length; i++) {
        const s = stories[i];
        assert.notEqual(s.description, undefined);
      }
    });

    describe("URLs", () => {
      it("should start with `http://` or `https://`", () => {
        for (let i = 0; i < stories.length; i++) {
          const s = stories[i];
          const { url } = s;

          if (!url) {
            continue;
          }

          const matches = url.match(/^https?\:\/\//);
          assert.equal(matches.length, 1);
        }
      });
    });
  });

  describe("assets", () => {
    it("should exist for each entry without url", () => {
      for (let i = 0; i < stories.length; i++) {
        const s = stories[i];
        const { url, id } = s;

        if (url) {
          continue;
        }

        assert.doesNotThrow(() => {
          fs.readFileSync(
            path.resolve(__dirname, `../api/assets/stories/${id}.md`)
          );
        });
      }
    });

    it("should be valid Markdown syntax", () => {
      for (let i = 0; i < stories.length; i++) {
        const s = stories[i];
        const { url, id } = s;

        if (url) {
          continue;
        }

        const asset = fs.readFileSync(
          path.resolve(__dirname, `../api/assets/stories/${id}.md`),
          "utf8"
        );

        assert.doesNotThrow(() => {
          md.render(asset);
        });
      }
    });
  });
});
