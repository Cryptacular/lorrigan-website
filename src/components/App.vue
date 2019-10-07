<template>
  <div>
    <SectionContent name="about" />

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
      :opened-time="overlay.openedTime"
      v-on:overlay-closed="closeOverlay"
    />
  </div>
</template>

<script>
import SectionContent from "./SectionContent.vue";
import Games from "./Games.vue";
import Stories from "./Stories.vue";
import Overlay from "./Overlay.vue";
import { StorageService } from "../services/StorageService";
import { startInk } from "../vendor/ink/startInk";
import { trackTiming, trackEvent } from "../utils/analytics";

const storage = new StorageService();

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
        gameContent: null,
        openedTime: null
      }
    };
  },
  components: { SectionContent, Games, Stories, Overlay },
  methods: {
    playGame(game) {
      this.overlay.title = game.title;
      this.overlay.loading = true;
      this.overlay.shouldShow = true;

      const startedLoading = new Date();
      this.overlay.openedTime = startedLoading;

      storage
        .get(`games/${game.id}.json`)
        .then(r => r.json())
        .then(r => {
          import(/* webpackChunkName: "inkjs" */ "inkjs").then(ink => {
            this.overlay.id = game.id;
            this.overlay.gameContent = r;
            this.overlay.loading = false;

            startInk(this.overlay.gameContent, "inkContainer", ink);

            const finishedLoading = new Date();

            trackTiming(
              "game",
              "load",
              finishedLoading - startedLoading,
              game.title
            );
          });
        });

      trackEvent("game", "click", game.title);
    },
    readStory(story) {
      this.overlay.title = story.title;
      this.overlay.loading = true;
      this.overlay.shouldShow = true;

      const startedLoading = new Date();

      storage
        .get(`stories/${story.id}.md`)
        .then(r => r.text())
        .then(r => {
          import(/* webpackChunkName: "markdown-it" */ "markdown-it").then(
            ({ default: MarkdownIt }) => {
              const md = new MarkdownIt();
              this.overlay.id = story.id;
              this.overlay.storyContent = md.render(r);
              this.overlay.loading = false;

              const finishedLoading = new Date();
              this.overlay.openedTime = finishedLoading;

              trackTiming(
                "story",
                "load",
                finishedLoading - startedLoading,
                story.title
              );
            }
          );
        });

      trackEvent("story", "click", story.title);
    },
    closeOverlay: function() {
      const { openedTime, storyContent, title } = this.overlay;
      const closedTime = new Date();

      if (openedTime !== null) {
        const readingTime = closedTime - openedTime;
        const readingTimeInSeconds = Math.round(readingTime / 1000);

        trackTiming(
          storyContent === null ? "game" : "story",
          "reading-time-seconds",
          readingTimeInSeconds,
          title
        );
      }

      this.overlay.shouldShow = false;
      this.overlay.storyContent = null;
      this.overlay.gameContent = null;
      this.overlay.openedTime = null;
    }
  }
};
</script>
