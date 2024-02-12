import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiVilleUrl = 'http://localhost:8080/api/villes'; // Replace with the actual URL of your API
  private apiCompagnieUrl='http://localhost:8080/api/compagnie';
  private apiGareUrl='http://localhost:8080/api/gare';
  private apiTrajetUrl='http://localhost:8080/api/trajet';
  private apiDepartUrl='http://localhost:8080/api/depart';
  private apiReservationUrl='http://localhost:8080/api/reservation';
  constructor(private http: HttpClient) {}
  getAllVilles():Observable<any>{
    return this.http.get(`${this.apiVilleUrl}/findAll`);
  }
  getAllCompagnies():Observable<any>{
    return this.http.get(`${this.apiCompagnieUrl}/findAll`);
  }
  getAllGares():Observable<any>{
    return this.http.get(`${this.apiGareUrl}/findAll`);
  }
  getDepartById(id:any): Observable<any> {
    return this.http.get(`${this.apiDepartUrl}/findOne/${id}`)
  }
  getGareByCompAndVille(compId: any,villeId:any): Observable<any> {
    return this.http.get(`${this.apiGareUrl}/${compId}/${villeId}`);
  }
  getTrajetByCompDepartArrive(data:any){
    console.log(data);
    return this.http.post(`${this.apiTrajetUrl}/search`, data);
  }
  createReservation(data:any){
    console.log(data);
    return this.http.post(`${this.apiReservationUrl}/create`, data);
  }
}
