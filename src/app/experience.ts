import { Category } from './category';
import {Type} from './type';
import {Location} from './location';
import {Language} from './language';
import { User } from './user';
import { ExperienceDate } from './experience-date';

export class Experience {
  title: string;
  category: Category;
  address: string;
  type: Type;
  location: Location;
  language: Language;
  host: User;
  experienceId: number;
  active: boolean;

  price: number;
  experienceDates: Array<ExperienceDate> = [];

  constructor() {
  }

  // constructor(title?: string, category?:CategoryEnum, address?:string, language?: number, type?: number, location?:number) {
  //   this.title = title;
  //   this.cat = category;
  //   this.address = address;
  //   this.type = type;
  //   this.location = location;
  //   this.lang = language;
  //   this.host = 1;
  // }

setTitle(t:string){
    this.title=t;
  }
  setAddress(t:string){
    this.address=t;
  }
  setCategory(t:Category){
    this.category=t;
  }
  setType(t:Type){
    this.type=t;
  }
  setLocation(t:Location){
    this.location=t;
  }
  setLanguage(t:Language){
    this.language=t;
  }
}
