
// src/app/app.component.ts
import { Component, OnInit, Renderer2 } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HomePageComponent } from '../views/Pages/home-page/home-page.component';
import { FooterComponent } from '../views/layouts/footer/footer.component';
import { HeaderComponent } from '../views/layouts/header/header.component';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FooterComponent, HeaderComponent, RouterLinkActive, RouterLink],
  providers: [ApiService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'RentalCar_System_FE';

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    this.injectScript();
  }

  private injectScript() {
    this.addScript('assets/vendors/jquery/jquery.min.js');
    this.addScript('assets/vendors/magnific-popup/jquery.magnific-popup.min.js');
    this.addScript('assets/vendors/swiper/swiper-bundle.min.js');
    this.addScript('assets/js/script.js');
    this.addScript('assets/js/nav-link-toggler.js');
    this.addScript('assets/js/home-slider.js');
    this.addScript('assets/js/counter-up.js');
    this.addScript('assets/js/gallery.js');
    this.addScript('assets/js/car-slider.js');
    this.addScript('assets/js/testi-slider.js');
  }

  private addScript(src: string) {
    const script = this.renderer.createElement('script');
    script.src = src;
    script.type = 'text/javascript';
    script.async = true;
    this.renderer.appendChild(document.body, script);
  }
}
