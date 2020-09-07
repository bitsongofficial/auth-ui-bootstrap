<template>
  <v-app>
    <v-content>
      <nuxt />
    </v-content>
    <v-footer class="text-center transparent">
      <v-container>
        <v-row no-gutters>
          <v-col cols="12" class="text-center caption">
            <router-link to="/">
              Terms of Service
            </router-link>
            <router-link to="/" class="pl-2">
              Privacy Policy
            </router-link>
          </v-col>
          <v-col cols="12" class="text-center caption">
            &copy; BitSong Group Ltd 2018 - {{ new Date().getFullYear() }}
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>
