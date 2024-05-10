import { Component, Input  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'

import { trigger, state, style, transition, animate } from '@angular/animations';



@Component({
  selector: 'app-lazy-image',
  standalone: true,
  imports: [CommonModule, LazyLoadImageModule, MatProgressSpinnerModule],
  template: `

  <!-- Display the loading image -->
  <div class="bodyImage">
    <div class="bodySpinner" [@fadeOut]="loading" *ngIf="loading">
      <mat-spinner class="bodyImage__spinner" ></mat-spinner>
    </div>

  <!-- Display the lazy-loaded image -->
  <img
    class="lazy-image"
   [defaultImage]="defaultImage"
   [errorImage]="errorImage"
   [lazyLoad]="imageUrl"
   (load)="onImageLoad()"
   >
  </div>
`,
  styleUrls: ['./lazy-image.component.scss'],
  animations: [
    trigger('fadeOut', [
      state('true', style({ opacity: 1 })),
      state('false', style({ opacity: 0 })),
      transition('true => false', animate('.300ms ease-out'))
    ])
  ],
})
export class LazyImageComponent {

  @Input() imageUrl!: string;
  defaultImage!: string;
  errorImage!: string;
  loading: boolean = true;

  onImageLoad(){
   this.loading = false;
  }
}
