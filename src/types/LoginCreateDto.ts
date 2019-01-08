export default class LoginCreateDto {
  [key: string]: string
  [index: number]: string
  public companyName: string
  public company: string
  public userName: string
  public password: string
  public type: string
  public department: string
  public position: string
  constructor() {
    this.companyName = ''
    this.company = ''
    this.userName = ''
    this.password = ''
    this.type = 'admin'
    this.department = ''
    this.position = ''
  }
}
