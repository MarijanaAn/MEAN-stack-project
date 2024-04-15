import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencijekComponent } from './agencijek.component';

describe('AgencijekComponent', () => {
  let component: AgencijekComponent;
  let fixture: ComponentFixture<AgencijekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgencijekComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgencijekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
