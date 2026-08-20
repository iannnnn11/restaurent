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

  items: InventoryItem[] = [];
  filteredItems: InventoryItem[] = [];

  searchText = '';
  selectedCategory = 'All';
  selectedStock = 'All';

  editingPriceId: string | null = null;
  newPrice = 0;

  constructor(
    private inventoryService: InventoryService
  ) {}

  ngOnInit(): void {
    this.loadInventory();
  }

  loadInventory(): void {
    this.items = this.inventoryService.getItems();
    this.applyFilters();
  }

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

  getStockStatus(item: InventoryItem): string {

    if (item.quantity === 0) {
      return 'Out of Stock';
    }

    if (item.quantity <= item.minStock) {
      return 'Low Stock';
    }

    return 'In Stock';
  }

  get categories(): string[] {
    return [
      ...new Set(
        this.items.map(item => item.category)
      )
    ];
  }

  applyFilters(): void {

    const search = this.searchText
      .toLowerCase()
      .trim();

    this.filteredItems = this.items.filter(item => {

      const matchesSearch =
        search === '' ||
        item.name.toLowerCase().includes(search) ||
        item.subtitle.toLowerCase().includes(search);

      const matchesCategory =
        this.selectedCategory === 'All' ||
        item.category === this.selectedCategory;

      const matchesStock =
        this.selectedStock === 'All' ||
        this.getStockStatus(item) === this.selectedStock;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStock
      );
    });
  }

  increaseQuantity(item: InventoryItem): void {

    this.inventoryService.updateQuantity(
      item.id,
      1
    );

    this.loadInventory();
  }

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

  startPriceEdit(item: InventoryItem): void {

    this.editingPriceId = item.id;
    this.newPrice = item.price;
  }

  savePrice(item: InventoryItem): void {

    if (this.newPrice <= 0) {
      return;
    }

    this.inventoryService.updatePrice(
      item.id,
      this.newPrice
    );

    this.editingPriceId = null;

    this.loadInventory();
  }

  cancelPriceEdit(): void {

    this.editingPriceId = null;
  }
}