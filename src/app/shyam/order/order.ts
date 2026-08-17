import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  OrderService,
  UserOrder
} from '../../services/order';

@Component({
  selector: 'app-order',
  imports: [CommonModule],
  templateUrl: './order.html',
  styleUrl: './order.css'
})
export class Order implements OnInit {

  orders: UserOrder[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.orders = this.orderService.getOrders();
  }

  updateStatus(
  orderId: string,
  status: 'Pending' | 'Preparing' | 'Ready' | 'Completed'
) {
  this.orderService.updateOrderStatus(orderId, status);

  this.orders = this.orderService.getOrders();
}

}