import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { Cart as CartService } from '../../services/cart';
import { OrderService } from '../../services/order';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class CartComponent implements OnInit {

  cartItems: any[] = [];

  deliveryFee = 35;
  platformFee = 6;
  tax = 28;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  increaseQuantity(item: any): void {
    this.cartService.increaseQuantity(item);
    this.loadCartItems();
  }

  decreaseQuantity(item: any): void {
    this.cartService.decreaseQuantity(item);
    this.loadCartItems();
  }

  removeItem(item: any): void {
    this.cartService.removeItem(item);
    this.loadCartItems();
  }

  getSubtotal(): number {
    return this.cartItems.reduce(
      (total, item) =>
        total + item.price * item.quantity,
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

  placeOrder(): void {
    if (this.cartItems.length === 0) {
      return;
    }

    this.orderService.placeOrder(
      this.cartItems,
      this.getGrandTotal()
    );

    this.cartService.clearCart();

    this.cartItems = [];

    this.router.navigate(['/orders']);
  }
}