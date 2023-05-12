import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoleMarketingComponent } from './pole-marketing.component';

describe('PoleMarketingComponent', () => {
  let component: PoleMarketingComponent;
  let fixture: ComponentFixture<PoleMarketingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoleMarketingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoleMarketingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
