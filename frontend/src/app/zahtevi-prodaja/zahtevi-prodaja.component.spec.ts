import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZahteviProdajaComponent } from './zahtevi-prodaja.component';

describe('ZahteviProdajaComponent', () => {
  let component: ZahteviProdajaComponent;
  let fixture: ComponentFixture<ZahteviProdajaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZahteviProdajaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZahteviProdajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
