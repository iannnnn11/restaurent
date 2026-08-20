import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  HostListener,
  OnInit
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { Cart } from '../../services/cart';
import { InventoryService } from '../../services/inventory';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu implements OnInit, AfterViewInit {

  searchText = '';
  vegOnly = false;

  activeCategory = 'recommended';

  private categoryIds: string[] = [
    'recommended',
    'coffee',
    'nuts',
    'snacks'
  ];

  constructor(
    private cartService: Cart,
    private inventoryService: InventoryService
  ) {}

  coffeeItems = [

    {
      id: '1',
      name: 'Cappuccino',
      description: 'Rich coffee with steamed milk and foam.',
      price: 50,
      rating: 4.8,
      ratingCount: 210,
      image: '/images/cappuchino.jpg',
      isVeg: true,
      bestseller: true
    },

    {
      id: '2',
      name: 'Cold Coffee',
      description: 'Chilled coffee blended with milk.',
      price: 60,
      rating: 4.7,
      ratingCount: 175,
      image: '/images/coldcoffee.webp',
      isVeg: true,
      bestseller: true
    },

    {
      id: '3',
      name: 'Black Coffee',
      description: 'Strong coffee without milk or sugar.',
      price: 30,
      rating: 4.5,
      ratingCount: 92,
      image: '/images/blacktea.jpg',
      isVeg: true,
      bestseller: false
    },

    {
      id: '4',
      name: 'Green Tea',
      description: 'Refreshing and healthy green tea.',
      price: 25,
      rating: 4.6,
      ratingCount: 115,
      image: '/images/greentea.avif',
      isVeg: true,
      bestseller: false
    },

    {
      id: '5',
      name: 'Masala Tea',
      description: 'Indian tea prepared with aromatic spices.',
      price: 20,
      rating: 4.9,
      ratingCount: 320,
      image: '/images/masala.jpg',
      isVeg: true,
      bestseller: true
    }

  ];

  nutsItems = [

    {
      id: '6',
      name: 'Almonds',
      description: 'Healthy and crunchy roasted almonds.',
      price: 80,
      rating: 4.8,
      ratingCount: 140,
      image: '/images/almond.webp',
      isVeg: true,
      bestseller: true
    },

    {
      id: '7',
      name: 'Cashews',
      description: 'Premium roasted and salted cashews.',
      price: 95,
      rating: 4.7,
      ratingCount: 125,
      image: '/images/cashew.jpg',
      isVeg: true,
      bestseller: true
    },

    {
      id: '8',
      name: 'Walnuts',
      description: 'Nutritious walnuts rich in healthy fats.',
      price: 100,
      rating: 4.6,
      ratingCount: 88,
      image: '/images/walnut.webp',
      isVeg: true,
      bestseller: false
    },

    {
      id: '9',
      name: 'Pistachios',
      description: 'Lightly salted crunchy pistachios.',
      price: 110,
      rating: 4.8,
      ratingCount: 160,
      image: '/images/pistachio.jpg',
      isVeg: true,
      bestseller: true
    },

    {
      id: '10',
      name: 'Raisins',
      description: 'Naturally sweet and healthy dried grapes.',
      price: 60,
      rating: 4.5,
      ratingCount: 75,
      image: '/images/raisin.webp',
      isVeg: true,
      bestseller: false
    }

  ];

  snackItems = [

    {
      id: '11',
      name: 'Potato Chips',
      description: 'Crispy and lightly salted potato chips.',
      price: 20,
      rating: 4.6,
      ratingCount: 230,
      image: '/images/chip.jpg',
      isVeg: true,
      bestseller: true
    },

    {
      id: '12',
      name: 'Cookies',
      description: 'Crunchy chocolate-flavoured cookies.',
      price: 30,
      rating: 4.8,
      ratingCount: 280,
      image: '/images/cookie.jpg',
      isVeg: true,
      bestseller: true
    },

    {
      id: '13',
      name: 'Popcorn',
      description: 'Light and crispy salted popcorn.',
      price: 35,
      rating: 4.5,
      ratingCount: 130,
      image: '/images/popcorn.jpg',
      isVeg: true,
      bestseller: false
    },

    {
      id: '14',
      name: 'Protein Bar',
      description: 'Healthy snack packed with protein.',
      price: 70,
      rating: 4.7,
      ratingCount: 98,
      image: '/images/protein.jpg',
      isVeg: true,
      bestseller: false
    },

    {
      id: '15',
      name: 'Biscuits',
      description: 'Classic biscuits perfect with tea.',
      price: 20,
      rating: 4.6,
      ratingCount: 190,
      image: '/images/biscuit.webp',
      isVeg: true,
      bestseller: false
    }

  ];

  ngOnInit(): void {

    this.syncInventoryData();

  }

  ngAfterViewInit(): void {

    setTimeout(() => {
      this.updateActiveCategory();
    });

  }

  get recommendedItems(): any[] {

    return [
      this.coffeeItems[0],
      this.coffeeItems[4],
      this.nutsItems[0],
      this.nutsItems[3],
      this.snackItems[1],
      this.snackItems[3]
    ];

  }

  getFilteredItems(items: any[]): any[] {

    const search = this.searchText
      .trim()
      .toLowerCase();

    return items.filter(item => {

      const matchesSearch =
        item.name
          .toLowerCase()
          .includes(search) ||

        item.description
          .toLowerCase()
          .includes(search);

      const matchesVeg =
        !this.vegOnly ||
        item.isVeg === true;

      return matchesSearch && matchesVeg;

    });

  }

  syncInventoryData(): void {

    const inventoryItems =
      this.inventoryService.getItems();

    const allItems = [
      ...this.coffeeItems,
      ...this.nutsItems,
      ...this.snackItems
    ];

    allItems.forEach(item => {

      const inventoryItem =
        inventoryItems.find(
          inventory => inventory.id === item.id
        );

      if (!inventoryItem) {
        return;
      }

      item.price = inventoryItem.price;

    });

  }

  getStockQuantity(id: string): number {

    const inventoryItem =
      this.inventoryService
        .getItems()
        .find(item => item.id === id);

    return inventoryItem
      ? inventoryItem.quantity
      : 0;

  }

  isOutOfStock(id: string): boolean {

    return this.getStockQuantity(id) <= 0;

  }

  isLowStock(id: string): boolean {

    const item =
      this.inventoryService
        .getItems()
        .find(item => item.id === id);

    if (!item) {
      return false;
    }

    return (
      item.quantity > 0 &&
      item.quantity <= item.minStock
    );

  }

  getCartQuantity(id: string): number {

    const cartItem =
      this.cartService
        .getCartItems()
        .find(item => item.id === id);

    return cartItem
      ? cartItem.quantity
      : 0;

  }

  addToCart(item: any): void {

    const stock =
      this.getStockQuantity(item.id);

    const cartQuantity =
      this.getCartQuantity(item.id);

    if (stock <= 0) {
      return;
    }

    if (cartQuantity >= stock) {
      return;
    }

    this.cartService.addToCart(item);

  }

  increaseQuantity(item: any): void {

    const stock =
      this.getStockQuantity(item.id);

    const cartQuantity =
      this.getCartQuantity(item.id);

    if (cartQuantity >= stock) {
      return;
    }

    this.cartService.increaseQuantity(item);

  }

  decreaseQuantity(item: any): void {

    this.cartService.decreaseQuantity(item);

  }

  getCartCount(): number {

    return this.cartService
      .getCartItems()
      .reduce(
        (total: number, item: any) =>
          total + (item.quantity || 0),
        0
      );

  }

  getCartTotal(): number {

    return this.cartService
      .getCartItems()
      .reduce(
        (total: number, item: any) =>
          total +
          item.price *
          (item.quantity || 0),
        0
      );

  }

  scrollToSection(sectionId: string): void {

    const section =
      document.getElementById(sectionId);

    if (!section) {
      return;
    }

    this.activeCategory = sectionId;

    section.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

  }

  @HostListener('window:scroll')
  onWindowScroll(): void {

    this.updateActiveCategory();

  }

  private updateActiveCategory(): void {

    const checkingPosition = 230;

    for (
      let index = this.categoryIds.length - 1;
      index >= 0;
      index--
    ) {

      const sectionId =
        this.categoryIds[index];

      const section =
        document.getElementById(sectionId);

      if (
        section &&
        section.getBoundingClientRect().top <=
        checkingPosition
      ) {

        this.activeCategory = sectionId;

        return;

      }

    }

    this.activeCategory = 'recommended';

  }

}