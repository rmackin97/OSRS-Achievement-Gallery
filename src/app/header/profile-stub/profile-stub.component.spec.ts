import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileStubComponent } from './profile-stub.component';

describe('ProfileStubComponent', () => {
  let component: ProfileStubComponent;
  let fixture: ComponentFixture<ProfileStubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileStubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileStubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
