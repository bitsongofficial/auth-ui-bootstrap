<template>
  <v-app>
    <v-content>
      <nuxt />
    </v-content>
    <ui-footer />
  </v-app>
</template>

<script>
import UiFooter from "@/components/ui/Footer";

export default {
  components: {
    UiFooter
  }
};
</script>
