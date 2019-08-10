<template>
  <article class="lr-tile" v-bind:key="item.id">
    <h1>{{ item.title }}</h1>
    <p>{{ item.description }}</p>
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
  methods: {
    extractDomainFromUrl(url) {
      return extractDomainFromUrl(url.trim());
    }
  }
};
</script>
