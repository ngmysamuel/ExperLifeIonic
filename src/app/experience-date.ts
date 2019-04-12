import {Experience} from './experience';

export class ExperienceDate {

  experienceDateId: number;
  startDate: Date;
  price: number;
  experience: Experience;
  spotsAvailable: number;
  capacity: number;
  active: boolean;

  constructor(){
  }

  setStartDate(startDate:Date){
    this.startDate = startDate;
  }

  setExperience(e: Experience){
    this.experience = e;
  }

  setPrice(p:number){
    this.price = p;
  }

  setSpotsAvailable(p:number){
    this.spotsAvailable = p;
  }

  setCapacity(p:number){
    this.capacity = p;
  }

  setActive(p:boolean){
    this.active=p;
  }

}
