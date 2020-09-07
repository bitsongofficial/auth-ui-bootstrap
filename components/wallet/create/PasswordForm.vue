<template>
  <div>
    <WalletHeader
      title="Set up your crypto wallet"
      subtitle="Type a strong and secure password"
    />
    <v-card-text>
      <v-text-field
        outlined
        ref="password"
        label="Password"
        v-model="password"
        :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show_password ? 'text' : 'password'"
        @click:append="show_password = !show_password"
        v-validate="'required|min:8|max:86'"
        data-vv-name="password"
        :error-messages="errors.collect('password')"
      ></v-text-field>
      <v-text-field
        outlined
        ref="password_confirmation"
        label="Conferma Password"
        v-model="confirm_password"
        :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show_password ? 'text' : 'password'"
        @click:append="show_password = !show_password"
        v-validate="'required|min:8|max:86|confirmed:password'"
        data-vv-name="password_confirmation"
        :error-messages="errors.collect('password_confirmation')"
      ></v-text-field>
      <v-checkbox
        v-model="agreement"
        label="I understand that BitSong not save any of password, seed phrase, keystore or private key"
        class="mt-0 pt-0"
      ></v-checkbox>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        :disabled="canContinue"
        class="px-6"
        @click="onContinue"
        >Continue</v-btn
      >
      <v-spacer></v-spacer>
    </v-card-actions>
    <v-divider class="mt-6"></v-divider>
    <v-card-actions class="pt-8 pb-0">
      <v-spacer></v-spacer>
      <p>
        or <router-link to="/wallet/import">import your wallet</router-link>
      </p>
      <v-spacer></v-spacer>
    </v-card-actions>
  </div>
</template>

<script>
import WalletHeader from "@/components/wallet/common/Header";

export default {
  components: {
    WalletHeader
  },
  data() {
    return {
      password: "",
      confirm_password: "",
      show_password: false,
      agreement: false
    };
  },
  methods: {
    async onContinue() {
      try {
        await this.$store.dispatch(
          `wallet/createAccountWithMnemonic`,
          this.password
        );
        this.$emit("onContinue");
      } catch (err) {
        console.error(err);
      }
    }
  },
  computed: {
    canContinue() {
      return !(
        this.password.length >= 8 &&
        this.confirm_password.length >= 8 &&
        this.password === this.confirm_password &&
        this.agreement
      );
    }
  }
};
</script>
