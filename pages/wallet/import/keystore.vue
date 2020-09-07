<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="3">
        <v-card
          class="auth-form"
          :loading="loading"
          :disabled="loading"
          @drop.prevent="captureFile"
          @dragover.prevent
        >
          <div class="pa-6">
            <WalletImportHeader
              subtitle="Drag your keystore file and type your password"
            />
            <v-card-text>
              <v-container
                class="fill-height mb-6"
                style="border: thin solid rgba(0, 0, 0, 0.32);border-radius:4px;cursor:pointer"
                @click="$refs.fileInput.click()"
              >
                <v-row align="center" no-gutters>
                  <v-col class="text-center">
                    <v-icon size="48" class="mt-2" v-if="fileName === ''">
                      mdi-upload
                    </v-icon>
                    <v-icon size="48" class="mt-2" v-else>
                      mdi-file-document-outline
                    </v-icon>
                    <p class="body-1 mt-2" v-if="fileName === ''">
                      Drag here to upload your keystore wallet
                    </p>
                    <p class="body-1 mt-2" v-else>
                      {{ fileName }}
                    </p>
                  </v-col>
                </v-row>
              </v-container>
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
              <input
                ref="fileInput"
                type="file"
                style="display:none"
                accept=".txt"
                @input="captureFile"
              />
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
      fileError: false,
      fileLoaded: false,
      fileName: "",
      keystore: "",
      password: "",
      show_password: false
    };
  },
  computed: {
    canContinue() {
      return !(this.keystore != "" && this.password.length >= 8);
    },
    loading() {
      return this.$store.getters[`wallet/loading`];
    }
  },
  methods: {
    async captureFile(e) {
      try {
        const files = e.dataTransfer
          ? e.dataTransfer.files
          : this.$refs.fileInput.files;
        const file = files && files[0] ? files[0] : null;
        this.fileName = file.name;
        const reader = new FileReader();
        if (typeof file !== "undefined") {
          reader.readAsArrayBuffer(file);
          reader.onloadend = async () => {
            try {
              const keystore = await this.convertToBuffer(reader.result);
              if (this.isKyestore(JSON.parse(keystore.toString()))) {
                this.keystore = keystore.toString();
                this.fileLoaded = true;
              }
            } catch (e) {
              this.fileError = true;
            }
          };
        }
      } catch (e) {
        console.error(e);
      }
    },
    async convertToBuffer(reader) {
      return Buffer.from(reader);
    },
    isKyestore(payload) {
      return (
        Object.prototype.hasOwnProperty.call(payload, "version") &&
        Object.prototype.hasOwnProperty.call(payload, "crypto")
      );
    },
    async onSubmit() {
      const result = await this.$store.dispatch(
        `wallet/recoverAccountFromKeystore`,
        {
          keystore: this.keystore,
          password: this.password
        }
      );
      if (result) {
        this.$router.push("/");
      } else {
        this.fileError = true;
      }
    }
  }
};
</script>
