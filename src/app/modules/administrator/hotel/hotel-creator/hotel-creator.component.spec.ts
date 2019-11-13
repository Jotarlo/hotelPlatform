import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelCreatorComponent } from './hotel-creator.component';

describe('HotelCreatorComponent', () => {
  let component: HotelCreatorComponent;
  let fixture: ComponentFixture<HotelCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
