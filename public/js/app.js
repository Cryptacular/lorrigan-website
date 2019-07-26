const icons = {
  play: `<img src="/icons/play.svg" class="lr-icon" />`,
  externalLink: `<img src="/icons/external-link.svg" class="lr-icon" />`
};

function extractDomainFromUrl(url) {
  const matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
  return (matches && matches[1]) || "...";
}

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
            <a v-else href="#" v-on:click="fetchGame(game)" class="lr-tile-button">
                <span class="lr-tileButton-icon">${icons.play}</span>
            </a>
        </article>
      </div>`,
  methods: {
    fetchGames() {
      fetch("/api/games").then(res => {
        res.json().then(games => {
          this.$set(this, "games", games);
        });
      });
    },
    fetchGame(game) {
      console.log(game);
    },
    extractDomainFromUrl(url) {
      return extractDomainFromUrl(url);
    }
  },
  mounted() {
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
              <a v-else href="#" v-on:click="fetchStory(story)" class="lr-tile-button">
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
    fetchStory(story) {
      console.log(story);
    },
    extractDomainFromUrl(url) {
      return extractDomainFromUrl(url);
    }
  },
  mounted() {
    this.fetchStories();
  }
});
