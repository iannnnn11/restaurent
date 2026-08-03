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
}