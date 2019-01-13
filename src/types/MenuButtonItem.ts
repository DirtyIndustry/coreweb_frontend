export default class MenuButtonItem {
  [key: string]: string | boolean
  [index: number]: string
  public textlabel: string
  public separator: boolean
  public prefix: string
  constructor() {
    this.textlabel = ''
    this.separator = false
    this.prefix = ``
  }
}
