import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import {SessionService} from './session.service';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  baseUrl: string = "http://localhost:8080/ExperienceSystem-war/webresources/Notification"

  constructor(private httpClient: HttpClient,private sessionService: SessionService) { }

  getNotificationFromUserId(id: number): Observable<any> {
    console.log("getting notifications from: "+id);
    return this.httpClient.get<any>(this.baseUrl+"/getNotificationFromUserId/"+id).pipe
    (
      catchError(this.handleError)
    )
  }

  setAllToSeen(id: number): Observable<any> {
    console.log("setting all notifications to seen of user: "+id)
    return this.httpClient.get<any>(this.baseUrl+"/setAllNotificationsToSeen/"+id).pipe
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
