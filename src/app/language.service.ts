import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  baseUrl: string = "http://localhost:8080/ExperienceSystem-war/webresources/Language";

  constructor(private httpClient: HttpClient) { }

  retrieveAllLanguages(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl+"/getAllLanguages").pipe
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
