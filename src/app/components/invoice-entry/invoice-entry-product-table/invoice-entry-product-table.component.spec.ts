import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceEntryProductTableComponent } from './invoice-entry-product-table.component';

describe('InvoiceEntryProductTableComponent', () => {
  let component: InvoiceEntryProductTableComponent;
  let fixture: ComponentFixture<InvoiceEntryProductTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceEntryProductTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceEntryProductTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
