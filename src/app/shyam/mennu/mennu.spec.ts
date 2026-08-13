import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mennu } from './mennu';

describe('Mennu', () => {
  let component: Mennu;
  let fixture: ComponentFixture<Mennu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Mennu],
    }).compileComponents();

    fixture = TestBed.createComponent(Mennu);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
