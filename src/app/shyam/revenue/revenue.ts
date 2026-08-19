import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface RevenueOrder {
  id: string;
  total: number;
  status: string;
  items: any[];
  date?: string;
  orderDate?: string;
  createdAt?: string;
}

@Component({
  selector: 'app-revenue',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './revenue.html',
  styleUrl: './revenue.css'
})
export class Revenue implements OnInit {

  orders: RevenueOrder[] = [];

  totalRevenue = 0;
  todayRevenue = 0;
  totalOrders = 0;
  averageOrderValue = 0;

  dailyRevenue: { date: string; revenue: number }[] = [];

  ngOnInit(): void {
    this.loadRevenue();
  }

  loadRevenue(): void {

    const savedOrders = localStorage.getItem('jodetx-orders');

    if (!savedOrders) {
      this.orders = [];
      return;
    }

    this.orders = JSON.parse(savedOrders);

    this.calculateRevenue();
  }

  calculateRevenue(): void {

    // Reset values
    this.totalRevenue = 0;
    this.todayRevenue = 0;

    const today = new Date().toDateString();

    this.orders.forEach(order => {

      // Only count valid orders
      const amount = Number(order.total) || 0;

      this.totalRevenue += amount;

      // Get order date
      const orderDate =
        order.date ||
        order.orderDate ||
        order.createdAt;

      if (orderDate) {

        const date = new Date(orderDate);

        if (date.toDateString() === today) {
          this.todayRevenue += amount;
        }
      }
    });

    this.totalOrders = this.orders.length;

    if (this.totalOrders > 0) {
      this.averageOrderValue =
        this.totalRevenue / this.totalOrders;
    } else {
      this.averageOrderValue = 0;
    }

    this.calculateDailyRevenue();
  }

  calculateDailyRevenue(): void {

    const revenueMap: { [key: string]: number } = {};

    this.orders.forEach(order => {

      const amount = Number(order.total) || 0;

      const orderDate =
        order.date ||
        order.orderDate ||
        order.createdAt;

      if (!orderDate) {
        return;
      }

      const date = new Date(orderDate);

      const formattedDate = date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short'
      });

      if (!revenueMap[formattedDate]) {
        revenueMap[formattedDate] = 0;
      }

      revenueMap[formattedDate] += amount;
    });

    this.dailyRevenue = Object.keys(revenueMap).map(date => ({
      date: date,
      revenue: revenueMap[date]
    }));
  }

  getItemCount(order: RevenueOrder): number {

    if (!order.items) {
      return 0;
    }

    return order.items.reduce((total, item) => {
      return total + (Number(item.quantity) || 0);
    }, 0);
  }

  refreshRevenue(): void {
    this.loadRevenue();
  }
}