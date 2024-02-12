import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TiersFormPage } from './tiers-form.page';

describe('TiersFormPage', () => {
  let component: TiersFormPage;
  let fixture: ComponentFixture<TiersFormPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TiersFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
