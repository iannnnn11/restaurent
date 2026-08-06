import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import {
  OrderService,
  UserOrder
} from '../../services/order';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './orders.html',
  styleUrl: './orders.css'
})
export class Orders implements OnInit {

  orders: UserOrder[] = [];

  constructor(
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orders = this.orderService.getOrders();
  }

  cancelOrder(orderId: string): void {
    this.orderService.cancelOrder(orderId);
    this.loadOrders();
  }

  getItemCount(order: UserOrder): number {
    return order.items.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );
  }
}