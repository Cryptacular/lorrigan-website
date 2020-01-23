<template>
  <div v-show="articles.length > 0 || loading">
    <h1>Articles</h1>
    <div class="lr-tile-loading" v-if="loading">
      <i class="lr-icon lr-icon--loading" />
    </div>
    <div class="lr-tileContainer" v-else>
      <Tile
        v-for="article in articles"
        v-bind:key="article.id"
        :item="article"
        :on-click="readArticle"
      />
    </div>
  </div>
</template>

<script>
import Tile from "./Tile.vue";
import { DatabaseService } from "../services/DatabaseService.js";

const db = new DatabaseService();

export default {
  data: function() {
    return {
      articles: [],
      loading: true
    };
  },
  components: { Tile },
  methods: {
    fetchArticles() {
      db.get("articles").then(articles => {
        this.$set(this, "articles", articles);
        this.loading = false;
      });
    },
    readArticle(article) {
      this.$emit("read-article", article);
    }
  },
  created() {
    this.fetchArticles();
  }
};
</script>
