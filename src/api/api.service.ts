import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { data } from 'jquery';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private headerCustom = {}

  constructor(private http: HttpClient) {
    this.headerCustom = {headers: { "Authorization": "Bearer " + localStorage.getItem("token") }}

  }
  login(data: any): Observable<any>{
    return this.http.post<any>('https://localhost:44360/api/General/login', data);
  }

  signup(data: any): Observable<any>{
    return this.http.post<any>('https://localhost:44360/api/General/register', data);
  }
  getCars(): Observable<any>{
    return this.http.get<any>('https://localhost:44360/api/Car/all-car');
  }
}
