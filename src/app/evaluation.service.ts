import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import {SessionService} from './session.service'
import { Booking } from "./booking";
import{ User } from './user'

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  baseUrl: string = "http://localhost:8080/ExperienceSystem-war/webresources/Evaluation";
  currentUser: User;


  constructor(private httpClient: HttpClient, private sessionService: SessionService) { }

  createEvaluation(score: number, remark: String, bookingId: number, userId: number){
    let createNewEval =
    {
      'bookingId': bookingId,
      'userId': userId,
      'score': score,
      'remark': remark,
      'date': new Date(Date.now())
    }
    return this.httpClient.put<any>(this.baseUrl+"/createEval", createNewEval, httpOptions).pipe
    (
      catchError(this.handleError)
    )
  }

	createEvaluateExperience(score: number, remark: String, bookingId: number):Observable<any> {
		console.log("Creating evaluation for bookingId: "+bookingId);
		let userId = this.sessionService.getCurrentUser().userId;
		let createNewEval =
    {
      'bookingId': bookingId,
      'userId': userId,
      'score': score,
      'remark': remark,
      'date': new Date(Date.now())
    }
    return this.httpClient.put<any>(this.baseUrl+"/createEvalFromGuest", createNewEval, httpOptions).pipe
    (
      catchError(this.handleError)
    )
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
