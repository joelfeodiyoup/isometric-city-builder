import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideMenuIconComponent } from './side-menu-icon.component';

describe('SideMenuIconComponent', () => {
  let component: SideMenuIconComponent;
  let fixture: ComponentFixture<SideMenuIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideMenuIconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideMenuIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
