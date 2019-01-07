import utils from './utils'

function setCookie(name: string, value: string, days: number) {
  let str = name + '=' + value // + ';path=/'
  if (days !== 0) {
    const d = new Date()
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days)
    str += ';expires=' + d.toUTCString()
  }
  window.document.cookie = str
}
function getCookie(name: string) {
  const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  const arr = document.cookie.match(reg)
  if (arr) {
    return arr[2]
  } else {
    return null
  }
}
function delCookie(name: string) {
  const exp = new Date()
  exp.setTime(exp.getTime() - 1)
  const val = getCookie(name)
  if (val !== null) {
    document.cookie = name + '=' + val + ';expires=' + exp.toUTCString()
  }
}
const setEncryptedCookie = (name: string, value: string, days: number) => {
  const ciphertext = utils.encryptString(value, utils.cookiekey)
  setCookie(name, ciphertext, days)
}
const getDecryptedCookie = (name: string) => {
  const ciphertext = getCookie(name)
  if (ciphertext === null) {
    return null
  } else {
    return utils.decryptString(ciphertext, utils.cookiekey)
  }
}
class Cookie {
  public readonly set: (name: string, value: string, days: number) => void
  public readonly get: (name: string) => string | null
  public readonly del: (name: string) => void
  public readonly encryptSet: (
    name: string,
    value: string,
    days: number
  ) => void
  public readonly decryptGet: (name: string) => string | null
  constructor() {
    this.set = setCookie
    this.get = getCookie
    this.del = delCookie
    this.encryptSet = setEncryptedCookie
    this.decryptGet = getDecryptedCookie
  }
}
export default new Cookie()
