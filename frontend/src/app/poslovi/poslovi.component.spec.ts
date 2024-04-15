import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosloviComponent } from './poslovi.component';

describe('PosloviComponent', () => {
  let component: PosloviComponent;
  let fixture: ComponentFixture<PosloviComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PosloviComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PosloviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
