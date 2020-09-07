import BitSongClient from "@bitsongofficial/js-sdk"
import { v4 as uuidv4 } from 'uuid';
import FileSaver from "file-saver"

class Wallet {
  constructor() {
    this._client = new BitSongClient()
    this._crypto = BitSongClient.crypto
  }

  createAccountWithMnemonic = async () => {
    return await this._client.createAccountWithMneomnic()
  }

  generateAndDownloadKeyStore = async (privateKey, password) => {
    try {
      const keystore = await this._crypto.generateKeyStore(privateKey, password)
      const uuid = uuidv4()
      const blob = new Blob([JSON.stringify(keystore)], {
        type: "text/plain;charset=utf-8"
      })

      FileSaver.saveAs(blob, `btsg_${uuid}_keystore.txt`)

      return true
    } catch (e) {
      console.log(e)
      return false
    }
  }

  recoverAccountFromPrivateKey = async (privateKey) => {
    return await this._client.recoverAccountFromPrivateKey(privateKey)
  }

  recoverAccountFromMnemonic = async (mnemonic) => {
    return await this._client.recoverAccountFromMnemonic(mnemonic)
  }

  recoverAccountFromKeystore = async (keystore, password) => {
    return await this._client.recoverAccountFromKeystore(keystore, password)
  }
}

export default Wallet
