import { User } from './user'

export class Notification {
  notificationId: number;
  notificationMessage: string;
  notificationDate: Date;
  isSeen: boolean;
  messageSender: User

  constructor(id: number, msg: string, date: Date, seen: boolean, sender: User) {
    this.notificationId = id;
    this.notificationMessage = msg;
    this.notificationDate = date;
    this.isSeen = seen;
    this.messageSender = sender;
  }
}
