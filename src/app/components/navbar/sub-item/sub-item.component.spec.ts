/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SubItemComponent } from './sub-item.component';

describe('SubItemComponent', () => {
  let component: SubItemComponent;
  let fixture: ComponentFixture<SubItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SubItemComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
