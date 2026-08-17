import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryService } from '../../services/inventory';
import { InventoryItem } from '../../models/inventory-item';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.html',
  styleUrl: './inventory.css',
  imports: [CommonModule],
})
export class InventoryComponent implements OnInit {

  items: InventoryItem[] = [];

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
  this.loadItems();
}

loadItems(): void {
  this.items = this.inventoryService.getItems();
}
  increaseQuantity(item: InventoryItem): void {
  this.inventoryService.updateQuantity(item.id, 1);
}
decreaseQuantity(item: InventoryItem): void {
  this.inventoryService.updateQuantity(item.id, -1);
}

}