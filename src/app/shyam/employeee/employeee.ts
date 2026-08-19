import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Employee } from '../../models/employee';
import { EMPLOYEES } from '../../data/employees';

@Component({
  selector: 'app-employeee',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './employeee.html',
  styleUrl: './employeee.css'
})
export class Employeee {

  // =========================
  // ALL EMPLOYEES
  // =========================

  employees: Employee[] = EMPLOYEES;


  // =========================
  // FILTERED EMPLOYEES
  // =========================

  filteredEmployees: Employee[] = [...this.employees];


  // =========================
  // FILTER VALUES
  // =========================

  searchText: string = '';

  selectedDepartment: string = 'All';

  selectedStatus: string = 'All';


  // =========================
  // DEPARTMENTS
  // =========================

  get departments(): string[] {

    return [
      ...new Set(
        this.employees.map(employee => employee.department)
      )
    ];

  }


  // =========================
  // ACTIVE EMPLOYEES
  // =========================

  get activeEmployees(): number {

    return this.employees.filter(
      employee => employee.status === 'Active'
    ).length;

  }


  // =========================
  // DEPARTMENT COUNT
  // =========================

  get departmentsCount(): number {

    return new Set(
      this.employees.map(employee => employee.department)
    ).size;

  }


  // =========================
  // BRANCH COUNT
  // =========================

  get branchesCount(): number {

    return new Set(
      this.employees.map(employee => employee.branch)
    ).size;

  }


  // =========================
  // APPLY FILTERS
  // =========================

  applyFilters(): void {

    const search = this.searchText
      .trim()
      .toLowerCase();


    this.filteredEmployees = this.employees.filter(
      employee => {

        // Search
        const matchesSearch =
          !search ||
          employee.name.toLowerCase().includes(search) ||
          employee.companyId.toLowerCase().includes(search) ||
          employee.department.toLowerCase().includes(search) ||
          employee.role.toLowerCase().includes(search) ||
          employee.branch.toLowerCase().includes(search);


        // Department
        const matchesDepartment =
          this.selectedDepartment === 'All' ||
          employee.department === this.selectedDepartment;


        // Status
        const matchesStatus =
          this.selectedStatus === 'All' ||
          employee.status === this.selectedStatus;


        return (
          matchesSearch &&
          matchesDepartment &&
          matchesStatus
        );

      }
    );

  }

}