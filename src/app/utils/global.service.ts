import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  constructor() {}

  showPriceWithDiscount(price: number, discount: number): number {
    if (discount > 0) {
      const discountedPrice = price - price * (discount / 100);
      return discountedPrice;
    } else {
      return price;
    }
  }
}
