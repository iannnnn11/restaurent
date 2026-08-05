import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface UserOrder {
  id: string;
  restaurantName: string;
  restaurantImage: string;
  orderDate: string;
  deliveryDate?: string;
  estimatedTime?: string;
  total: number;
  paymentStatus: 'Paid' | 'Cash on Delivery' | 'Refund Processing';
  status:
    | 'Pending'
    | 'Preparing'
    | 'Ready'
    | 'Out for Delivery'
    | 'Delivered'
    | 'Cancelled';
  address: string;
  items: OrderItem[];
}

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './orders.html',
  styleUrl: './orders.css'
})
export class Orders {
  selectedTab = 'All';
  searchText = '';

  tabs = ['All', 'Active', 'Completed', 'Cancelled'];

  orders: UserOrder[] = [
    {
      id: 'ORD0090',
      restaurantName: 'Pizza Zone',
      restaurantImage:
        'https://images.unsplash.com/photo-1579751626657-72bc17010498?w=500',
      orderDate: '5 August 2026, 2:20 PM',
      estimatedTime: '25-30 minutes',
      total: 860,
      paymentStatus: 'Paid',
      status: 'Preparing',
      address: 'Andheri West, Mumbai, Maharashtra',
      items: [
        {
          name: 'Farmhouse Pizza',
          quantity: 1,
          price: 420
        },
        {
          name: 'Cold Coffee',
          quantity: 2,
          price: 140
        },
        {
          name: 'French Fries',
          quantity: 1,
          price: 160
        }
      ]
    },
    {
      id: 'ORD0087',
      restaurantName: 'Burger House',
      restaurantImage:
        'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500',
      orderDate: '4 August 2026, 8:15 PM',
      estimatedTime: '10-15 minutes',
      total: 590,
      paymentStatus: 'Cash on Delivery',
      status: 'Out for Delivery',
      address: 'Bandra East, Mumbai, Maharashtra',
      items: [
        {
          name: 'Double Cheese Burger',
          quantity: 2,
          price: 220
        },
        {
          name: 'Peri Peri Fries',
          quantity: 1,
          price: 150
        }
      ]
    },
    {
      id: 'ORD0084',
      restaurantName: 'Spice Kitchen',
      restaurantImage:
        'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?w=500',
      orderDate: '2 August 2026, 7:40 PM',
      deliveryDate: '2 August 2026, 8:25 PM',
      total: 740,
      paymentStatus: 'Paid',
      status: 'Delivered',
      address: 'Powai, Mumbai, Maharashtra',
      items: [
        {
          name: 'Chicken Biryani',
          quantity: 2,
          price: 320
        },
        {
          name: 'Coca Cola',
          quantity: 1,
          price: 100
        }
      ]
    },
    {
      id: 'ORD0079',
      restaurantName: 'Green Bowl',
      restaurantImage:
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500',
      orderDate: '29 July 2026, 1:10 PM',
      total: 430,
      paymentStatus: 'Refund Processing',
      status: 'Cancelled',
      address: 'Thane West, Maharashtra',
      items: [
        {
          name: 'Veggie Bowl',
          quantity: 1,
          price: 280
        },
        {
          name: 'Fresh Lime Juice',
          quantity: 1,
          price: 150
        }
      ]
    }
  ];

  get filteredOrders(): UserOrder[] {
    return this.orders.filter(order => {
      const search = this.searchText.toLowerCase().trim();

      const matchesSearch =
        order.id.toLowerCase().includes(search) ||
        order.restaurantName.toLowerCase().includes(search) ||
        order.items.some(item =>
          item.name.toLowerCase().includes(search)
        );

      let matchesTab = true;

      if (this.selectedTab === 'Active') {
        matchesTab = this.isActiveOrder(order);
      }

      if (this.selectedTab === 'Completed') {
        matchesTab = order.status === 'Delivered';
      }

      if (this.selectedTab === 'Cancelled') {
        matchesTab = order.status === 'Cancelled';
      }

      return matchesSearch && matchesTab;
    });
  }

  getTabCount(tab: string): number {
    if (tab === 'All') {
      return this.orders.length;
    }

    if (tab === 'Active') {
      return this.orders.filter(order => this.isActiveOrder(order)).length;
    }

    if (tab === 'Completed') {
      return this.orders.filter(order => order.status === 'Delivered').length;
    }

    return this.orders.filter(order => order.status === 'Cancelled').length;
  }

  isActiveOrder(order: UserOrder): boolean {
    return !['Delivered', 'Cancelled'].includes(order.status);
  }

  canCancelOrder(order: UserOrder): boolean {
    return order.status === 'Pending';
  }

  cancelOrder(order: UserOrder): void {
    const confirmed = window.confirm(
      `Are you sure you want to cancel order ${order.id}?`
    );

    if (confirmed) {
      order.status = 'Cancelled';
      order.paymentStatus = 'Refund Processing';
    }
  }

  reorder(order: UserOrder): void {
    console.log('Reordering:', order);
    alert(`${order.id} items have been added to your cart.`);
  }

  viewDetails(order: UserOrder): void {
    console.log('Viewing order:', order);
  }

  trackOrder(order: UserOrder): void {
    console.log('Tracking order:', order);
  }

  rateOrder(order: UserOrder): void {
    console.log('Rating order:', order);
  }

  downloadInvoice(order: UserOrder): void {
    console.log('Downloading invoice:', order);
  }

  getStatusClass(status: UserOrder['status']): string {
    switch (status) {
      case 'Pending':
        return 'status-pending';

      case 'Preparing':
        return 'status-preparing';

      case 'Ready':
        return 'status-ready';

      case 'Out for Delivery':
        return 'status-delivery';

      case 'Delivered':
        return 'status-delivered';

      case 'Cancelled':
        return 'status-cancelled';

      default:
        return '';
    }
  }

  getPaymentClass(payment: UserOrder['paymentStatus']): string {
    switch (payment) {
      case 'Paid':
        return 'payment-paid';

      case 'Cash on Delivery':
        return 'payment-cod';

      case 'Refund Processing':
        return 'payment-refund';

      default:
        return '';
    }
  }

  getStatusStep(status: UserOrder['status']): number {
    switch (status) {
      case 'Pending':
        return 1;

      case 'Preparing':
        return 2;

      case 'Ready':
        return 3;

      case 'Out for Delivery':
        return 4;

      case 'Delivered':
        return 5;

      default:
        return 0;
    }
  }
}