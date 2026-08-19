import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Employeee } from './employeee';

describe('Employeee', () => {
  let component: Employeee;
  let fixture: ComponentFixture<Employeee>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Employeee],
    }).compileComponents();

    fixture = TestBed.createComponent(Employeee);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
