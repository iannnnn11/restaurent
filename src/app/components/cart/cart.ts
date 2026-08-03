import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Cart as CartService } from '../../services/cart';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink ],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class CartComponent implements OnInit {

  cartItems: any[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
  }
  removeItem(item: any) {
  this.cartService.removeItem(item);
  this.cartItems = this.cartService.getCartItems();
}
increaseQuantity(item: any) {
  this.cartService.increaseQuantity(item);
}

decreaseQuantity(item: any) {
  this.cartService.decreaseQuantity(item);

  this.cartItems = this.cartService.getCartItems();
}
deliveryFee = 35;
platformFee = 6;
tax = 28;

getSubtotal(): number {
  return this.cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
}

getGrandTotal(): number {
  return (
    this.getSubtotal() +
    this.deliveryFee +
    this.platformFee +
    this.tax
  );
}

increaseQuantity(item: any): void {
  item.quantity++;
}

decreaseQuantity(item: any): void {
  if (item.quantity > 1) {
    item.quantity--;
  } else {
    this.removeItem(item);
  }
}

removeItem(item: any): void {
  this.cartItems = this.cartItems.filter(
    cartItem => cartItem !== item
  );
}

placeOrder(): void {
  console.log("Order placed successfully");
}
}