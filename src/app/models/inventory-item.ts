export interface InventoryItem {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  quantity: number;
  unit: string;
  minStock: number;
  lastRestock: string;
}