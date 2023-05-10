import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoleDevWebComponent } from './pole-dev-web.component';

describe('PoleDevWebComponent', () => {
  let component: PoleDevWebComponent;
  let fixture: ComponentFixture<PoleDevWebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoleDevWebComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoleDevWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
