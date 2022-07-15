import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemEventData, Observable } from '@nativescript/core';
import { faker } from '@faker-js/faker/locale/de';

import { PtItem } from '@core/models/domain';
import { PtListComponent } from '@features/backlog/components';

describe('PtListComponent', () => {
  let component: PtListComponent;
  let fixture: ComponentFixture<PtListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PtListComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PtListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('listItemTap() should', () => {
    it('call listItemSelected.emit()', () => {
      const spy = spyOn(component.listItemSelected, 'emit');
      const item = { description: faker.lorem.words(10) } as PtItem;
      const object = new Observable();
      object.setProperty('items', [item]);
      const itemEventData = { index: 0, object } as ItemEventData;

      component.listItemTap(itemEventData);

      expect(spy).toHaveBeenCalledWith(item);
    });
  });
});
