import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  carTypes: { value: string, name: string }[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchCarTypes();
  }

  fetchCarTypes(): void {
    this.http.get<{ value: string, name: string }[]>('API_URL_HERE')
      .subscribe(data => {
        this.carTypes = data;
      });
  }
}
