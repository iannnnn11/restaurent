import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Famousdish } from './famousdish';

describe('Famousdish', () => {
  let component: Famousdish;
  let fixture: ComponentFixture<Famousdish>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Famousdish],
    }).compileComponents();

    fixture = TestBed.createComponent(Famousdish);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
