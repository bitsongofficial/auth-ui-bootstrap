<template>
  <div>
    <div class="pt-8 pl-4">
      <router-link to="/" aria-label="BitSong" title="BitSong">
        <img src="/bitsong_logo_red.svg" :width="180" />
      </router-link>
    </div>
    <v-card-title class="text-h5 pt-4">{{ title }}</v-card-title>
    <v-card-subtitle class="py-2 grey--text text--darken-2">
      {{ subtitle }}
    </v-card-subtitle>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    subtitle: {
      type: String,
      default: ""
    }
  }
};
</script>
