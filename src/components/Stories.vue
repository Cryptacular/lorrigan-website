<template>
  <div v-show="stories.length > 0 || loading">
    <h1>Short Stories</h1>
    <div class="lr-tile-loading" v-if="loading">
      <i class="lr-icon lr-icon--loading" />
    </div>
    <div class="lr-tileContainer" v-else>
      <Tile v-for="story in stories" v-bind:key="story.id" :item="story" :on-click="readStory" />
    </div>
  </div>
</template>

<script>
import Tile from "./Tile.vue";
import { DatabaseService } from "../services/DatabaseService.js"

const db = new DatabaseService();

export default {
  data: function() {
    return {
      stories: [],
      loading: true
    };
  },
  components: { Tile },
  methods: {
    fetchStories() {
      db.get("stories")
        .then(stories => {
          this.$set(this, "stories", stories);
          this.loading = false;
        })
    },
    readStory(story) {
      this.$emit("read-story", story);
    }
  },
  created() {
    this.fetchStories();
  }
};
</script>
