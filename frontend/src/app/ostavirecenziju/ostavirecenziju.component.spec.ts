import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OstavirecenzijuComponent } from './ostavirecenziju.component';

describe('OstavirecenzijuComponent', () => {
  let component: OstavirecenzijuComponent;
  let fixture: ComponentFixture<OstavirecenzijuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OstavirecenzijuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OstavirecenzijuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
