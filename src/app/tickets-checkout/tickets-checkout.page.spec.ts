import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TicketsCheckoutPage } from './tickets-checkout.page';

describe('TicketsCheckoutPage', () => {
  let component: TicketsCheckoutPage;
  let fixture: ComponentFixture<TicketsCheckoutPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TicketsCheckoutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
