import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BilleteraCardComponent } from './billetera-card.component';

describe('BilleteraCardComponent', () => {
  let component: BilleteraCardComponent;
  let fixture: ComponentFixture<BilleteraCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BilleteraCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BilleteraCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
