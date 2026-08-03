import { Service } from '@angular/core';

@Service()
export class Cart {

  cartItems: any[] = [];

  addToCart(item: any) {
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

    console.log('Cart items:', this.cartItems);
  }

  increaseQuantity(item: any) {
    item.quantity++;
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
    } else {
      this.removeItem(item);
    }
  }

  removeItem(item: any) {
    this.cartItems = this.cartItems.filter(
      cartItem => cartItem.id !== item.id
    );
  }

  getCartItems() {
    return this.cartItems;
  }
}