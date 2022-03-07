import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IzmenaNekretnineComponent } from './izmena-nekretnine.component';

describe('IzmenaNekretnineComponent', () => {
  let component: IzmenaNekretnineComponent;
  let fixture: ComponentFixture<IzmenaNekretnineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IzmenaNekretnineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IzmenaNekretnineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
