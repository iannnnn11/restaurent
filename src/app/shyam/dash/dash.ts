import { Component } from '@angular/core';
import { RouterModule } from "@angular/router";
import {
  RouterLink,
  RouterLinkActive,
  RouterOutlet ,
  
} from '@angular/router';
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-dash',
  imports: [
  CommonModule,
  RouterLink,
  RouterLinkActive,
  RouterOutlet
],
  templateUrl: './dash.html',
  styleUrl: './dash.css',
})
export class Dash {
  isCollapsed = false;

toggleSidebar() {
  this.isCollapsed = !this.isCollapsed;
}
}
