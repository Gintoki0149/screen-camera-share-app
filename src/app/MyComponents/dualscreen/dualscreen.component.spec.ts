import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DualscreenComponent } from './dualscreen.component';

describe('DualscreenComponent', () => {
  let component: DualscreenComponent;
  let fixture: ComponentFixture<DualscreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DualscreenComponent]
    });
    fixture = TestBed.createComponent(DualscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
