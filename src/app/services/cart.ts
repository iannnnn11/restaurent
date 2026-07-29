import { Service } from '@angular/core';

@Service()
export class Cart {

  cartItems: any[] = [];

  addToCart(item: any) {
    this.cartItems.push(item);

    console.log('Cart items:', this.cartItems);
  }

  getCartItems() {
    return this.cartItems;
  }
}