import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import {SessionService} from './session.service'
import { Booking } from "./booking";
import{User} from './user'
import{ExperienceDate} from './experience-date'


const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  baseUrl: string = "http://localhost:8080/ExperienceSystem-war/webresources/Booking";
  currentUser: User;

  constructor(private httpClient: HttpClient, private sessionService: SessionService) { }

  createBooking(booking: Booking, experienceDateId: number): Observable<any> {
    this.currentUser = this.sessionService.getCurrentUser();
    let createBookingReq = 
      {'guestId': this.currentUser.userId, 
      'experienceDateId': experienceDateId, 
      'booking': booking}
    return this.httpClient.put<any>(this.baseUrl+"/createBooking", createBookingReq, httpOptions).pipe
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
