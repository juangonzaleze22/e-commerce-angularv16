import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    TranslateModule,
    MatInputModule,
    MatSelectModule,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public currentLanguage: string = '';

  constructor(
    private translateService: TranslateService,
    private router: Router,
  ) {
    this.currentLanguage =
      translateService.currentLang || translateService.defaultLang;
  }

  ngOnInit() {}

  changeLanguage(language: MatSelectChange) {
    const { value } = language;
    value === 'es'
      ? this.translateService.use('es')
      : this.translateService.use('en');
    this.currentLanguage == this.translateService.currentLang;
  }

  goToContact() {
    this.router.navigate(['/about']);
  }
}
