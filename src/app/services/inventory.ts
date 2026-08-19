import { Injectable } from '@angular/core';
import { InventoryItem } from '../models/inventory-item';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private storageKey = 'jodetx-inventory';

  private items: InventoryItem[] = [

    {
      id: '1',
      name: 'Cappuccino',
      subtitle: 'Rich coffee with steamed milk and foam.',
      category: 'Beverages',
      quantity: 20,
      unit: 'pcs',
      minStock: 5,
      lastRestock: '17 Aug',
      costPrice: 20
    },

    {
      id: '2',
      name: 'Cold Coffee',
      subtitle: 'Chilled coffee blended with milk.',
      category: 'Beverages',
      quantity: 20,
      unit: 'pcs',
      minStock: 5,
      lastRestock: '17 Aug',
      costPrice: 25
    },

    {
      id: '3',
      name: 'Black Coffee',
      subtitle: 'Strong coffee without milk or sugar.',
      category: 'Beverages',
      quantity: 20,
      unit: 'pcs',
      minStock: 5,
      lastRestock: '17 Aug',
      costPrice: 12
    },

    {
      id: '4',
      name: 'Green Tea',
      subtitle: 'Refreshing and healthy green tea.',
      category: 'Beverages',
      quantity: 20,
      unit: 'pcs',
      minStock: 5,
      lastRestock: '17 Aug',
      costPrice: 10
    },

    {
      id: '5',
      name: 'Masala Tea',
      subtitle: 'Indian tea prepared with aromatic spices.',
      category: 'Beverages',
      quantity: 20,
      unit: 'pcs',
      minStock: 5,
      lastRestock: '17 Aug',
      costPrice: 8
    },

    {
      id: '6',
      name: 'Almonds',
      subtitle: 'Healthy and crunchy roasted almonds.',
      category: 'Nuts',
      quantity: 20,
      unit: 'packs',
      minStock: 5,
      lastRestock: '17 Aug',
      costPrice: 50
    },

    {
      id: '7',
      name: 'Cashews',
      subtitle: 'Premium roasted and salted cashews.',
      category: 'Nuts',
      quantity: 20,
      unit: 'packs',
      minStock: 5,
      lastRestock: '17 Aug',
      costPrice: 60
    },

    {
      id: '8',
      name: 'Walnuts',
      subtitle: 'Nutritious walnuts rich in healthy fats.',
      category: 'Nuts',
      quantity: 20,
      unit: 'packs',
      minStock: 5,
      lastRestock: '17 Aug',
      costPrice: 65
    },

    {
      id: '9',
      name: 'Pistachios',
      subtitle: 'Lightly salted crunchy pistachios.',
      category: 'Nuts',
      quantity: 20,
      unit: 'packs',
      minStock: 5,
      lastRestock: '17 Aug',
      costPrice: 70
    },

    {
      id: '10',
      name: 'Raisins',
      subtitle: 'Naturally sweet and healthy dried grapes.',
      category: 'Nuts',
      quantity: 20,
      unit: 'packs',
      minStock: 5,
      lastRestock: '17 Aug',
      costPrice: 35
    },

    {
      id: '11',
      name: 'Potato Chips',
      subtitle: 'Crispy and lightly salted potato chips.',
      category: 'Snacks',
      quantity: 20,
      unit: 'pcs',
      minStock: 5,
      lastRestock: '17 Aug',
      costPrice: 10
    },

    {
      id: '12',
      name: 'Cookies',
      subtitle: 'Crunchy chocolate-flavoured cookies.',
      category: 'Snacks',
      quantity: 20,
      unit: 'pcs',
      minStock: 5,
      lastRestock: '17 Aug',
      costPrice: 15
    },

    {
      id: '13',
      name: 'Popcorn',
      subtitle: 'Light and crispy salted popcorn.',
      category: 'Snacks',
      quantity: 20,
      unit: 'pcs',
      minStock: 5,
      lastRestock: '17 Aug',
      costPrice: 18
    },

    {
      id: '14',
      name: 'Protein Bar',
      subtitle: 'Healthy snack packed with protein.',
      category: 'Snacks',
      quantity: 20,
      unit: 'pcs',
      minStock: 5,
      lastRestock: '17 Aug',
      costPrice: 45
    },

    {
      id: '15',
      name: 'Biscuits',
      subtitle: 'Classic biscuits perfect with tea.',
      category: 'Snacks',
      quantity: 20,
      unit: 'pcs',
      minStock: 5,
      lastRestock: '17 Aug',
      costPrice: 10
    }

  ];


  constructor() {

    const savedItems = localStorage.getItem(this.storageKey);

    if (savedItems) {

      try {

        this.items = JSON.parse(savedItems);

      } catch {

        console.log('Could not load saved inventory');

        this.saveItems();

      }

    } else {

      this.saveItems();

    }

  }


  getItems(): InventoryItem[] {

    return this.items;

  }


  increaseQuantity(id: string): void {

    const item = this.items.find(
      item => item.id === id
    );

    if (!item) {
      return;
    }

    item.quantity++;

    this.saveItems();

  }


  decreaseQuantity(id: string): void {

    const item = this.items.find(
      item => item.id === id
    );

    if (!item || item.quantity <= 0) {
      return;
    }

    item.quantity--;

    this.saveItems();

  }


  updateQuantity(
    id: string,
    change: number
  ): void {

    const item = this.items.find(
      item => item.id === id
    );

    if (!item) {
      return;
    }

    item.quantity += change;

    if (item.quantity < 0) {
      item.quantity = 0;
    }

    this.saveItems();

  }


  restockItem(id: string): void {

    const item = this.items.find(
      item => item.id === id
    );

    if (!item) {
      return;
    }

    item.quantity += item.minStock;

    item.lastRestock = this.getToday();

    this.saveItems();

  }


  private saveItems(): void {

    localStorage.setItem(
      this.storageKey,
      JSON.stringify(this.items)
    );

  }


  private getToday(): string {

    return new Date().toLocaleDateString(
      'en-GB',
      {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }
    );

  }

}