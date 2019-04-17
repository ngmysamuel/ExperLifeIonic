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
		console.log("Booking service creating booking withe expDateId: "+experienceDateId);
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

	cancelBooking(id: Number) {
		console.log("Booking.service cancelBooking with bookingId: "+id);
		let userid = this.sessionService.getCurrentUser().userId;
		let cancelBooking = {'bookingId': id, 'userId': userid};
		return this.httpClient.post<any>(this.baseUrl+"/cancelBooking",cancelBooking,httpOptions).pipe
		(
			catchError(this.handleError)
		)
	}

	updateBooking(booking: Booking, experienceDateId: number): Observable<any> {
		console.log("Booking service updating booking withe expDateId: "+experienceDateId);
		this.currentUser = this.sessionService.getCurrentUser();
		let createBookingReq =
      {'guestId': this.currentUser.userId,
      'experienceDateId': experienceDateId,
      'booking': booking};
			return this.httpClient.post<any>(this.baseUrl+"/updateBooking", createBookingReq, httpOptions).pipe
	    (
	      catchError(this.handleError)
	    )
	}


	getBookingById(id: number) {
		console.log("getting booking of id: "+id);
		return this.httpClient.get<any>(this.baseUrl+"/getBookingById/"+id).pipe
		(
			catchError(this.handleError)
		)
	}

	getAllBookingsByGuestId(id: number): Observable<any> {
		console.log("Getting all bookings by: "+id);
		return this.httpClient.get<any>(this.baseUrl+"/getAllBookingsByGuestId/"+id).pipe
		(
			catchError(this.handleError)
		)
	}


	retrieveAllBookingsByExperienceDateId(id: number):Observable<any> {
		return this.httpClient.get<any>(this.baseUrl+"/retrieveAllBookingsByExperienceDateId/"+id).pipe(
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
