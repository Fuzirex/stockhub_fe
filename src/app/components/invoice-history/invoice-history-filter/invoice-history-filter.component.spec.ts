import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceHistoryFilterComponent } from './invoice-history-filter.component';

describe('InvoiceHistoryFilterComponent', () => {
  let component: InvoiceHistoryFilterComponent;
  let fixture: ComponentFixture<InvoiceHistoryFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceHistoryFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceHistoryFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
