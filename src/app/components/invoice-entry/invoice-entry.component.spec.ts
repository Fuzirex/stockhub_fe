import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceEntryComponent } from './invoice-entry.component';

describe('InvoiceEntryComponent', () => {
  let component: InvoiceEntryComponent;
  let fixture: ComponentFixture<InvoiceEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
