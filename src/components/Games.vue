<template>
  <div v-show="games.length > 0 || loading">
    <h1>Games</h1>
    <div class="lr-tile-loading" v-if="loading">
      <i class="lr-icon lr-icon--loading" />
    </div>
    <div class="lr-tileContainer" v-else>
      <Tile v-for="game in games" v-bind:key="game.id" :item="game" :on-click="playGame" />
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
      games: [],
      loading: true
    };
  },
  components: { Tile },
  methods: {
    fetchGames() {
      db.get("games")
        .then(games => {
          this.$set(this, "games", games);
          this.loading = false;
        });
    },
    playGame(game) {
      this.$emit("play-game", game);
    }
  },
  created() {
    this.fetchGames();
  }
};
</script>
