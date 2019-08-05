import Vue from "vue";
import * as ink from "inkjs";

import { startInk } from "./vendor/ink/startInk";
import { extractDomainFromUrl } from "./utils/url";

const overlayApp = new Vue({
  el: "#overlayApp",
  data: {
    shouldShow: false,
    loading: true,
    title: "",
    storyContent: null,
    gameContent: null
  },
  template: `<div class="lr-overlay" v-bind:class="{ show: shouldShow }">
        <div class="lr-overlay-tile">
          <div class="lr-overlay-header">
            <h1 class="lr-overlay-title">{{ title }}</h1>
            <a class="lr-overlay-close" v-on:click="close()">
              <i class="lr-icon lr-icon--close" />
            </a>
          </div>
          <div v-show="loading" class="lr-overlay-loading">
            <i class="lr-icon lr-icon--loading" />
          </div>
          <div v-show="gameContent" class="lr-overlay-content" id="inkOuterContainer">
            <div id="inkContainer" class="lr-inkContainer"></div>
          </div>
          <div v-show="storyContent" class="lr-overlay-content">
            <p>Story Content</p>
          </div>
        </div>
      </dv>
    </div>`,
  methods: {
    playGame(game) {
      this.shouldShow = true;
      this.title = game.title;
      this.loading = true;

      fetch(`/api/game/${game.id}`)
        .then(r => r.json())
        .then(r => {
          this.gameContent = r;
          this.loading = false;
          startInk(this.gameContent, "inkContainer", ink);
        });
    },
    readStory(story) {
      this.shouldShow = true;
      this.title = story.title;
      this.loading = true;

      fetch(`/api/story/${story.id}`)
        .then(r => r.json())
        .then(r => {
          this.storyContent = r.content;
          this.loading = false;
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
    games: [],
    loading: true
  },
  template: `<div>
        <div class="lr-tile-loading" v-if="loading">
          <i class="lr-icon lr-icon--loading" />
        </div>
        <div class="lr-tileContainer" v-else>
          <article class="lr-tile" v-for="game in games">
              <h1>{{ game.title }}</h1>
              <p>{{ game.description }}</p>
              <a v-if="game.url" :href="game.url" target="_blank" class="lr-tile-button">
                  <span class="lr-tileButton-link">
                      {{ extractDomainFromUrl(game.url) }}
                  </span>
                  <span class="lr-tileButton-icon">
                    <i class="lr-icon lr-icon--externalLink" />
                  </span>
              </a>
              <a v-else v-on:click="playGame(game)" class="lr-tile-button">
                  <span class="lr-tileButton-icon">
                    <i class="lr-icon lr-icon--play" />
                  </span>
              </a>
          </article>
        </div>
      </div>`,
  methods: {
    fetchGames() {
      fetch("/api/games")
        .then(res => res.json())
        .then(games => {
          this.$set(this, "games", games);
          this.loading = false;
        });
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
    stories: [],
    loading: true
  },
  template: `<div>
          <div class="lr-tile-loading" v-if="loading">
            <i class="lr-icon lr-icon--loading" />
          </div>
          <div class="lr-tileContainer" v-else>
            <article class="lr-tile" v-for="story in stories">
                <h1>{{ story.title }}</h1>
                <p>{{ story.description }}</p>
                <a v-if="story.url" :href="story.url" class="lr-tile-button">
                  <span class="lr-tileButton-link">
                      {{ extractDomainFromUrl(story.url) }}
                  </span>
                  <span class="lr-tileButton-icon">
                    <i class="lr-icon lr-icon--externalLink" />
                  </span>
                </a>
                <a v-else v-on:click="readStory(story)" class="lr-tile-button">
                  <span class="lr-tileButton-icon">
                    <i class="lr-icon lr-icon--play" />
                  </span>
                </a>
            </article>
          </div>
        </div>`,
  methods: {
    fetchStories() {
      fetch("/api/stories").then(res => {
        res.json().then(stories => {
          this.$set(this, "stories", stories);
          this.loading = false;
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
