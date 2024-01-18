import { httpClient, ApiResult } from '@/utils/request';
import { getAppInfo, useMock } from '@/utils/config';
import appointementMock from '@/mock/appointement';

const { apiPrefix } = getAppInfo();

export interface ResActivityChapter {
  _id: string;
  name: string;
  status: number;
  created_at: number;
  updated_at: number;
  details: ResActivitySchedule[];
}
export interface ResActivitySchedule {
  _id: string;
  chapter_id: string;
  subject: string;
  locale: string;
  start_time: string;
  end_time: string;
  created_at: number;
  updated_at: number;
}
export function getActivitySchedule() {
  const url = `${apiPrefix}/appointement/activity_schedule`;
  if (useMock()) {
    return appointementMock[url]() as Promise<ApiResult<ResActivityChapter>>;
  }
  return httpClient.post<ApiResult<ResActivityChapter>>({ url });
}

export interface ReqInsertAppointementInfo {
  name: string;
  tel: string;
  chapterId: string;
  scheduleId: string;
}
export function insertAppointementInfo(params: ReqInsertAppointementInfo) {
  const url = `${apiPrefix}/appointement/insert`;
  if (useMock()) {
    return appointementMock[url]() as Promise<ApiResult>;
  }
  return httpClient.post<ApiResult>({ url, data: params });
}

export interface ResAppointementRecord {
  _id: string;
  name: string;
  tel: string;
  created_at: string;
  updated_at: string;
  scheduleInfo: {
    subject: string;
    start_time: string;
    end_time: string;
    created_at: string;
    updated_at: string;
  };
}
export function getAppointementRecord() {
  const url = `${apiPrefix}/appointement/list`;
  if (useMock()) {
    return appointementMock[url]() as Promise<ApiResult<ResAppointementRecord[]>>;
  }
  return httpClient.post<ApiResult<ResAppointementRecord[]>>({ url });
}
