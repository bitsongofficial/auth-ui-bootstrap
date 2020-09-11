<template>
  <v-card :loading="loading" :disabled="loading">
    <v-window v-model="step" class="ma-6">
      <v-window-item>
        <WalletCreatePasswordForm v-on:onContinue="step = 1" />
      </v-window-item>
      <v-window-item>
        <WalletCreateSeedAlert v-on:onContinue="step = 2" />
      </v-window-item>
      <v-window-item>
        <WalletCreateSeedView v-on:onContinue="step = 3" />
      </v-window-item>
      <v-window-item>
        <WalletCreateSeedConfirmation
          v-on:onContinue="step = 4"
          v-on:onGoBack="step = 2"
        />
      </v-window-item>
      <v-window-item>
        <WalletCreateAddressView v-on:onContinue="$router.push('/')" />
      </v-window-item>
    </v-window>
  </v-card>
</template>

<script>
import WalletCreatePasswordForm from "@/components/wallet/create/PasswordForm";
import WalletCreateSeedAlert from "@/components/wallet/create/SeedAlert";
import WalletCreateSeedView from "@/components/wallet/create/SeedView";
import WalletCreateSeedConfirmation from "@/components/wallet/create/SeedConfirmation";
import WalletCreateAddressView from "@/components/wallet/create/AddressView";

export default {
  components: {
    WalletCreatePasswordForm,
    WalletCreateSeedAlert,
    WalletCreateSeedView,
    WalletCreateSeedConfirmation,
    WalletCreateAddressView
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      step: 0
    };
  }
};
</script>
