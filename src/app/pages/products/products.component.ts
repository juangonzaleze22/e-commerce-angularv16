import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { Observable, map } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CardComponent } from 'src/app/components/card/card.component';
import { MY_CONSTANTS } from 'src/app/constants';
import { TranslateModule } from '@ngx-translate/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipListboxChange, MatChipsModule } from '@angular/material/chips';
import { MatOptionSelectionChange } from '@angular/material/core';
import { MatRadioChange, MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    InfiniteScrollModule,
    CardComponent,
    TranslateModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatRadioModule,
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  loading: boolean = false;
  params: string = '';

  skip: number = 0;
  limit: number = 10;
  total!: number;

  selectedCategory: string = '';

  categories$: Observable<string[]> = new Observable();

  products: Product[] = [];
  sortProducts: Product[] = [];

  constructor(
    private _router: ActivatedRoute,
    private ProductsService: ProductsService,
  ) {}

  ngOnInit() {
    this._router.params.subscribe((params: Params) => {
      const { filter } = params;
      console.log(params);
      this.params = filter;
    });

    this.getAllProducts(this.limit, this.skip, this.selectedCategory);
    this.getCategories();
  }

  getAllProducts(limit: number, skip: number, category: string = ''): void {
    this.loading = true;
    this.ProductsService.getAllProducts(limit, skip, category)
      .pipe(
        map((response: any) => {
          const { products } = response;

          console.log('object', products);

          let sortedProducts: Product[] = [];

          this.total = response.total;

          if (this.params == MY_CONSTANTS.DISCOUNT) {
            sortedProducts = products
              .slice()
              .sort(
                (
                  productA: { discountPercentage: number },
                  productB: { discountPercentage: number },
                ) => productB.discountPercentage - productA.discountPercentage,
              );
          }

          if (this.params == MY_CONSTANTS.RATED) {
            sortedProducts = products
              .slice()
              .sort(
                (productA: { rating: number }, productB: { rating: number }) =>
                  productB.rating - productA.rating,
              );
          }

          return sortedProducts;
        }),
      )
      .subscribe({
        next: (response: any) => {
          this.products = [...this.products, ...response];
        },
        error: (error: Error) => {
          console.log('error', error);
        },
        complete: () => {
          this.loading = false;
        },
      });
  }

  getCategories(): void {
    this.loading = true;
    this.categories$ = this.ProductsService.getCategories();
  }

  onScroll() {
    if (!this.loading && this.products.length < this.total) {
      this.skip += this.limit; // Incrementa el número de productos a omitir
      this.getAllProducts(this.limit, this.skip, this.selectedCategory);
    }
  }

  onChangeCategory(event: any) {
    const { value } = event;

    console.log(event);
    this.selectedCategory = value;
    this.products = [];
    this.limit = 10;
    this.skip = 0;

    if (!value) {
      this.getAllProducts(this.limit, this.skip);
      return;
    }
    this.getAllProducts(this.limit, this.skip, this.selectedCategory);
  }
}
