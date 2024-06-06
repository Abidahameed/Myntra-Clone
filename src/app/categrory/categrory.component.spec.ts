import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategroryComponent } from './categrory.component';

describe('CategroryComponent', () => {
  let component: CategroryComponent;
  let fixture: ComponentFixture<CategroryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategroryComponent]
    });
    fixture = TestBed.createComponent(CategroryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
