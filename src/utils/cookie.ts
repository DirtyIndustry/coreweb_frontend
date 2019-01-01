
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
        return (arr[2])
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
class Cookie {
    public readonly set: (name: string, value: string, days: number) => void
    public readonly get: (name: string) => string | null
    public readonly del: (name: string) => void
    constructor() {
        this.set = setCookie
        this.get = getCookie
        this.del = delCookie
    }
}
export default new Cookie()
