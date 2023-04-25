import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoleDevMobileComponent } from './pole-dev-mobile.component';

describe('PoleDevMobileComponent', () => {
  let component: PoleDevMobileComponent;
  let fixture: ComponentFixture<PoleDevMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoleDevMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoleDevMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
