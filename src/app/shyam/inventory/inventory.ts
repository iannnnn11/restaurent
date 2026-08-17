import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../services/inventory';
import { InventoryItem } from '../../models/inventory-item';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.html',
  styleUrl: './inventory.css'
})
export class InventoryComponent implements OnInit {

  items: InventoryItem[] = [];

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.items = this.inventoryService.getItems();
  }

}