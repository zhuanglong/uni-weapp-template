import { httpClient, ApiResult } from '@/utils/request';
// import { getAppInfo, useMock } from '@/utils/config';
import appointementMock from '@/mock/appointement';

// const { apiPrefix } = getAppInfo();
const apiPrefix = '/dev-api';

export interface ResActivitySchedule {
  _id: string;
  subject: string;
  locale: string;
  start_time: string;
  end_time: string;
}
export interface ReqInsertAppointementInfo {
  name: string;
  tel: string;
  chapterId: string;
  scheduleId: string;
}
export function insertAppointementInfo(params: ReqInsertAppointementInfo) {
  if (true) {
    return appointementMock[`${apiPrefix}/appointement/insert`]() as Promise<ApiResult>;
  }
  return httpClient.post<ApiResult>({
    url: `${apiPrefix}/appointement/insert`,
    data: params,
  });
}

export interface ResAppointementRecord {
  _id: string;
  name: string;
  tel: string;
}
export function getAppointementRecord() {
  if (true) {
    return appointementMock[`${apiPrefix}/appointement/list`]() as Promise<
      ApiResult<ResAppointementRecord[]>
    >;
  }
  return httpClient.post<ApiResult<ResAppointementRecord[]>>({
    url: `${apiPrefix}/appointement/list`,
  });
}
