import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Observable } from 'rxjs';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { RatingComponent } from 'src/app/components/rating/rating.component';
import { GlobalService } from 'src/app/utils/global.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    CommonModule,
    CarouselModule,
    NgxImageZoomModule,
    RatingComponent,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  @ViewChild('previewImage') previewImage!: any;

  myThumbnail = 'https://wittlock.github.io/ngx-image-zoom/assets/thumb.jpg';
  myFullresImage =
    'https://wittlock.github.io/ngx-image-zoom/assets/fullres.jpg';

  loading: boolean = false;
  product$: Observable<Product> = new Observable();
  activeIndexOwl: number = 0;
  quantity: number = 0;

  customOptions: OwlOptions = {
    loop: false,
    dots: false,
    navSpeed: 700,
    nav: true,
    navText: [
      '<img src="assets/icons/icon-arrow-left.svg">',
      '<img src="assets/icons/icon-arrow-right.svg">',
    ],
    margin: 16,
    responsive: {
      0: {
        items: 4,
      },
      940: {
        items: 4,
      },
    },
  };

  constructor(
    private _route: ActivatedRoute,
    private productService: ProductsService,
    public utils: GlobalService,
  ) {}

  ngOnInit(): void {
    this._route.params.subscribe((params: Params) => {
      const { id } = params;
      this.getDetailProduct(id);
    });
  }

  getDetailProduct(id: string) {
    this.loading = true;
    this.product$ = this.productService.getDetailProduct(id);

    this.productService
      .getDetailProduct(id)
      .subscribe((product) => console.log(product));
  }

  changeImageOwlCarousel(img: string, i: number) {
    this.previewImage.imageThumbnail.nativeElement.src = img;
    this.previewImage.fullImage = img;
    this.activeIndexOwl = i;
  }

  increment() {
    this.quantity++;
  }

  decrement() {
    if (this.quantity > 0) {
      this.quantity--;
    }
  }
}
