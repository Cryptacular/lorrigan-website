<template>
  <div>
    <section class="lr-section--wide">
      <Games v-on:play-game="playGame" />
    </section>

    <section class="lr-section--wide">
      <Stories v-on:read-story="readStory" />
    </section>

    <Overlay
      :id="overlay.id"
      :should-show="overlay.shouldShow"
      :loading="overlay.loading"
      :error="overlay.error"
      :title="overlay.title"
      :story-content="overlay.storyContent"
      :game-content="overlay.gameContent"
      v-on:overlay-closed="closeOverlay"
    />
  </div>
</template>

<script>
import Games from "./Games.vue";
import Stories from "./Stories.vue";
import Overlay from "./Overlay.vue";
import { startInk } from "../vendor/ink/startInk";

export default {
  data: function() {
    return {
      overlay: {
        id: "",
        shouldShow: false,
        loading: true,
        error: null,
        title: "",
        storyContent: null,
        gameContent: null
      }
    };
  },
  components: { Games, Stories, Overlay },
  methods: {
    playGame(game) {
      this.overlay.title = game.title;
      this.overlay.loading = true;
      this.overlay.shouldShow = true;

      fetch(`/api/game/${game.id}`)
        .then(r => {
          if (r.status !== 200) {
            this.overlay.error = "Oops, game not found!";
            this.overlay.loading = false;
            return;
          }
          return r.json();
        })
        .then(r => {
          import(/* webpackChunkName: "inkjs" */ "inkjs").then(ink => {
            this.overlay.id = game.id;
            this.overlay.gameContent = r;
            this.overlay.loading = false;

            startInk(this.overlay.gameContent, "inkContainer", ink);
          });
        });
    },
    readStory(story) {
      this.overlay.title = story.title;
      this.overlay.loading = true;
      this.overlay.shouldShow = true;

      fetch(`/api/story/${story.id}`)
        .then(r => {
          if (r.status !== 200) {
            this.overlay.error = "Oops, story not found!";
            this.overlay.loading = false;
            return;
          }
          return r.json();
        })
        .then(r => {
          import(/* webpackChunkName: "markdown-it" */ "markdown-it").then(
            ({ default: MarkdownIt }) => {
              const md = new MarkdownIt();
              this.overlay.id = story.id;
              this.overlay.storyContent = md.render(r.content);
              this.overlay.loading = false;
            }
          );
        });
    },
    closeOverlay: function() {
      this.overlay.shouldShow = false;
      this.overlay.storyContent = null;
      this.overlay.gameContent = null;
    }
  }
};
</script>
