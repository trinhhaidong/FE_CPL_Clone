import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    this.injectScript();

  }
  private injectScript() {
    this.addScript(' assets/vendors/jquery/jquery.min.js');
    this.addScript(' assets/vendors/magnific-popup/jquery.magnific-popup.min.js');
    this.addScript(' assets/vendors/swiper/swiper-bundle.min.js');
    this.addScript(' assets/js/script.js');
    this.addScript(' assets/js/nav-link-toggler.js');
    this.addScript(' assets/js/home-slider.js');
    this.addScript(' assets/js/counter-up.js');
    this.addScript(' assets/js/gallery.js');
    this.addScript(' assets/js/car-slider.js');
    this.addScript(' assets/js/testi-slider.js');
  }

  private addScript(src: string) {
    const script = this.renderer.createElement('script');
    script.src = src;  // Đường dẫn đến file JS của bạn
    script.type = 'text/javascript';
    script.async = true;
    this.renderer.appendChild(document.body, script);
  }
}
