import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkicaComponent } from './skica.component';

describe('SkicaComponent', () => {
  let component: SkicaComponent;
  let fixture: ComponentFixture<SkicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkicaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
