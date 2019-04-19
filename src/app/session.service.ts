import { Injectable } from '@angular/core';
import {User} from './user'

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  isLoggedIn(): boolean {
		if(sessionStorage.isLogin == "true") {
			return true;
		} else {
			return false;
		}
	}

  setIsLoggedIn(isIt: boolean) {
    sessionStorage.isLogin = isIt;
  }

  getCurrentUser(): User {
		return JSON.parse(sessionStorage.currentUser);
	}

	setCurrentUser(currentUser: User): void {
		sessionStorage.currentUser = JSON.stringify(currentUser);
	}

  setJsonObject(obj: any) {
    sessionStorage.jsonobj = JSON.stringify(obj);
  }

  getJsonObject(): any {
    return JSON.parse(sessionStorage.jsonobj);
  }

  setAddress(address: string) {
    sessionStorage.address = address;
  }

  getAddress(): string {
    return sessionStorage.address;
  }


}
