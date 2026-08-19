import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  OrderService,
  UserOrder
} from '../../services/order';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './order.html',
  styleUrl: './order.css'
})
export class Order implements OnInit {

  orders: UserOrder[] = [];

  // Search
  searchText: string = '';

  // Status dropdown
  selectedStatus: 'All' | 'Pending' | 'Preparing' | 'Ready' | 'Completed' = 'All';

  // Date dropdown
  selectedDate: string = 'Today';

  // Table filter
  currentFilter: 'All' | 'Pending' | 'Preparing' | 'Ready' = 'All';


  constructor(
    private orderService: OrderService
  ) {}


  // Runs when component loads
  ngOnInit(): void {
    this.loadOrders();
  }


  // Reload orders from OrderService
  loadOrders(): void {
    this.orders = this.orderService.getOrders();
  }


  // =========================
  // DYNAMIC STATISTICS
  // =========================

  get totalOrders(): number {
    return this.orders.length;
  }


  get pendingOrders(): number {
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
    return (
      this.pendingOrders +
      this.preparingOrders +
      this.readyOrders
    );
  }


  // =========================
  // FILTERING
  // =========================

  get filteredOrders(): UserOrder[] {

    return this.orders.filter(order => {

      // Search filter
      const search = this.searchText.toLowerCase().trim();

      const matchesSearch =
        search === '' ||
        order.id.toLowerCase().includes(search) ||
        order.items.some(item =>
          item.name.toLowerCase().includes(search)
        );


      // Status dropdown filter
      const matchesStatus =
        this.selectedStatus === 'All' ||
        order.status === this.selectedStatus;


      // Top tab filter
      const matchesTab =
        this.currentFilter === 'All' ||
        order.status === this.currentFilter;


      return (
        matchesSearch &&
        matchesStatus &&
        matchesTab
      );
    });
  }


  // Change top tab filter
  setFilter(
    filter: 'All' | 'Pending' | 'Preparing' | 'Ready'
  ): void {

    this.currentFilter = filter;

  }


  // Apply search/status filter
  applyFilters(): void {
    // Nothing is required here because
    // filteredOrders is a getter.
    //
    // Angular automatically recalculates
    // filteredOrders when searchText,
    // selectedStatus or currentFilter changes.
  }


  // =========================
  // ORDER ACTIONS
  // =========================

  updateStatus(
    orderId: string,
    status: 'Pending' | 'Preparing' | 'Ready' | 'Completed'
  ): void {

    this.orderService.updateOrderStatus(
      orderId,
      status
    );

    this.loadOrders();
  }


  rejectOrder(orderId: string): void {

    this.orderService.cancelOrder(orderId);

    this.loadOrders();
  }

}