import { Injectable } from '@angular/core';

export interface OrderItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export interface UserOrder {
  id: string;
  items: OrderItem[];
  total: number;
  status: 'Pending' | 'Preparing' | 'Ready' | 'Completed';
  orderDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private storageKey = 'jodetx-orders';

  getOrders(): UserOrder[] {
    const savedOrders = localStorage.getItem(this.storageKey);

    if (!savedOrders) {
      return [];
    }

    try {
      return JSON.parse(savedOrders);
    } catch {
      return [];
    }
  }

  placeOrder(
    items: OrderItem[],
    total: number
  ): UserOrder {

    const orders = this.getOrders();

    const newOrder: UserOrder = {
      id: `JT${Date.now()}`,
      items: items.map(item => ({ ...item })),
      total: total,
      status: 'Pending',
      orderDate: new Date().toLocaleString()
    };

    orders.unshift(newOrder);

    localStorage.setItem(
      this.storageKey,
      JSON.stringify(orders)
    );

    return newOrder;
  }

  cancelOrder(orderId: string): void {
    const updatedOrders = this.getOrders().filter(
      order => order.id !== orderId
    );

    localStorage.setItem(
      this.storageKey,
      JSON.stringify(updatedOrders)
    );
  }

  clearOrders(): void {
    localStorage.removeItem(this.storageKey);
  }
}