import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarRented } from '../models/car-rented.model';

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
  getRentalContractsByUserId(userId: string, pageNumber: number, pageSize: number): Observable<{ data: CarRented[], totalItems: number }> {
    const url = `https://localhost:44360/api/RentalContracts/user/${userId}?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    return this.http.get<{ data: CarRented[], totalItems: number }>(url, this.headerCustom);
  }
  cancelRentalContract(contractId: string): Observable<any> {
    const url = `https://localhost:44360/api/RentalContracts/${contractId}/cancel`;
    return this.http.post<any>(url, {}, this.headerCustom);
  }
}
