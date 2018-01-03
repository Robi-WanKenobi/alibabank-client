import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InisioComponent } from './inisio.component';

describe('InisioComponent', () => {
  let component: InisioComponent;
  let fixture: ComponentFixture<InisioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InisioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InisioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
