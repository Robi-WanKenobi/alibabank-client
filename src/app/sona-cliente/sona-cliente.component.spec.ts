import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SonaClienteComponent } from './sona-cliente.component';

describe('SonaClienteComponent', () => {
  let component: SonaClienteComponent;
  let fixture: ComponentFixture<SonaClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SonaClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SonaClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
