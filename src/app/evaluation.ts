import {User} from './user';
import { Booking } from "./booking";

export class Evaluation {

  evaluationId: number
  remark: String;
  evaluationTime: Date;
  score: number;
  userEvaluating: User;
  booking: Booking;

  constructor(){
  }

  setRemark(remark:String){
      this.remark = remark;
  }

  setEvaluationTime(evaluationTime: Date){
      this.evaluationTime = evaluationTime;
  }

  setScore(score: number){
      this.score = score;
  }

  setUserEvaluating(userEvaluating: User){
      this.userEvaluating = userEvaluating;
  }

  setBooking(booking: Booking){
      this.booking = booking;
  }
}