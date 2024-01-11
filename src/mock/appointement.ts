// const Mock =
//   process.env.TARO_ENV === 'h5' ? require('better-mock') : require('better-mock/dist/mock.mp.js');
// const Mock = require('better-mock');
import Mock from 'better-mock/dist/mock.mp.js';

import { resultSuccess } from './_util';
import { sleep } from '@/utils';

export default {
  '/dev-api/appointement/insert': (timeout: number) => {
    return sleep(timeout).then(() => {
      return resultSuccess(null);
    });
  },
  '/dev-api/appointement/list': (timeout: number) => {
    return sleep(timeout).then(() => {
      return resultSuccess(
        Mock.mock({
          'data|6-26': [
            {
              id: '@id',
              name: /[a-z][A-Z][0-9]/,
              tel: '@email',
            },
          ],
        }).data,
      );
    });
  },
} as Record<string, any>;
