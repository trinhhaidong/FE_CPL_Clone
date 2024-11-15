import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { CarRented } from '../../../models/car-rented.model';

@Component({
  selector: 'app-rented-cars',
  templateUrl: './rented-cars.component.html',
  styleUrls: ['./rented-cars.component.scss']
})
export class RentedCarsComponent implements OnInit { 

  rentalContracts: CarRented[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getRentalContractsByUserId().subscribe(
      (data: CarRented[]) => {
        console.log('Data received from API:', data); 
        this.rentalContracts = data;
      },
      (error) => {
        console.error('Error fetching rental contracts', error);
      }
    );
  }
}