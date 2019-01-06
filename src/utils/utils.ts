import CryptoJS from 'crypto-js'
const cookiekey = 'this is a cookie key'
const serverkey = 'this is a server key'
const getCipherTextOfString = (text: string, key: string) => {
  return CryptoJS.AES.encrypt(text, key).toString()
}
const getCipherText = (data: any, key: string) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString()
}
const getDecryptedText = (ciphertext: string, key: string) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, key)
  return bytes.toString(CryptoJS.enc.Utf8)
}
const getDecryptedData = (ciphertext: string, key: string) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, key)
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
}
class Utils {
  public readonly cookiekey: string
  public readonly serverkey: string
  public readonly getCipherText: (data: any, key: string) => string
  public readonly getCipherTextOfString: (text: string, key: string) => string
  public readonly getDecryptedText: (ciphertext: string, key: string) => string
  public readonly getDecryptedData: (ciphertext: string, key: string) => any
  constructor() {
    this.cookiekey = cookiekey
    this.serverkey = serverkey
    this.getCipherText = getCipherText
    this.getCipherTextOfString = getCipherTextOfString
    this.getDecryptedText = getDecryptedText
    this.getDecryptedData = getDecryptedData
  }
}
export default new Utils()
