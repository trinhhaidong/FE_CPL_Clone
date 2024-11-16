import { Component, OnInit } from '@angular/core';
import { CarRented } from '../../../models/car-rented.model';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-rented-cars',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rented-cars.component.html',
  styleUrls: ['./rented-cars.component.scss']
})
export class RentedCarsComponent implements OnInit { 

  rentalContracts: CarRented[] = [];
  showConfirmModal = false;
  selectedContractId: string | null = null;

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
  loadRentalContracts(): void {
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
  confirmReturnCar(contractId: string): void {
    console.log('Contract ID received:', contractId);
    this.selectedContractId = contractId;
    this.showConfirmModal = true;
  }

  closeModal(): void {
    this.showConfirmModal = false;
    this.selectedContractId = null;
  }


  cancelRentalContract(): void {
    if (this.selectedContractId) {
      this.authService.cancelRentalContract(this.selectedContractId).subscribe(
        (response: any) => {
          console.log('Rental contract canceled successfully:', response);
          this.closeModal();     
          this.loadRentalContracts();
        },
        (error) => {
          console.error('Failed to cancel the rental contract:', error);
          this.closeModal();
        }
      );
    }
  }

}