<template>
  <div class="lr-overlay" v-bind:class="{ show: shouldShow }">
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
      <div v-if="error" class="lr-overlay-error">
        <div>
          <i class="lr-icon lr-icon--close" />
        </div>
        <div>{{error}}</div>
      </div>
      <div v-show="gameContent" class="lr-overlay-content" id="inkOuterContainer">
        <div id="inkContainer" class="lr-inkContainer"></div>
      </div>
      <div v-show="storyContent" v-html="storyContent" class="lr-overlay-content"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "should-show",
    "loading",
    "error",
    "title",
    "story-content",
    "game-content"
  ],
  methods: {
    close() {
      this.$emit("overlay-closed");
      document.getElementById("inkContainer").innerText = "";
    }
  }
};
</script>

<style scoped>
.lr-overlay-error {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>

