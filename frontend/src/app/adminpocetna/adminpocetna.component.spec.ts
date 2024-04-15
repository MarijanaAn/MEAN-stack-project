import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminpocetnaComponent } from './adminpocetna.component';

describe('AdminpocetnaComponent', () => {
  let component: AdminpocetnaComponent;
  let fixture: ComponentFixture<AdminpocetnaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminpocetnaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminpocetnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
