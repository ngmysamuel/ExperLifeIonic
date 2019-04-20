import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import {SessionService} from './session.service'

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AppealService {

  baseUrl: string = "http://localhost:8080/ExperienceSystem-war/webresources/Appeal";

  constructor(private httpClient: HttpClient, private sessionService: SessionService) { }

  createPremiumAppeal(app: any):Observable<any> {
		console.log("Creating premium appeal for userId: "+app.user.userId);
    return this.httpClient.put<any>(this.baseUrl+"/submitPremiumAppeal",app,httpOptions).pipe
    (
      catchError(this.handleError)
    )
  }

  checkIfSubmittedAppeal(id: number):Observable<any> {
		console.log("Checking if userId: "+id+" has submittedAppeal");
    return this.httpClient.get<any>(this.baseUrl+"/checkIfSubmittedAppealBefore/"+id).pipe
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
