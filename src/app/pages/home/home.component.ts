import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../services/products.service';
import { Product } from 'src/app/models/product.model';
import { CardComponent } from 'src/app/components/card/card.component';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { TranslateModule } from '@ngx-translate/core';
import { map } from 'rxjs';
import { BannerComponent } from 'src/app/components/banner/banner.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CarouselModule,
    CardComponent,
    TranslateModule,
    BannerComponent,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  loading: boolean = false;
  products: Product[] = []
  productsMostValue: Product[] = []
  productsTopRating: Product[] = []

  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;

  /* carousel */
  customOptions: OwlOptions = {
    loop: false,
    dots: false,
    navSpeed: 700,
    nav: true,
    navText: ['<img src="assets/icons/icon-arrow-left.svg">', '<img src="assets/icons/icon-arrow-right.svg">'],
    margin: 16,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
  }

  constructor(
    private ProductsService: ProductsService
  ){

  }

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts(): void {
    this.loading = true;
    this.ProductsService.getProducts().pipe(
      map((response: any) => {
        const { products } = response;
        return products
      })
    ).subscribe({
      next: (product: Product[]) =>{
        this.products = product;
        this.productsMostValue = product.slice().sort((productA, productB) => productB.discountPercentage - productA.discountPercentage);
        this.productsTopRating = product.slice().sort((productA, productB) => productB.rating - productA.rating);
      },
      error: (error: Error) => {
        console.log("error", error);
      },
      complete: () => {
        this.loading = false
      }
    })
  }


  goToPage(page: number): void {
    this.currentPage = page;
    this.getProducts();
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getProducts();
    }
  }

  nextPage(): void {
    const totalPages = Math.ceil(this.totalItems / this.pageSize);
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.getProducts();
    }
  }

}
