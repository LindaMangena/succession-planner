import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerNotesComponent } from './manager-notes.component';

describe('ManagerNotesComponent', () => {
  let component: ManagerNotesComponent;
  let fixture: ComponentFixture<ManagerNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerNotesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
