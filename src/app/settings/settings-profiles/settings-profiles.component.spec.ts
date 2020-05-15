import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsProfilesComponent } from './settings-profiles.component';

describe('SettingsProfilesComponent', () => {
  let component: SettingsProfilesComponent;
  let fixture: ComponentFixture<SettingsProfilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsProfilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
