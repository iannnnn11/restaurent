import { Injectable } from '@angular/core';
import { InventoryService } from './inventory';

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
  constructor(
    private inventoryService: InventoryService
  ) {}

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

  // Reduce inventory after order is confirmed
  for (const item of items) {

  console.log(
    'Reducing inventory:',
    item.name,
    'ID:',
    item.id,
    'Quantity:',
    item.quantity
  );

  this.inventoryService.updateQuantity(
    item.id.toString(),
    -item.quantity
  );
}
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
  updateOrderStatus(
  orderId: string,
  status: 'Pending' | 'Preparing' | 'Ready' | 'Completed'
): void {

  const orders = this.getOrders();

  const order = orders.find(
    order => order.id === orderId
  );

  if (order) {
    order.status = status;

    localStorage.setItem(
      this.storageKey,
      JSON.stringify(orders)
    );
  }
}
}