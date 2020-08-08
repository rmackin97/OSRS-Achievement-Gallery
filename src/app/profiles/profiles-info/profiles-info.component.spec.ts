import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilesInfoComponent } from './profiles-info.component';

describe('ProfilesInfoComponent', () => {
  let component: ProfilesInfoComponent;
  let fixture: ComponentFixture<ProfilesInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilesInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilesInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
