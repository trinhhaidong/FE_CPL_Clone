import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HomePageComponent } from '../views/Pages/home-page/home-page.component';
import { FooterComponent } from '../views/layouts/footer/footer.component';
import { HeaderComponent } from '../views/layouts/header/header.component';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HomePageComponent,FooterComponent,HeaderComponent, RouterLinkActive,RouterLink],
  providers: [ApiService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'RentalCar_System_FE';

}
