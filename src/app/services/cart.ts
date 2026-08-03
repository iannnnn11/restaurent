import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Cart {

  private cartItems: any[] = [];

  getCartItems(): any[] {
    return this.cartItems;
  }

  addToCart(item: any): void {
    const existingItem = this.cartItems.find(
      cartItem => cartItem.id === item.id
    );

    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cartItems.push({
        ...item,
        quantity: 1
      });
    }
  }

  increaseQuantity(item: any): void {
    const existingItem = this.cartItems.find(
      cartItem => cartItem.id === item.id
    );

    if (existingItem) {
      existingItem.quantity++;
    }
  }

  decreaseQuantity(item: any): void {
    const existingItem = this.cartItems.find(
      cartItem => cartItem.id === item.id
    );

    if (!existingItem) {
      return;
    }

    if (existingItem.quantity > 1) {
      existingItem.quantity--;
    } else {
      this.removeItem(existingItem);
    }
  }

  removeItem(item: any): void {
    this.cartItems = this.cartItems.filter(
      cartItem => cartItem.id !== item.id
    );
  }
}