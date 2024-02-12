import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmPaiementPage } from './confirm-paiement.page';

describe('ConfirmPaiementPage', () => {
  let component: ConfirmPaiementPage;
  let fixture: ComponentFixture<ConfirmPaiementPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ConfirmPaiementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
