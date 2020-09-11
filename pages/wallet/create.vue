<template>
  <page-centered>
    <wallet-create :loading="loading" />
  </page-centered>
</template>

<script>
import PageCentered from "@/components/ui/PageCentered";
import WalletCreate from "@/components/wallet/create";

export default {
  layout: "auth",
  components: {
    PageCentered,
    WalletCreate
  },
  computed: {
    loading() {
      return this.$store.getters[`wallet/loading`];
    }
  }
};
</script>
