import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import {ExperienceDate} from './experience-date';
import {SessionService} from './session.service'
import{User} from './user'

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ExperienceDateService {

  baseUrl: string = "http://localhost:8080/ExperienceSystem-war/webresources/ExperienceDate";

  constructor(private httpClient: HttpClient,private sessionService: SessionService) { }

  retrieveExperienceDates(id: number): Observable<any> {
    console.log("retrieve Exp Date of Exp: "+id);
    return this.httpClient.get<any>(this.baseUrl+"/retrieveExperienceDates/"+id).pipe
		(
			catchError(this.handleError)
		);
	}

	createExperienceDate(exp: ExperienceDate):Observable<any> {
		console.log("The id of the date is: "+exp.experienceDateId);
		let experienceDate = {'username':this.sessionService.getCurrentUser().username, 'password':this.sessionService.getCurrentUser().password, 'experienceDateEntity':exp, 'experienceId':exp.experience.experienceId}
		return this.httpClient.put<any>(this.baseUrl+"/CreateExperienceDate", experienceDate, httpOptions).pipe
		(
			catchError(this.handleError)
		);
	}

	deleteExperienceDate(expDateId: number, reason: String):Observable<any> {
		console.log("The id of the date is: "+expDateId);
		
		return this.httpClient.delete<any>(this.baseUrl+"/DeleteExperienceDate?experienceDateId="+expDateId+"&reason="+reason).pipe
		(
			catchError(this.handleError)
		);
	}

	retrieveExperienceDateGuests(expDateId:number){
		return this.httpClient.get<any>(this.baseUrl+"/RetrieveExperienceDateGuestsById/"+expDateId).pipe(
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
