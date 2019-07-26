new Vue({
  el: "#gamesApp",
  data: {
    games: []
  },
  template: `<div class="lr-tileContainer">
        <article class="lr-tile" v-for="game in games">
            <h1>{{ game.title }}</h1>
            <p>{{ game.description }}</p>
            <button v-on:click="fetchGame(game)">Read</button>
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
              <button v-on:click="fetchStory(story)">Read</button>
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
    }
  },
  mounted() {
    this.fetchStories();
  }
});
