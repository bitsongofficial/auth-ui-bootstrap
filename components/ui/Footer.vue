<template>
  <v-footer class="text-center transparent">
    <v-container>
      <v-row no-gutters>
        <v-col cols="12" class="text-center caption">
          <router-link
            :to="link.to"
            class="pr-2"
            v-for="(link, i) in links"
            :key="i"
            v-text="link.label"
          />
        </v-col>
        <v-col cols="12" class="text-center caption">
          &copy; {{ copyrightLabel }}
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  props: {
    links: {
      type: Array,
      default() {
        return [
          {
            label: "Terms of Service",
            to: "/"
          },
          {
            label: "Privacy Policy",
            to: "/"
          }
        ];
      }
    },
    copyrightLabel: {
      type: String,
      default: `BitSong Group Ltd 2018 - ${new Date().getFullYear()}`
    }
  }
};
</script>
