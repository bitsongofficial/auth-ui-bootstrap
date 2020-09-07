import { wait } from '@/lib/utils'
import Wallet from '@/lib/wallet'
const wallet = new Wallet()

export const state = () => ({
  loading: false,
  wallets: [],
  selectedWallet: null
})

export const getters = {
  loading: state => {
    return state.loading
  },
  mnemonic: state => {
    return state.selectedWallet === null ? '' : state.wallets[state.selectedWallet].mnemonic
  },
  address: state => {
    return state.selectedWallet === null ? '' : state.wallets[state.selectedWallet].address
  },
  privateKey: state => {
    return state.selectedWallet === null ? '' : state.wallets[state.selectedWallet].privateKey
  },
  password: state => {
    return state.selectedWallet === null ? '' : state.wallets[state.selectedWallet].password
  }
}

export const mutations = {
  toggleLoading: (state) => {
    state.loading = !state.loading
  },
  addWallet: (state, { mnemonic, privateKey, password, address }) => {
    state.wallets.push({
      mnemonic, privateKey, password, address
    })
  },
  delWallet: (state, index) => {
    state.wallets.pop(index)
  },
  connect: (state, index) => {
    state.selectedWallet = index
  },
  disconnect: (state, index) => {
    state.selectedWallet = null
  }
}

export const actions = {
  async createAccountWithMnemonic({
    commit, state
  }, password) {
    try {
      commit(`toggleLoading`)
      await wait(200)

      const { address, mnemonic, privateKey } = await wallet.createAccountWithMnemonic()
      commit(`addWallet`, {
        address, mnemonic, privateKey, password
      })

      const i = state.wallets.findIndex(w => w.address === address)
      commit(`connect`, i)

      commit(`toggleLoading`)
    } catch (e) {
      commit(`toggleLoading`)
      console.error(e)
    }
  },
  async generateAndDownloadKeyStore({
    commit,
    getters
  }) {
    try {
      commit(`toggleLoading`)
      await wait(200)

      await wallet.generateAndDownloadKeyStore(getters.privateKey, getters.password)

      commit(`toggleLoading`)
    } catch (e) {
      commit(`toggleLoading`)
      console.error(e)
    }
  },
  async recoverAccountFromPrivateKey({
    commit, state
  }, {
    privateKey, password
  }) {
    try {
      commit(`toggleLoading`)
      await wait(200)

      const { address } = await wallet.recoverAccountFromPrivateKey(privateKey)
      commit(`addWallet`, {
        address, privateKey, password
      })

      const i = state.wallets.findIndex(w => w.address === address)
      commit(`connect`, i)

      commit(`toggleLoading`)

      return true
    } catch (e) {
      commit(`toggleLoading`)
      console.error(e)
      return false
    }
  },
  async recoverAccountFromMnemonic({
    commit, state
  }, {
    mnemonic, password
  }) {
    try {
      commit(`toggleLoading`)
      await wait(200)

      const {
        privateKey,
        address
      } = await wallet.recoverAccountFromMnemonic(mnemonic)
      commit(`addWallet`, {
        mnemonic, address, privateKey, password
      })

      const i = state.wallets.findIndex(w => w.address === address)
      commit(`connect`, i)

      commit(`toggleLoading`)

      return true
    } catch (e) {
      commit(`toggleLoading`)
      console.error(e)
      return false
    }
  },
  async recoverAccountFromKeystore({
    commit, state
  }, {
    keystore,
    password
  }) {
    try {
      commit(`toggleLoading`)
      await wait(200)

      const {
        privateKey,
        address
      } = await wallet.recoverAccountFromKeystore(keystore, password)
      commit(`addWallet`, {
        address, privateKey, password
      })

      const i = state.wallets.findIndex(w => w.address === address)
      commit(`connect`, i)

      commit(`toggleLoading`)

      return true
    } catch (e) {
      commit(`toggleLoading`)
      console.error(e)
      return false
    }
  },
}
