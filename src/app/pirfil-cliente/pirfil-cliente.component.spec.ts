import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PirfilClienteComponent } from './pirfil-cliente.component';

describe('PirfilClienteComponent', () => {
  let component: PirfilClienteComponent;
  let fixture: ComponentFixture<PirfilClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PirfilClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PirfilClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
