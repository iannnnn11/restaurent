import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu {

  @ViewChild('pizzaRow') pizzaRow!: ElementRef;

  pizzaItems = [
    {
      name: 'Pepperoni Pizza',
      description: 'Cheese, pepperoni and Italian herbs.',
      price: 349,
      rating: 4.8,
      image: '/images/pizza1.webp'
    },
    {
      name: 'Margherita Pizza',
      description: 'Mozzarella, tomato sauce and basil.',
      price: 299,
      rating: 4.6,
      image: '/images/pizza2.avif'
    },
    {
      name: 'Farmhouse Pizza',
      description: 'Fresh vegetables, cheese and herbs.',
      price: 379,
      rating: 4.7,
      image: '/images/pizza3.jpg'
    },
    {
      name: 'Cheese Burst Pizza',
      description: 'Loaded with extra melted cheese.',
      price: 399,
      rating: 4.9,
      image: '/images/Margherita.jpg'
    },
    {
      name: 'BBQ Chicken Pizza',
      description: 'BBQ chicken, onions and mozzarella.',
      price: 449,
      rating: 4.8,
      image: '/images/pizza1.webp'
    },
    {
      name: 'Mexican Pizza',
      description: 'Spicy vegetables, jalapeños and cheese.',
      price: 389,
      rating: 4.5,
      image: '/images/pizza1.webp'
    }
  ];

  scrollLeft() {
    this.pizzaRow.nativeElement.scrollBy({
      left: -700,
      behavior: 'smooth'
    });
  }

  scrollRight() {
    this.pizzaRow.nativeElement.scrollBy({
      left: 700,
      behavior: 'smooth'
    });
  }

  addToCart(item: any) {
    console.log('Added to cart:', item);
  }
}