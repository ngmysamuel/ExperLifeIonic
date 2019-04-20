import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import {User} from './user';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: string = "http://localhost:8080/ExperienceSystem-war/webresources/User"

  constructor(private httpClient: HttpClient) { }

	updateUser(user: User):Observable<any> {
		console.log("in user.service updating userId: "+user.userId);
		let user2 = {'userEntity':user}
		return this.httpClient.post<any>(this.baseUrl+"/updateUser", user2, httpOptions).pipe
		(
			catchError(this.handleError)
		);
	}

  login(username: string, password:string): Observable<any> {
		console.log("in user service");
    return this.httpClient.get<any>(this.baseUrl+"/login?username="+username+"&password="+password).pipe
    (
			catchError(this.handleError)
		);
  }

	register(userEntity: User): Observable<any> {
		console.log("in user service. username: "+userEntity.username);
		let user2 = {'userEntity': userEntity};
		return this.httpClient.put<any>(this.baseUrl+"/register", user2, httpOptions).pipe
    (
			catchError(this.handleError)
		);
	}

	getUser(id: number):Observable<any> {
		console.log("in user service. id: "+id);
		return this.httpClient.get<any>(this.baseUrl+"/getUser/"+id).pipe
    (
			catchError(this.handleError)
		);
	}

	follow(userId: number, followId:number){
		return this.httpClient.post<any>(this.baseUrl+"/followUser?userId="+userId+"&followId="+followId, null, httpOptions).pipe
		(
			catchError(this.handleError)
		)
	}

	unfollow(userId: number, unfollowId:number){
		return this.httpClient.post<any>(this.baseUrl+"/unfollowUser?userId="+userId+"&unfollowId="+unfollowId, null, httpOptions).pipe
		(
			catchError(this.handleError)
		)
	}

	retrieveFollowers(userId:number){
		return this.httpClient.get<any>(this.baseUrl+"/retrieveFollowers/"+userId).pipe
		(
			catchError(this.handleError)
		)
	}

	retrieveFollows(userId:number){
		return this.httpClient.get<any>(this.baseUrl+"/retrieveFollows/"+userId).pipe
		(
			catchError(this.handleError)
		)
	}

  private handleError(error: HttpErrorResponse) {
  		let errorMessage: string = "";
  		if (error.error instanceof ErrorEvent) {
  			errorMessage = "An unknown error has occurred: " + error.error.message;
  		}  else {
				console.log(`${error.error.message}`)
  			errorMessage = `${error.status}`;
  		}
  		console.error(errorMessage);
  		return throwError(errorMessage);
  	}

}
