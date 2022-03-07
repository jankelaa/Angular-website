import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrafikoniComponent } from './grafikoni.component';

describe('GrafikoniComponent', () => {
  let component: GrafikoniComponent;
  let fixture: ComponentFixture<GrafikoniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrafikoniComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrafikoniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
