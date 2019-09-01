<template>
  <article class="lr-tile" v-bind:key="item.id" v-bind:class="isLastOddTile">
    <h1>{{ item.title }}</h1>
    <p v-for="descr in item.description.split('\n')" :key="descr">{{ descr }}</p>
    <div class="lr-tile-action">
      <a v-if="item.url" :href="item.url.trim()" target="_blank" class="lr-tile-button">
        <span class="lr-tileButton-link">{{ extractDomainFromUrl(item.url) }}</span>
        <span class="lr-tileButton-icon">
          <i class="lr-icon lr-icon--externalLink" />
        </span>
      </a>
      <a v-else v-on:click="onClick(item)" class="lr-tile-button">
        <span class="lr-tileButton-icon">
          <i class="lr-icon lr-icon--play" />
        </span>
      </a>
    </div>
  </article>
</template>

<script>
import { extractDomainFromUrl } from "../utils/url";

export default {
  props: ["item", "onClick"],
  computed: {
    isLastOddTile: function() {
      if (
        this.item.index === this.item.total - 1 &&
        this.item.index % 2 === 0
      ) {
        return "lr-tile--lastOdd";
      }
      return "";
    }
  },
  methods: {
    extractDomainFromUrl(url) {
      return extractDomainFromUrl(url.trim());
    }
  }
};
</script>
