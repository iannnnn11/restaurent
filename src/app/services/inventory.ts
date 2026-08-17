import { Injectable } from '@angular/core';
import { InventoryItem } from '../models/inventory-item';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private items: InventoryItem[] = [
    {
      id: 'milk',
      name: 'Milk',
      subtitle: 'Buffalo Milk',
      category: 'Beverages',
      quantity: 3,
      unit: 'L',
      minStock: 5,
      lastRestock: '12 Aug'
    },

    {
      id: 'coffee',
      name: 'Coffee Powder',
      subtitle: 'Premium Blend',
      category: 'Ingredients',
      quantity: 2,
      unit: 'Kg',
      minStock: 4,
      lastRestock: '11 Aug'
    },

    {
      id: 'bread',
      name: 'Bread',
      subtitle: 'Sandwich Bread',
      category: 'Ingredients',
      quantity: 12,
      unit: 'pcs',
      minStock: 8,
      lastRestock: '13 Aug'
    },

    {
      id: 'almonds',
      name: 'Almonds',
      subtitle: 'Roasted Almonds',
      category: 'Nuts',
      quantity: 8,
      unit: 'packs',
      minStock: 5,
      lastRestock: '10 Aug'
    }
  ];

  getItems(): InventoryItem[] {
    return this.items;
  }

}