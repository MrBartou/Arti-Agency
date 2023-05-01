import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationMaquetteComponent } from './creation-maquette.component';

describe('CreationMaquetteComponent', () => {
  let component: CreationMaquetteComponent;
  let fixture: ComponentFixture<CreationMaquetteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreationMaquetteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreationMaquetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
