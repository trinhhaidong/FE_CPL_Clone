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
  paginatedContracts: CarRented[] = [];
  currentPage = 1;
  itemsPerPage = 6;
  totalPages = 5;
  totalItems = 0;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadRentalContracts();
  }
  loadRentalContracts(): void {
    this.authService.getRentalContractsByUserId(this.currentPage, this.itemsPerPage).subscribe(
      (response: { data: CarRented[], totalItems: number }) => {
        console.log('Data received from API:', response); 
        this.rentalContracts = response.data;
        this.totalItems = response.totalItems;      
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
        console.log('Total Pages:', this.totalPages);
      },
      (error) => {
        console.error('Error fetching rental contracts', error);
      }
    );
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    this.loadRentalContracts();
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