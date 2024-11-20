import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceHistoryTableComponent } from './invoice-history-table.component';

describe('InvoiceHistoryTableComponent', () => {
  let component: InvoiceHistoryTableComponent;
  let fixture: ComponentFixture<InvoiceHistoryTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceHistoryTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceHistoryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
