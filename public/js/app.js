const icons = {
  play: `<img src="/icons/play.svg" class="lr-icon" />`,
  externalLink: `<img src="/icons/external-link.svg" class="lr-icon" />`
};

function extractDomainFromUrl(url) {
  const matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
  return (matches && matches[1]) || "...";
}

const overlayApp = new Vue({
  el: "#overlayApp",
  data: {
    shouldShow: false,
    title: "",
    storyContent: null,
    gameContent: null
  },
  template: `<div class="lr-overlay" v-if="shouldShow">
      <div>
        <h1>{{ title }}</h1>
        <a href="#" v-on:click="close()">x</a>
      </div>
      <div v-if="gameContent">
        <p>Game Content</p>
      </div>
      <div v-if="storyContent">
        <p>Story Content</p>
      </div>
    </dv>`,
  methods: {
    playGame(game) {
      this.shouldShow = true;
      this.title = game.title;

      fetch(`/api/game/${game.id}`)
        .then(r => r.json())
        .then(r => {
          this.gameContent = r;
        });
    },
    readStory(story) {
      this.shouldShow = true;
      this.title = story.title;

      fetch(`/api/story/${story.id}`)
        .then(r => r.json())
        .then(r => {
          this.storyContent = r.content;
        });
    },
    close() {
      this.shouldShow = false;
      this.storyContent = null;
      this.gameContent = null;
    }
  }
});

new Vue({
  el: "#gamesApp",
  data: {
    games: []
  },
  template: `<div class="lr-tileContainer">
        <article class="lr-tile" v-for="game in games">
            <h1>{{ game.title }}</h1>
            <p>{{ game.description }}</p>
            <a v-if="game.url" :href="game.url" target="_blank" class="lr-tile-button">
                <span class="lr-tileButton-link">
                    {{ extractDomainFromUrl(game.url) }}
                </span>
                <span class="lr-tileButton-icon">${icons.externalLink}</span>
            </a>
            <a v-else v-on:click="playGame(game)" class="lr-tile-button">
                <span class="lr-tileButton-icon">${icons.play}</span>
            </a>
        </article>
      </div>`,
  methods: {
    fetchGames() {
      fetch("/api/games")
        .then(res => res.json())
        .then(games => this.$set(this, "games", games));
    },
    playGame(game) {
      overlayApp.playGame(game);
    },
    extractDomainFromUrl(url) {
      return extractDomainFromUrl(url);
    }
  },
  created() {
    this.fetchGames();
  }
});

new Vue({
  el: "#storiesApp",
  data: {
    stories: []
  },
  template: `<div class="lr-tileContainer">
          <article class="lr-tile" v-for="story in stories">
              <h1>{{ story.title }}</h1>
              <p>{{ story.description }}</p>
              <a v-if="story.url" :href="story.url" class="lr-tile-button">
                <span class="lr-tileButton-link">
                    {{ extractDomainFromUrl(story.url) }}
                </span>
                <span class="lr-tileButton-icon">${icons.externalLink}</span>
              </a>
              <a v-else v-on:click="readStory(story)" class="lr-tile-button">
                <span class="lr-tileButton-icon">${icons.play}</span>
              </a>
          </article>
        </div>`,
  methods: {
    fetchStories() {
      fetch("/api/stories").then(res => {
        res.json().then(stories => {
          this.$set(this, "stories", stories);
        });
      });
    },
    readStory(story) {
      overlayApp.readStory(story);
    },
    extractDomainFromUrl(url) {
      return extractDomainFromUrl(url);
    }
  },
  created() {
    this.fetchStories();
  }
});
