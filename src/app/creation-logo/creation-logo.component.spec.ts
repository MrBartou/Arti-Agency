import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationLogoComponent } from './creation-logo.component';

describe('CreationLogoComponent', () => {
  let component: CreationLogoComponent;
  let fixture: ComponentFixture<CreationLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreationLogoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreationLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
