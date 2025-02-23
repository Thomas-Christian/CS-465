import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';

import { Trip } from '../models/trip';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/authresponse';


@Injectable({
  providedIn: 'root'
})

export class TripDataService {

  constructor(private http: HttpClient, 
    @Inject(BROWSER_STORAGE) private storage: Storage) { }

  private apiBaseUrl = 'http://localhost:3000/api/';
  private tripUrl = `${this.apiBaseUrl}trips`

  getTrips() : Observable<Trip[]> {
    return this.http.get<Trip[]>(this.tripUrl);
  }

  addTrip(formData: Trip) : Observable<Trip> {
    return this.http.post<Trip>(this.tripUrl, formData);
  }

  getTrip(tripCode: string) : Observable<Trip[]> {
    return this.http.get<Trip[]>(this.tripUrl + '/' + tripCode);
  }

  updateTrip(formData: Trip) : Observable<Trip> {
    return this.http.put<Trip>(this.tripUrl + '/' + formData.code, formData);
  }

  login(user: User) : Promise<AuthResponse> {
    return this.makeAuthApiCall('login', user)
  }

  register(user: User) : Promise<AuthResponse> {
    return this.makeAuthApiCall('register', user)
  }

  private handleError(error: any): Promise<any> {
    console.error(error)
    return Promise.reject(error.message || error)
  }

  private async makeAuthApiCall(urlPath: string, user: User): Promise<AuthResponse> {

    const url = `${this.apiBaseUrl}${urlPath}`;

    try {
      const response = await lastValueFrom(this.http.post<AuthResponse>(url, user));
      if (!response) {
        throw new Error('No response received from the server.');
      }
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }

}
