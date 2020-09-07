<template>
  <v-app>
    <client-only>
      <Toolbar v-on:toggleSideBar="sidebar = !sidebar" />
    </client-only>
    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
import Toolbar from "@/components/ui/Toolbar";

export default {
  components: {
    Toolbar
  },
  data() {
    return {
      sidebar: false
    };
  }
};
</script>

<style>
.theme--light.v-card > .v-card__text,
.theme--light.v-card .v-card__subtitle {
  color: rgba(0, 0, 0, 1);
}

.theme--light > .v-application--wrap {
  background-color: #eeeeee;
}

/* .theme--light.content {
  background-color: #f0f2f5;
} */
</style>
