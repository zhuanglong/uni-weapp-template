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
  [`${apiPrefix}/appointement/activity_schedule`]: (timeout: number) => {
    return sleep(timeout).then(() => {
      const chapter_id = 'aa0001';
      return resultSuccess({
        _id: chapter_id,
        name: '自然课招募 | 1月第3周（1月20-21日）周末单次课活动',
        status: 1,
        created_at: '1705311002000',
        updated_at: '1705311002000',
        details: [
          {
            _id: 'bb0001',
            chapter_id,
            subject: '大龄亲子独立\n夜间自然观察',
            locale: '紫马岭公园',
            start_time: '2024-01-19 19:30',
            end_time: '2024-01-19 21:30',
            created_at: '1705311217000',
            updated_at: '1705311217000',
          },
          {
            _id: 'bb0002',
            chapter_id,
            subject: '幼儿段3-6岁/亲子\n自然大发现',
            locale: '五桂山\n秀丽湖',
            start_time: '2024-01-20 09:30',
            end_time: '2024-01-20 12:00',
            created_at: '1705311217000',
            updated_at: '1705311217000',
          },
          {
            _id: 'bb0003',
            chapter_id,
            subject: '独立/亲子\n攀树半日营',
            locale: '五桂山\n原野营地',
            start_time: '2024-01-20 09:00',
            end_time: '2024-01-20 12:00',
            created_at: '1705311217000',
            updated_at: '1705311217000',
          },
          {
            _id: 'bb0004',
            chapter_id,
            subject: '大龄独立/亲子\n森林里的小卫士',
            locale: '五桂山\n狮头山',
            start_time: '2024-01-20 14:30',
            end_time: '2024-01-20 17:30',
            created_at: '1705311217000',
            updated_at: '1705311217000',
          },
          {
            _id: 'bb0005',
            chapter_id,
            subject: '独立/亲子\n植物演化记',
            locale: '五桂山\n原野营地',
            start_time: '2024-01-21 09:00',
            end_time: '2024-01-21 12:00',
            created_at: '1705311217000',
            updated_at: '1705311217000',
          },
          {
            _id: 'bb0006',
            chapter_id,
            subject: '独立/亲子\n古道寻踪',
            locale: '五桂山\n岐澳古道',
            start_time: '2024-01-21 14:00',
            end_time: '2024-01-21 17:30',
            created_at: '1705311217000',
            updated_at: '1705311217000',
          },
          {
            _id: 'bb0007',
            chapter_id,
            subject: '大龄独立/亲子\n森林里的\n白天与黑夜',
            locale: '五桂山\n旗溪',
            start_time: '2024-01-21 15:00',
            end_time: '2024-01-21 19:00',
            created_at: '1705311217000',
            updated_at: '1705311217000',
          },
        ],
      });
    });
  },
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
              created_at: '1705311217000',
              updated_at: '1705311217000',
              scheduleInfo: {
                subject: '大龄亲子独立\n夜间自然观察',
                start_time: '2024-01-19 19:30',
                end_time: '2024-01-19 21:30',
                created_at: '1705311217000',
                updated_at: '1705311217000',
              },
            },
          ],
        }).data,
      );
    });
  },
} as Record<string, any>;
