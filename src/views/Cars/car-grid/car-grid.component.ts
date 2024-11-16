import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-car-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './car-grid.component.html',
  styleUrls: ['./car-grid.component.scss']
})
export class CarGridComponent implements OnInit {
  cars: any[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // Gọi phương thức handleGetCars() từ AuthService
    this.authService.handleGetCars().subscribe(
      (data: any) => {  // Khai báo kiểu dữ liệu cho 'data'
        this.cars = data;  // Gán dữ liệu xe nhận được vào mảng cars
        console.log('Danh sách xe:', data);
      },
      (error: any) => {  // Khai báo kiểu dữ liệu cho 'error'
        console.error('Lỗi khi lấy dữ liệu xe:', error);  // Xử lý lỗi nếu có
      }
    );
  }
}
