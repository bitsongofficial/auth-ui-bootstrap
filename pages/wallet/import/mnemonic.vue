<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="3">
        <v-card
          outlined
          class="auth-form"
          :loading="loading"
          :disabled="loading"
        >
          <div class="pa-6">
            <WalletImportHeader
              subtitle="Enter your mnemonic phrase and type your password"
            />
            <v-card-text>
              <v-textarea
                outlined
                label="Type your seed phrase here"
                v-model="seed"
              ></v-textarea>
              <v-text-field
                outlined
                label="Password"
                v-model="password"
                :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show_password ? 'text' : 'password'"
                @click:append="show_password = !show_password"
                v-validate="'required|min:8|max:86'"
                data-vv-name="password"
                :error-messages="errors.collect('password')"
              ></v-text-field>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                class="px-8"
                @click="onSubmit"
                :disabled="canContinue"
                >Import</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
            <v-divider class="mt-6"></v-divider>
            <v-card-actions class="pt-8 pb-0">
              <v-spacer></v-spacer>
              <p>
                or
                <router-link to="/wallet/import"
                  >select another method</router-link
                >
              </p>
              <v-spacer></v-spacer>
            </v-card-actions>
          </div>
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
      seed: "",
      password: "",
      show_password: false
    };
  },
  computed: {
    canContinue() {
      const words = this.seed.replace(/((\s*\S+)*)\s*/, "$1").split(" ");
      return !(
        (words.length === 12 || words.length === 24) &&
        this.password.length >= 8
      );
    },
    loading() {
      return this.$store.getters[`wallet/loading`];
    }
  },
  methods: {
    async onSubmit() {
      const result = await this.$store.dispatch(
        `wallet/recoverAccountFromMnemonic`,
        {
          mnemonic: this.seed,
          password: this.password
        }
      );
      if (result) {
        this.$router.push("/");
      }
    }
  }
};
</script>
