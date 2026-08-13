import { Component } from '@angular/core';
import { RouterModule } from "@angular/router";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dash',
  imports: [RouterModule,RouterLink],
  templateUrl: './dash.html',
  styleUrl: './dash.css',
})
export class Dash {}
