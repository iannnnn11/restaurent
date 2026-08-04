import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { EMPLOYEES } from '../../data/employees';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  companyId = '';
  password = '';

  employees = EMPLOYEES;

  constructor(private router: Router) {}

  login() {
  const employee = this.employees.find(emp =>
  emp.companyId === this.companyId &&
  emp.password === this.password
);

  if (employee) {
    sessionStorage.setItem(
      'loggedInEmployee',
      JSON.stringify(employee)
    );

    alert(`Welcome ${employee.name}`);

    this.router.navigate(['/dashboard']);
  } else {
    alert('Invalid Email or Password');
  }
}}