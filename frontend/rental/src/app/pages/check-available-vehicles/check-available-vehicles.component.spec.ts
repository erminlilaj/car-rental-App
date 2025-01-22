import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckAvailableVehiclesComponent } from './check-available-vehicles.component';

describe('CheckAvailableVehiclesComponent', () => {
  let component: CheckAvailableVehiclesComponent;
  let fixture: ComponentFixture<CheckAvailableVehiclesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckAvailableVehiclesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CheckAvailableVehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
