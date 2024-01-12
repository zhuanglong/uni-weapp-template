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
  [`${apiPrefix}/test/random`]: (timeout: number) => {
    return sleep(timeout).then(() => resultSuccess(Mock.Random.color()));
  },
} as Record<string, any>;
