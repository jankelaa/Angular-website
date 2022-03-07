import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NekretnineComponent } from './nekretnine.component';

describe('NekretnineComponent', () => {
  let component: NekretnineComponent;
  let fixture: ComponentFixture<NekretnineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NekretnineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NekretnineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
