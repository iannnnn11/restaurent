import { Injectable } from '@angular/core';
import { InventoryItem } from '../models/inventory-item';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private storageKey = 'jodetx-inventory';
  private items: InventoryItem[] = [

    // Coffee & Tea
    {
      id: '1',
      name: 'Cappuccino',
      subtitle: 'Rich coffee with steamed milk and foam.',
      category: 'Beverages',
      quantity: 20,
      unit: 'pcs',
      minStock: 5,
      lastRestock: '17 Aug'
    },

    {
      id: '2',
      name: 'Cold Coffee',
      subtitle: 'Chilled coffee blended with milk.',
      category: 'Beverages',
      quantity: 20,
      unit: 'pcs',
      minStock: 5,
      lastRestock: '17 Aug'
    },

    {
      id: '3',
      name: 'Black Coffee',
      subtitle: 'Strong coffee without milk or sugar.',
      category: 'Beverages',
      quantity: 20,
      unit: 'pcs',
      minStock: 5,
      lastRestock: '17 Aug'
    },

    {
      id: '4',
      name: 'Green Tea',
      subtitle: 'Refreshing and healthy green tea.',
      category: 'Beverages',
      quantity: 20,
      unit: 'pcs',
      minStock: 5,
      lastRestock: '17 Aug'
    },

    {
      id: '5',
      name: 'Masala Tea',
      subtitle: 'Indian tea prepared with aromatic spices.',
      category: 'Beverages',
      quantity: 20,
      unit: 'pcs',
      minStock: 5,
      lastRestock: '17 Aug'
    },

    // Nuts
    {
      id: '6',
      name: 'Almonds',
      subtitle: 'Healthy and crunchy roasted almonds.',
      category: 'Nuts',
      quantity: 20,
      unit: 'packs',
      minStock: 5,
      lastRestock: '17 Aug'
    },

    {
      id: '7',
      name: 'Cashews',
      subtitle: 'Premium roasted and salted cashews.',
      category: 'Nuts',
      quantity: 20,
      unit: 'packs',
      minStock: 5,
      lastRestock: '17 Aug'
    },

    {
      id: '8',
      name: 'Walnuts',
      subtitle: 'Nutritious walnuts rich in healthy fats.',
      category: 'Nuts',
      quantity: 20,
      unit: 'packs',
      minStock: 5,
      lastRestock: '17 Aug'
    },

    {
      id: '9',
      name: 'Pistachios',
      subtitle: 'Lightly salted crunchy pistachios.',
      category: 'Nuts',
      quantity: 20,
      unit: 'packs',
      minStock: 5,
      lastRestock: '17 Aug'
    },

    {
      id: '10',
      name: 'Raisins',
      subtitle: 'Naturally sweet and healthy dried grapes.',
      category: 'Nuts',
      quantity: 20,
      unit: 'packs',
      minStock: 5,
      lastRestock: '17 Aug'
    },

    // Snacks
    {
      id: '11',
      name: 'Potato Chips',
      subtitle: 'Crispy and lightly salted potato chips.',
      category: 'Snacks',
      quantity: 20,
      unit: 'pcs',
      minStock: 5,
      lastRestock: '17 Aug'
    },

    {
      id: '12',
      name: 'Cookies',
      subtitle: 'Crunchy chocolate-flavoured cookies.',
      category: 'Snacks',
      quantity: 20,
      unit: 'pcs',
      minStock: 5,
      lastRestock: '17 Aug'
    },

    {
      id: '13',
      name: 'Popcorn',
      subtitle: 'Light and crispy salted popcorn.',
      category: 'Snacks',
      quantity: 20,
      unit: 'pcs',
      minStock: 5,
      lastRestock: '17 Aug'
    },

    {
      id: '14',
      name: 'Protein Bar',
      subtitle: 'Healthy snack packed with protein.',
      category: 'Snacks',
      quantity: 20,
      unit: 'pcs',
      minStock: 5,
      lastRestock: '17 Aug'
    },

    {
      id: '15',
      name: 'Biscuits',
      subtitle: 'Classic biscuits perfect with tea.',
      category: 'Snacks',
      quantity: 20,
      unit: 'pcs',
      minStock: 5,
      lastRestock: '17 Aug'
    }

  ];

  constructor() {
  const savedItems = localStorage.getItem(this.storageKey);

  if (savedItems) {
    try {
      this.items = JSON.parse(savedItems);
    } catch {
      console.log('Could not load saved inventory');
    }
  } else {
    localStorage.setItem(
      this.storageKey,
      JSON.stringify(this.items)
    );
  }
}
  getItems(): InventoryItem[] {
    return this.items;
  }


  updateQuantity(id: string, change: number): void {

    console.log(
      'Inventory update requested:',
      id,
      change
    );

    const item = this.items.find(
      (item: InventoryItem) => item.id === id
    );

    if (!item) {

      console.log(
        'Inventory item NOT found:',
        id
      );

      return;
    }

    console.log(
      'Before:',
      item.name,
      item.quantity
    );

    item.quantity += change;

    if (item.quantity < 0) {
      item.quantity = 0;
    }

    console.log(
      'After:',
      item.name,
      item.quantity
    );
    localStorage.setItem(
  this.storageKey,
  JSON.stringify(this.items)
);  
  }
  

}