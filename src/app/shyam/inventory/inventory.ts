import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InventoryService } from '../../services/inventory';
import { InventoryItem } from '../../models/inventory-item';


@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './inventory.html',
  styleUrl: './inventory.css'
})
export class Inventory implements OnInit {

  // All inventory items
  items: InventoryItem[] = [];

  // Items displayed after filtering
  filteredItems: InventoryItem[] = [];

  // Search text
  searchText: string = '';

  // Selected category
  selectedCategory: string = 'All';

  // Selected stock status
  selectedStock: string = 'All';


  constructor(
    private inventoryService: InventoryService
  ) {}


  // =========================
  // INITIALIZE
  // =========================

  ngOnInit(): void {

    this.loadInventory();

  }


  // =========================
  // LOAD INVENTORY
  // =========================

  loadInventory(): void {

    this.items = this.inventoryService.getItems();

    this.applyFilters();

  }


  // =========================
  // SUMMARY CARDS
  // =========================

  get totalItems(): number {

    return this.items.length;

  }


  get inStockItems(): number {

    return this.items.filter(
      item => item.quantity > item.minStock
    ).length;

  }


  get lowStockItems(): number {

    return this.items.filter(
      item =>
        item.quantity > 0 &&
        item.quantity <= item.minStock
    ).length;

  }


  get outOfStockItems(): number {

    return this.items.filter(
      item => item.quantity === 0
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
  // CATEGORY LIST
  // =========================

  get categories(): string[] {

    return [
      ...new Set(
        this.items.map(
          item => item.category
        )
      )
    ];

  }


  // =========================
  // FILTERING
  // =========================

  applyFilters(): void {

    const search =
      this.searchText
        .toLowerCase()
        .trim();


    this.filteredItems = this.items.filter(
      item => {


        // Search
        const matchesSearch =
          search === '' ||
          item.name
            .toLowerCase()
            .includes(search) ||
          item.subtitle
            .toLowerCase()
            .includes(search);


        // Category
        const matchesCategory =
          this.selectedCategory === 'All' ||
          item.category === this.selectedCategory;


        // Stock status
        const matchesStock =
          this.selectedStock === 'All' ||
          this.getStockStatus(item) === this.selectedStock;


        return (
          matchesSearch &&
          matchesCategory &&
          matchesStock
        );

      }
    );

  }


  // =========================
  // INCREASE QUANTITY
  // =========================

  increaseQuantity(item: InventoryItem): void {

    this.inventoryService.updateQuantity(
      item.id,
      1
    );

    this.loadInventory();

  }


  // =========================
  // DECREASE QUANTITY
  // =========================

  decreaseQuantity(item: InventoryItem): void {

    if (item.quantity <= 0) {

      return;

    }

    this.inventoryService.updateQuantity(
      item.id,
      -1
    );

    this.loadInventory();

  }


  // =========================
  // RESTOCK
  // =========================

  restockItem(item: InventoryItem): void {

    // Add minimum-stock amount
    this.inventoryService.updateQuantity(
      item.id,
      item.minStock
    );

    // Update last restock date
    item.lastRestock = this.getToday();

    // Reload the data
    this.loadInventory();

  }


  // =========================
  // TODAY'S DATE
  // =========================

  private getToday(): string {

    return new Date().toLocaleDateString(
      'en-GB',
      {
        day: '2-digit',
        month: 'short'
      }
    );

  }

}