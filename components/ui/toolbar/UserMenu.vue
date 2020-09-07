<template>
  <div class="text-center">
    <v-menu v-model="menu" :nudge-width="200" offset-y>
      <v-card width="300">
        <v-list>
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.to"
            router
            exact
          >
            <v-list-item-action>
              <v-icon color="grey darken-1">{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-title v-text="item.title" />
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-list-item>
            <v-list-item-action>
              <v-icon color="grey darken-1">mdi-brightness-4</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Theme</v-list-item-title>
              <v-list-item-subtitle>{{
                dark_theme ? `dark` : `light`
              }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-switch
                v-model="$vuetify.theme.dark"
                @click="toggleTheme"
              ></v-switch>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
// import Jdenticon from '@/components/jdenticon'
//import Avatar from "vue-avatar";
export default {
  components: {
    //Jdenticon,
    //Avatar
  },
  data() {
    return {
      menu: false
    };
  },
  methods: {
    toggleTheme() {
      this.$store.commit(`user/toggleTheme`);
      this.$vuetify.theme.dark = this.dark_theme;
    }
  },
  computed: {
    email() {
      return this.$store.getters[`user/email`];
    },
    dark_theme() {
      return this.$store.getters[`user/dark_theme`];
    },
    items() {
      return [
        {
          icon: "mdi-wallet",
          title: "Profile",
          to: "/account/personal-info"
        },
        {
          icon: "mdi-exit-to-app",
          title: "Log out",
          to: "/auth/logout"
        }
      ];
    }
  }
};
</script>

<style scoped>
.v-list-item__title,
.v-list-item__subtitle {
  white-space: normal;
}
</style>
