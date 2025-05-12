import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSuccessionPlanComponent } from './add-succession-plan.component';

describe('AddSuccessionPlanComponent', () => {
  let component: AddSuccessionPlanComponent;
  let fixture: ComponentFixture<AddSuccessionPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSuccessionPlanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSuccessionPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
