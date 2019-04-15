import {User} from './user';
import {ExperienceDate} from './experience-date';
// import {Evaluation} from './evaluation';

export class Booking{

    guest: User
    bookingId: number;
    bookingDate: Date;
    numberOfPeople: number;
    totalPrice: number;
    status: string;
    experienceDate: ExperienceDate;

    constructor(){}

    setGuest(u:User){
        this.guest=u;
    }
    setBookingDate(u:Date){
        this.bookingDate=u;
    }
    setNumberOfPeople(u:number){
        this.numberOfPeople=u;
    }
    setTotalPrice(u:number){
        this.totalPrice=u;
    }
    setExperienceDate(u:ExperienceDate){
        this.experienceDate=u;
    }
}
