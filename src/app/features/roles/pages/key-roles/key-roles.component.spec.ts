import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyRolesComponent } from './key-roles.component';

describe('KeyRolesComponent', () => {
  let component: KeyRolesComponent;
  let fixture: ComponentFixture<KeyRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeyRolesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeyRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
