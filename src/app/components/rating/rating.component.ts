import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent {
  @Input() ratingValue!: number;
  stars: number[];

  constructor() {
    this.stars = [1, 2, 3, 4, 5];
  }

  isStarFilled(starIndex: number): boolean {
    const roundedRating = Math.round(this.ratingValue);
    if (starIndex < roundedRating) {
      return true;
    } else if (starIndex === roundedRating) {
      return this.ratingValue % 1 > 0.5;
    } else {
      return false;
    }
  }
}
