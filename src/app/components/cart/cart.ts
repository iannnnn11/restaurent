import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { Cart as CartService } from '../../services/cart';
import { OrderService } from '../../services/order';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
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

  couponCode = '';
  couponApplied = false;
  couponMessage = '';

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

    if (this.cartItems.length === 0) {
      this.resetCoupon();
    }
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
      (total: number, item: any) =>
        total + item.price * (item.quantity || 0),
      0
    );
  }

  getBillBeforeDiscount(): number {
    if (this.cartItems.length === 0) {
      return 0;
    }

    return (
      this.getSubtotal() +
      this.deliveryFee +
      this.platformFee +
      this.tax
    );
  }

  getDiscount(): number {
    if (!this.couponApplied) {
      return 0;
    }

    return this.getBillBeforeDiscount();
  }

  getGrandTotal(): number {
    const total =
      this.getBillBeforeDiscount() -
      this.getDiscount();

    return Math.max(total, 0);
  }

  applyCoupon(): void {
    const enteredCode =
      this.couponCode.trim().toUpperCase();

    if (this.cartItems.length === 0) {
      this.couponApplied = false;
      this.couponMessage =
        'Add items to your cart first.';
      return;
    }

    if (!enteredCode) {
      this.couponApplied = false;
      this.couponMessage =
        'Please enter a coupon code.';
      return;
    }

    if (enteredCode === 'JODETX100') {
      this.couponApplied = true;
      this.couponCode = 'JODETX100';
      this.couponMessage =
        'Employee coupon applied successfully. Your order is free.';
      return;
    }

    this.couponApplied = false;
    this.couponMessage =
      'Invalid coupon code.';
  }

  removeCoupon(): void {
    this.resetCoupon();
  }

  private resetCoupon(): void {
    this.couponCode = '';
    this.couponApplied = false;
    this.couponMessage = '';
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

    this.resetCoupon();

    this.router.navigate(['/orders']);
  }
}