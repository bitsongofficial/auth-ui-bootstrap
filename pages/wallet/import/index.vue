<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="3">
        <v-card class="pa-6">
          <WalletImportHeader title="Import your crypto wallet" />
          <v-list-item-group class="pt-2">
            <v-list-item
              v-for="(method, i) in methods"
              :key="i"
              :to="method.to"
              link
            >
              <v-list-item-icon>
                <v-icon v-text="method.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content v-text="method.label"></v-list-item-content>
              <v-list-item-action>
                <v-icon>mdi-chevron-right</v-icon>
              </v-list-item-action>
            </v-list-item>
          </v-list-item-group>
          <v-divider class="mt-6"></v-divider>
          <v-card-actions class="pt-8 pb-0">
            <v-spacer></v-spacer>
            <p>
              or
              <router-link to="/wallet/create">create a new wallet</router-link>
            </p>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import WalletImportHeader from "@/components/wallet/common/Header";

export default {
  layout: "auth",
  components: {
    WalletImportHeader
  },
  data() {
    return {
      methods: [
        {
          icon: "mdi-file-key-outline",
          label: "Keystore file",
          to: "/wallet/import/keystore"
        },
        {
          icon: "mdi-shield-key-outline",
          label: "Mnemonic phrase",
          to: "/wallet/import/mnemonic"
        },
        {
          icon: "mdi-key-outline",
          label: "Private key",
          to: "/wallet/import/privatekey"
        }
      ]
    };
  }
};
</script>
