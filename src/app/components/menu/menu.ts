import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Cart } from '../../services/cart';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu {

  @ViewChild('coffeeRow') coffeeRow!: ElementRef;
  @ViewChild('nutsRow') nutsRow!: ElementRef;
  @ViewChild('snacksRow') snacksRow!: ElementRef;

  // Angular gives the Cart service to Menu here
  constructor(private cartService: Cart) {}

  coffeeItems = [
    {
      id: 1,
      name: 'Cappuccino',
      description: 'Rich coffee with steamed milk and foam.',
      price: 40,
      rating: 4.8,
      image: '/images/cappuchino.jpg'
    },
    {
      id: 2,
      name: 'Cold Coffee',
      description: 'Chilled coffee blended with milk.',
      price: 50,
      rating: 4.7,
      image: '/images/coldcoffee.webp'
    },
    {
      id: 3,
      name: 'Black Coffee',
      description: 'Strong coffee without milk or sugar.',
      price: 30,
      rating: 4.5,
      image: '/images/blacktea.jpg'
    },
    {
      id: 4,
      name: 'Green Tea',
      description: 'Refreshing and healthy green tea.',
      price: 25,
      rating: 4.6,
      image: '/images/greentea.avif'
    },
    {
      id: 5,
      name: 'Masala Tea',
      description: 'Indian tea prepared with aromatic spices.',
      price: 20,
      rating: 4.9,
      image: '/images/masala.jpg'
    }
  ];

  nutsItems = [
    {
      id: 6,
      name: 'Almonds',
      description: 'Healthy and crunchy roasted almonds.',
      price: 80,
      rating: 4.8,
      image: '/images/almond.webp'
    },
    {
      id: 7,
      name: 'Cashews',
      description: 'Premium roasted and salted cashews.',
      price: 90,
      rating: 4.7,
      image: '/images/cashew.jpg'
    },
    {
      id: 8,
      name: 'Walnuts',
      description: 'Nutritious walnuts rich in healthy fats.',
      price: 100,
      rating: 4.6,
      image: '/images/walnut.webp'
    },
    {
      id: 9,
      name: 'Pistachios',
      description: 'Lightly salted crunchy pistachios.',
      price: 110,
      rating: 4.8,
      image: '/images/pistachio.jpg'
    },
    {
      id: 10,
      name: 'Raisins',
      description: 'Naturally sweet and healthy dried grapes.',
      price: 60,
      rating: 4.5,
      image: '/images/raisin.webp'
    }
  ];

  snackItems = [
    {
      id: 11,
      name: 'Potato Chips',
      description: 'Crispy and lightly salted potato chips.',
      price: 20,
      rating: 4.6,
      image: '/images/chip.jpg'
    },
    {
      id: 12,
      name: 'Cookies',
      description: 'Crunchy chocolate-flavoured cookies.',
      price: 30,
      rating: 4.8,
      image: '/images/cookie.jpg'
    },
    {
      id: 13,
      name: 'Popcorn',
      description: 'Light and crispy salted popcorn.',
      price: 35,
      rating: 4.5,
      image: '/images/popcorn.jpg'
    },
    {
      id: 14,
      name: 'Protein Bar',
      description: 'Healthy snack packed with protein.',
      price: 70,
      rating: 4.7,
      image: '/images/protein.jpg'
    },
    {
      id: 15,
      name: 'Biscuits',
      description: 'Classic biscuits perfect with tea.',
      price: 20,
      rating: 4.6,
      image: '/images/biscuit.webp'
    }
  ];

  addToCart(item: any) {
    this.cartService.addToCart(item);

    console.log('Item sent to Cart service:', item);
  }


  scrollLeft(row: HTMLElement) {
    row.scrollBy({
      left: -700,
      behavior: 'smooth'
    });
  }

  scrollRight(row: HTMLElement) {
    row.scrollBy({
      left: 700,
      behavior: 'smooth'
    });
  }
}