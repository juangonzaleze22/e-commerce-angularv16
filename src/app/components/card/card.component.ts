import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from 'src/app/models/product.model';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { LazyImageComponent } from '../lazy-image/lazy-image.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    TranslateModule,
    LazyImageComponent,
  ],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() product!: Product;
  @Input() showDisscount: boolean = false;

  constructor(
    private route: Router,
    public utils: GlobalService,
  ) {}

  ngOnInit(): void {}

  detailProduct(id: number): void {
    this.route.navigate(['/products/detail/' + id]);
  }
}
import { GlobalService } from 'src/app/utils/global.service';
