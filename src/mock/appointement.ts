// @ts-ignore
// #ifdef H5
import Mock from 'better-mock';
// #endif
// @ts-ignore
// #ifndef H5
import Mock from 'better-mock/dist/mock.mp.js';
// #endif

import { sleep } from '@/utils';
import { getAppInfo } from '@/utils/config';
import { resultSuccess } from './_util';

const { apiPrefix } = getAppInfo();

export default {
  [`${apiPrefix}/appointement/insert`]: (timeout: number) => {
    return sleep(timeout).then(() => {
      return resultSuccess(null);
    });
  },
  [`${apiPrefix}/appointement/list`]: (timeout: number) => {
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
