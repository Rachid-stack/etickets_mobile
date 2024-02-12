import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';
@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  private apiUrl = 'http://localhost:8080/api/users'; // Replace with the actual URL of your API
  constructor(private http: HttpClient,private storeApi:StorageService) {}
  // Method for registration
  register(userData:any): Observable<any> {
    console.log(userData);
    return this.http.post(`${this.apiUrl}/signup`, userData);
  }
  // Method for login
  login(credentials:any): Observable<any> {
    console.log(credentials);
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }
  // Method to get authentication token
  getToken():any {
    this.storeApi.get('token').then(value => {
      return value;
    });
  }
  // Method to check if user is logged in
  isLoggedIn(): boolean {
    // Check if token exists in localStorage
    return !!this.storeApi.get('token');
  }
}
