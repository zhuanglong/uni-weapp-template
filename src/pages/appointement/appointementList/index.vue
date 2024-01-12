<template>
  <view>
    <view class="safe-area-bottom" v-if="!isEmpty">
      <view class="list" v-if="loading">
        <view>loading</view>
      </view>
      <view class="list" v-else>
        <view class="item" :key="item.name" v-for="item in resData">
          <view class="cell">姓名：{{ item.name }}</view>
          <view class="cell cell-tel">联系电话：{{ item.tel }}</view>
        </view>
      </view>
    </view>
    <EmptyStatus @clickOperate="clickOperate" v-else />
  </view>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue';

  import EmptyStatus from '@/components/EmptyStatus';

  import { type ResAppointementRecord, getAppointementRecord } from '@/api/appointementApi';

  const isEmpty = ref(false);
  const loading = ref(true);
  const resData = ref<ResAppointementRecord[]>([]);

  const fetchData = () => {
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
  };

  const clickOperate = () => {
    fetchData();
  };

  onMounted(() => {
    fetchData();
  });
</script>

<style lang="scss">
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
