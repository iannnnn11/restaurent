import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import {
  OrderService,
  UserOrder
} from '../../services/order';

import {
  InventoryService
} from '../../services/inventory';
import { InventoryItem } from '../../models/inventory-item';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  // =========================
  // DATA
  // =========================

  orders: UserOrder[] = [];

  inventory: InventoryItem[] = [];


  constructor(
    private orderService: OrderService,
    private inventoryService: InventoryService
  ) {}


  // =========================
  // INITIAL LOAD
  // =========================

  ngOnInit(): void {

    this.loadDashboard();

  }


  // =========================
  // LOAD DASHBOARD
  // =========================

  loadDashboard(): void {

    this.orders = this.orderService.getOrders();

    this.inventory = this.inventoryService.getItems();

  }


  // =========================
  // DATE
  // =========================

  get today(): string {

    return new Date().toLocaleDateString(
      'en-IN',
      {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
      }
    );

  }


  // =========================
  // ORDER COUNTS
  // =========================

  get waitingOrders(): number {

    return this.orders.filter(
      order => order.status === 'Pending'
    ).length;

  }


  get preparingOrders(): number {

    return this.orders.filter(
      order => order.status === 'Preparing'
    ).length;

  }


  get readyOrders(): number {

    return this.orders.filter(
      order => order.status === 'Ready'
    ).length;

  }


  get activeOrders(): number {

    return this.orders.filter(
      order =>
        order.status !== 'Completed'
    ).length;

  }


  // =========================
  // CURRENT ORDERS
  // =========================

  get currentOrders(): UserOrder[] {

    return this.orders
      .filter(
        order =>
          order.status !== 'Completed'
      )
      .slice(0, 5);

  }


  // =========================
  // INVENTORY
  // =========================

  get lowStockItems(): InventoryItem[] {

    return this.inventory
      .filter(
        item =>
          item.quantity > 0 &&
          item.quantity <= item.minStock
      )
      .slice(0, 5);

  }


  get outOfStockItems(): InventoryItem[] {

    return this.inventory
      .filter(
        item =>
          item.quantity === 0
      );

  }


  get stockAlertItems(): InventoryItem[] {

    return this.inventory
      .filter(
        item =>
          item.quantity <= item.minStock
      )
      .slice(0, 5);

  }


  get stockAlertCount(): number {

    return this.inventory.filter(
      item =>
        item.quantity <= item.minStock
    ).length;

  }


  // =========================
  // STOCK STATUS
  // =========================

  getStockStatus(item: InventoryItem): string {

    if (item.quantity === 0) {

      return 'Out of Stock';

    }

    if (item.quantity <= item.minStock) {

      return 'Low Stock';

    }

    return 'In Stock';

  }


  // =========================
  // ORDER STATUS
  // =========================

  updateOrderStatus(
    orderId: string,
    status: 'Pending' | 'Preparing' | 'Ready' | 'Completed'
  ): void {

    this.orderService.updateOrderStatus(
      orderId,
      status
    );

    this.loadDashboard();

  }


  // =========================
  // REFRESH
  // =========================

  refreshDashboard(): void {

    this.loadDashboard();

  }

}