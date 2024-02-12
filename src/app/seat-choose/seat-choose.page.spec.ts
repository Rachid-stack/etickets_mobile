import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeatChoosePage } from './seat-choose.page';

describe('SeatChoosePage', () => {
  let component: SeatChoosePage;
  let fixture: ComponentFixture<SeatChoosePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SeatChoosePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
