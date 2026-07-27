import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Booktable } from './booktable';

describe('Booktable', () => {
  let component: Booktable;
  let fixture: ComponentFixture<Booktable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Booktable],
    }).compileComponents();

    fixture = TestBed.createComponent(Booktable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
