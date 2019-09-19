const fs = require("fs");
const path = require("path");
const assert = require("assert");

describe("Games", () => {
  describe("JSON", () => {
    let games;

    beforeEach(() => {
      games = require("../api/assets/games.json");
    });

    it("should have `id` for each entry", () => {
      for (let i = 0; i < games.length; i++) {
        const g = games[i];
        assert.notEqual(g.id, undefined, `ID missing for ${g.title}`);
      }
    });

    it("should have `title` for each entry", () => {
      for (let i = 0; i < games.length; i++) {
        const g = games[i];
        assert.notEqual(g.title, undefined, `Title missing for ${g.id}`);
      }
    });

    it("should have `description` for each entry", () => {
      for (let i = 0; i < games.length; i++) {
        const g = games[i];
        assert.notEqual(
          g.description,
          undefined,
          `Description missing for ${g.id}`
        );
      }
    });

    describe("URLs", () => {
      it("should start with `http://` or `https://`", () => {
        for (let i = 0; i < games.length; i++) {
          const g = games[i];
          const { url } = g;

          if (!url) {
            continue;
          }

          const matches = url.match(/^https?\:\/\//);
          assert.equal(matches.length, 1, `Invalid URL for ${g.id}`);
        }
      });
    });

    describe("assets", () => {
      it("should exist for each entry without url", () => {
        for (let i = 0; i < games.length; i++) {
          const g = games[i];
          const { url, id } = g;

          if (url) {
            continue;
          }

          assert.doesNotThrow(() => {
            fs.readFileSync(
              path.resolve(__dirname, `../api/assets/games/${id}.json`),
              "utf8"
            );
          }, `No asset exists for ${id}`);
        }
      });

      it("should be valid JSON", () => {
        for (let i = 0; i < games.length; i++) {
          const g = games[i];
          const { url, id } = g;

          if (url) {
            continue;
          }

          const asset = fs.readFileSync(
            path.resolve(__dirname, `../api/assets/games/${id}.json`),
            "utf8"
          );

          assert.doesNotThrow(() => {
            JSON.parse(asset);
          }, `Invalid JSON for ${id}.json`);
        }
      });
    });
  });
});
