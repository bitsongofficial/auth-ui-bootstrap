<template>
  <v-app-bar clipped-left fixed app flat>
    <router-link
      to="/"
      aria-label="BitSong"
      class="d-flex align-center"
      title="BitSong"
    >
      <img
        alt="BitSong"
        min-width="135"
        width="135"
        src="/bitsong_logo_red.svg"
      />
    </router-link>

    <v-spacer />

    <v-btn
      v-if="$vuetify.breakpoint.mdAndUp && !isLoggedIn"
      active-class="no-active"
      class="mr-2"
      text
      to="/wallet/create"
      >Create Wallet</v-btn
    >
    <v-btn
      v-if="$vuetify.breakpoint.mdAndUp && !isLoggedIn"
      active-class="no-active"
      color="primary"
      dark
      to="/wallet/import"
      >Unlock Wallet</v-btn
    >
    <v-btn
      v-if="$vuetify.breakpoint.smAndDown && !isLoggedIn"
      icon
      to="/wallet/import"
    >
      <v-icon size="28">mdi-account-circle</v-icon>
    </v-btn>
    <ToolbarUserMenu v-if="isLoggedIn" />
  </v-app-bar>
</template>

<script>
import ToolbarUserMenu from "@/components/ui/toolbar/UserMenu";

export default {
  components: {
    ToolbarUserMenu
  },
  methods: {
    toggleSideBar() {
      this.$emit("toggleSideBar");
    }
  },
  computed: {
    isLoggedIn() {
      return false;
    }
  }
};
</script>
