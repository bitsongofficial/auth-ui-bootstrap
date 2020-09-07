<template>
  <div>
    <WalletHeader title="Set up your crypto wallet" />
    <v-card-text class="subtitle-1 grey--text text--darken-4">
      <p>To set up a wallet, you need a seed phrase.</p>
      <p>
        No one - not a bank, family member, or BitSong - can access your crypto
        if it's in a wallet, unless they have the seed phrase.
      </p>
      <p>
        Your seed phrase acts as the key to your wallet. You must store it
        somewhere secure, such as a password manager.
      </p>
    </v-card-text>
    <v-card-actions class="pb-6">
      <v-spacer></v-spacer>
      <v-btn color="primary" class="px-6" @click="onContinue"
        >Show my seed phrase</v-btn
      >
    </v-card-actions>
  </div>
</template>

<script>
import WalletHeader from "@/components/wallet/common/Header";
export default {
  components: {
    WalletHeader
  },
  methods: {
    onContinue() {
      this.$emit("onContinue");
    }
  }
};
</script>
