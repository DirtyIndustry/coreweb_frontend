import CryptoJS from 'crypto-js'
const cookiekey = 'this is a cookie key. i like it.'
const serverkey = 'this is a server key, i hate it!'
const IV = '6781230598427184'

const encryptString = (plaintext: string, key: string) => {
  const encryptkey = CryptoJS.enc.Utf8.parse(key)
  const iv = CryptoJS.enc.Utf8.parse(IV)
  const source = CryptoJS.enc.Utf8.parse(plaintext)
  return CryptoJS.AES.encrypt(source, encryptkey, { iv }).toString()
}
const decryptString = (ciphertext: string, key: string) => {
  const iv = CryptoJS.enc.Utf8.parse(IV)
  const encryptkey = CryptoJS.enc.Utf8.parse(key)
  return CryptoJS.AES.decrypt(ciphertext, encryptkey, { iv }).toString(
    CryptoJS.enc.Utf8
  )
}
class Utils {
  public readonly cookiekey: string
  public readonly serverkey: string
  public readonly encryptString: (text: string, key: string) => string
  public readonly decryptString: (ciphertext: string, key: string) => string
  constructor() {
    this.cookiekey = cookiekey
    this.serverkey = serverkey
    this.encryptString = encryptString
    this.decryptString = decryptString
  }
}
export default new Utils()
