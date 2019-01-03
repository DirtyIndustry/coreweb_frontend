export default class LoginDto {
[key: string]: string
[index: number]: string
public userName: string
public password: string
constructor() {
    this.userName = ''
    this.password = ''
}
}
