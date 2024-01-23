<template>
  <view>
    <view class="safe-area-bottom" v-if="!isEmpty">
      <view class="list" v-if="loading">
        <Skeleton rows="3" :title="false" />
        <Skeleton customeStyle="margin-top: 20px" rows="3" :title="false" />
        <Skeleton customeStyle="margin-top: 20px" rows="3" :title="false" />
      </view>
      <view class="list" v-else>
        <view class="item" :key="item.name" v-for="item in resData">
          <view class="cell">姓名：{{ item.name }}</view>
          <view class="cell cell-tel">联系电话：{{ item.tel }}</view>
          <div class="cell" style="display: flex">
            <div>预约课程：</div>
            <div>
              <div>{{ item.scheduleInfo?.subject }}</div>
              <div>{{ formatScheduleDate(item.scheduleInfo, true) }}</div>
            </div>
          </div>
          <div class="cell">创建时间：{{ formatTime(item.created_at, 'YYYY-MM-DD HH:mm') }}</div>
        </view>
      </view>
    </view>
    <EmptyStatus @clickOperate="clickOperate" v-else />
  </view>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue';

  import Skeleton from '@/components/Skeleton/index.vue';
  import EmptyStatus from '@/components/EmptyStatus/index.vue';

  import { type ResAppointementRecord, getAppointementRecord } from '@/api/appointementApi';
  import { formatTime, getDateInWeek } from '@/utils/formatTime';

  const isEmpty = ref(false);
  const loading = ref(true);
  const resData = ref<ResAppointementRecord[]>([]);

  function formatScheduleDate(rowData: ResAppointementRecord['scheduleInfo'], wrap = true) {
    const md = formatTime(rowData.start_time, 'MM月DD日');
    const startTime = formatTime(rowData.start_time, 'HH:mm');
    const endTime = formatTime(rowData.end_time, 'HH:mm');
    const week = getDateInWeek(rowData.start_time);
    const content = `${md}\n(${week})\n${startTime}-${endTime}`;
    if (wrap) {
      return content;
    }
    return content.replace(/\n/g, '');
  }

  function fetchData() {
    isEmpty.value = false;
    loading.value = true;
    getAppointementRecord().then((res) => {
      loading.value = false;
      if (res.code === 0) {
        resData.value = res.data;
      }
      if (res.data.length === 0) {
        isEmpty.value = true;
      }
    });
  }

  function clickOperate() {
    fetchData();
  }

  onMounted(() => {
    fetchData();
  });
</script>

<style lang="scss" scoped>
  .list {
    padding: 10px;
    padding-bottom: 20px;

    .nut-skeleton {
      width: 100%;
      margin-bottom: 20px;
    }

    .item {
      padding: 10px;
      border-radius: 6px;
      background-color: #eee;

      &:not(:first-child) {
        margin-top: 10px;
      }

      .cell {
        font-size: 28rpx;

        &:not(:first-child) {
          margin-top: 5px;
        }

        &.cell-tel {
          display: flex;
          align-items: center;

          .btn {
            padding: 0 5px;
            border-radius: 4px;
            margin-left: 5px;
            color: #fff;
            font-size: 12px;
            line-height: 1.6;

            &:active {
              opacity: 0.8;
            }

            &.tel-btn {
              background-color: #27c42d;
            }

            &.copy-btn {
              background-color: #498ff2;
            }
          }
        }
      }
    }
  }
</style>
