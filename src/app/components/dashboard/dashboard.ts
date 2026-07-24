import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Navbar } from "../navbar/navbar";
import { Hero } from "../hero/hero";
import { Famousdish } from "../famousdish/famousdish";


@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, Navbar, Hero, Famousdish],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {}
