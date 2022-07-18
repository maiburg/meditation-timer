import { Utils } from '@app/utils';

describe('Utils', () => {
  describe('formateDate() should', () => {
    it('return iso date format as Date format', () => {
      expect(Utils.formateDate('2002-06-22T21:13:43.149Z').toString()).toEqual(
        'Sat Jun 22 2002 23:13:43 GMT+0200 (CEST)'
      );
    });
  });
});
