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
      fetch("/api/games")
        .then(res => res.json())
        .then(games => {
          games = games.map((g, i, arr) => {
            return { ...g, index: i, total: arr.length };
          });
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
