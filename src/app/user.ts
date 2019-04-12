
export class User {

  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  userId: number;

  constructor(username:string,password: string,firstName: string,lastName: string,email: string) {
    this.username = username;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }



}
