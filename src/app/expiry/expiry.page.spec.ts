import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpiryPage } from './expiry.page';

describe('ExpiryPage', () => {
  let component: ExpiryPage;
  let fixture: ComponentFixture<ExpiryPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ExpiryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
