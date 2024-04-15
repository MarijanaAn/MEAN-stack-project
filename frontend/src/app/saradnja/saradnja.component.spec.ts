import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaradnjaComponent } from './saradnja.component';

describe('SaradnjaComponent', () => {
  let component: SaradnjaComponent;
  let fixture: ComponentFixture<SaradnjaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaradnjaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaradnjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
