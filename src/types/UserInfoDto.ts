export default class LoginDto {
  [key: string]: string
  [index: number]: string
  public userName: string
  public company: string
  public type: string
  public department: string
  public position: string
  constructor() {
    this.userName = ''
    this.company = ''
    this.type = ''
    this.department = ''
    this.position = ''
  }
}
