<template>
  <div>
    <WalletHeader title="Set up your crypto wallet" />
    <v-card-text class="subtitle-1 grey--text text--darken-4">
      <v-alert color="red" dark>
        Write down your seed phrase and keep it somewhere safe. We do not store
        it for you.
      </v-alert>

      <UiMarkup title="Your seed phrase" :content="seed" />

      <v-checkbox
        v-model="agreement"
        label="I understand that if I lose my seed phrase, I'll lose the crypto in my wallet"
      ></v-checkbox>
    </v-card-text>
    <v-card-actions class="pb-6">
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        class="px-6"
        :disabled="canContinue"
        @click="onContinue"
        >Okay, I've saved it securely</v-btn
      >
    </v-card-actions>
  </div>
</template>

<script>
import WalletHeader from "@/components/wallet/common/Header";
import UiMarkup from "@/components/ui/Markup";
export default {
  components: {
    WalletHeader,
    UiMarkup
  },
  data() {
    return {
      agreement: false
    };
  },
  computed: {
    seed() {
      return this.$store.getters[`wallet/mnemonic`];
    },
    canContinue() {
      return !this.agreement;
    }
  },
  methods: {
    onContinue() {
      this.$emit("onContinue");
    }
  }
};
</script>
