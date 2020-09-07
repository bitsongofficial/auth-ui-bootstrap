<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="3">
        <WalletCreate />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import WalletCreate from "@/components/wallet/create";
export default {
  layout: "auth",
  components: {
    WalletCreate
  }
};
</script>
