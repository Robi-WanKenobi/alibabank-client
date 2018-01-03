import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeCoinsComponent } from './change-coins.component';

describe('ChangeCoinsComponent', () => {
  let component: ChangeCoinsComponent;
  let fixture: ComponentFixture<ChangeCoinsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeCoinsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeCoinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
