import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PtListItemComponent } from '@features/backlog/components';

describe('PtListItemComponent', () => {
  let component: PtListItemComponent;
  let fixture: ComponentFixture<PtListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PtListItemComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PtListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
