<template>
  <section>
    <div class="lr-tile-loading" v-if="loading">
      <i class="lr-icon lr-icon--loading" />
    </div>
    <div v-if="content" v-html="content" class="lr-slideUp"></div>
  </section>
</template>

<script>
import { StorageService } from "../services/StorageService.js";

const storage = new StorageService();

export default {
  props: ["name"],
  data: function() {
    return {
      content: "",
      loading: true
    };
  },
  methods: {
    fetchContent() {
      storage
        .get(`${this.name}.md`)
        .then(r => r.text())
        .then(r => {
          import(/* webpackChunkName: "markdown-it" */ "markdown-it").then(
            ({ default: MarkdownIt }) => {
              const md = new MarkdownIt();
              this.content = md.render(r);
              this.loading = false;
            }
          );
        });
    }
  },
  created() {
    this.fetchContent();
  }
};
</script>
