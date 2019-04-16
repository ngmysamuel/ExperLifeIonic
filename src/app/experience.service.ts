import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import {Experience} from './experience';
import {SessionService} from './session.service'
import{User} from './user'

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  baseUrl: string = "http://localhost:8080/ExperienceSystem-war/webresources/Experience";
	currentUser: User;


  constructor(private httpClient: HttpClient, private sessionService: SessionService) { }

	updateExperience(experience: Experience): Observable<any> {
		let experience2 = {'experienceEntity':experience, 'username':this.sessionService.getCurrentUser().username, 'password':this.sessionService.getCurrentUser().password,};
		return this.httpClient.post<any>(this.baseUrl+"/updateExperience", experience2, httpOptions).pipe
		(
			catchError(this.handleError)
		);
	}


  createExperience(experience: Experience): Observable<any> {
		console.log("3rd");
		this.currentUser = this.sessionService.getCurrentUser();
		console.log("NAME"+experience.category.name);
		let experience2 = {'experienceEntity':experience, 'username':this.sessionService.getCurrentUser().username, 'password':this.sessionService.getCurrentUser().password,};
		console.log("4th");
		console.log(experience2);
		return this.httpClient.put<any>(this.baseUrl+"/createExperience", experience2, httpOptions).pipe
		(
			catchError(this.handleError)
		);
	}

	deleteExperience(id: number): Observable<any> {
		console.log("Experience: "+id+" will be deleted");
		return this.httpClient.delete<any>(this.baseUrl+"/deleteExperience?id="+id).pipe
		(
			catchError(this.handleError)
		);
	}

	retrieveHostExperience(id: number): Observable<any> {
		return this.httpClient.get<any>(this.baseUrl+"/retrieveHostExperiences?userId="+id).pipe
		(
			catchError(this.handleError)
		);
	}

	retrieveExperienceDetails(id: number): Observable<any> {
		console.log(id+": in retrieve experience service");
		return this.httpClient.get<any>(this.baseUrl+"/retrieveExperience/"+id).pipe
		(
			catchError(this.handleError)
		);
	}

	retrieveAllExperiences(): Observable<any> {
		return this.httpClient.get<any>(this.baseUrl+"/retrieveAllExperiences").pipe
		(
			catchError(this.handleError)
		);
	}

	retrieveAllFavoriteExperiences(): Observable<any> {
		return this.httpClient.get<any>(this.baseUrl+"/retrieveFavoriteExperiences?userId="+this.sessionService.getCurrentUser().userId).pipe
		(
			catchError(this.handleError)
		);
	}

	followExperience(experienceId: number): Observable<any> {
		return this.httpClient.post<any>(this.baseUrl+"/followExperience?experienceId="+experienceId+"&userId="+this.sessionService.getCurrentUser().userId, null, httpOptions).pipe(
			catchError(this.handleError)
		);
	}

	unfollowExperience(experienceId: number): Observable<any> {
		return this.httpClient.post<any>(this.baseUrl+"/unfollowExperience?experienceId="+experienceId+"&userId="+this.sessionService.getCurrentUser().userId, null, httpOptions).pipe(
			catchError(this.handleError)
		);
	}


	private handleError(error: HttpErrorResponse)
	{
		let errorMessage: string = "";

		if (error.error instanceof ErrorEvent)
		{
			errorMessage = "An unknown error has occurred: " + error.error.message;
		}
		else
		{
			errorMessage = "A HTTP error has occurred: " + `HTTP ${error.status}: ${error.error.message}`;
		}

		console.error(errorMessage);

		return throwError(errorMessage);
	}

}
