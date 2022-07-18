import { TestBed } from '@angular/core/testing';
import { faker } from '@faker-js/faker/locale/de';

import { State } from '@core/models/core';
import { PtComment, PtItem, PtTask, PtUser } from '@core/models/domain';
import { GenderEnum, StatusEnum } from '@core/models/domain/enums';
import { StoreService } from '@core/services';

describe('StoreService', () => {
  let service: StoreService;

  let currentUser: PtUser, backlogItems: PtItem[];

  beforeEach(() => {
    currentUser = {
      id: faker.datatype.number({ min: 1, max: 999999 }),
      fullName: `${faker.name.firstName()} ${faker.name.lastName()}`,
      avatar: faker.word.noun(20),
      gender: GenderEnum.Unspecified,
      dateCreated: faker.date.between('2000-01-01', '2010-01-01'),
      dateModified: faker.date.between('2010-01-02', Date.now())
    };

    backlogItems = [
      {
        description: faker.lorem.words(10),
        type: 'Bug',
        estimate: faker.datatype.number({ min: 1, max: 2 }),
        status: StatusEnum.Open,
        assignee: currentUser,
        tasks: [{ completed: false } as PtTask, { completed: true } as PtTask],
        comments: [{ user: currentUser } as PtComment]
      } as PtItem,
      {
        description: faker.lorem.words(10),
        type: 'Chore',
        estimate: faker.datatype.number({ min: 10, max: 20 }),
        status: StatusEnum.ReOpened,
        assignee: currentUser,
        tasks: [{ completed: true } as PtTask, { completed: true } as PtTask],
        comments: [{ user: currentUser } as PtComment]
      } as PtItem
    ];

    TestBed.configureTestingModule({
      providers: [StoreService]
    });
    service = TestBed.inject(StoreService);
  });

  it(`should add an array of backlog items to the state and select it again`, done => {
    service.set({ backlogItems });

    service
      .select((state: State) => state.backlogItems)
      .subscribe(val => {
        expect(val).toEqual(backlogItems);
        done();
      });
  });

  it(`should add a currentUser to the state and select it again`, done => {
    service.set({ currentUser });

    service
      .select((state: State) => state.currentUser)
      .subscribe(val => {
        expect(val).toEqual(currentUser);
        done();
      });
  });

  describe(`state should`, () => {
    it(`be equal initialState if no state was set`, () => {
      expect(service['state']).toEqual(service.initialState);
    });
  });
});
