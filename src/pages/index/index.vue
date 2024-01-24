<template>
  <div class="container">
    <uni-swiper-dot
      class="uni-swiper-dot-box"
      mode="round"
      field="content"
      :info="bannerArr"
      :dots-styles="{
        backgroundColor: 'rgba(0, 0, 0, .3)',
        border: '1px rgba(0, 0, 0, .3) solid',
        color: '#fff',
        selectedBackgroundColor: 'rgba(0, 0, 0, .9)',
        selectedBorder: '1px rgba(0, 0, 0, .9) solid',
      }"
      :current="currentSwiperItem"
      @clickItem="clickDotItem"
    >
      <swiper class="swiper-box" @change="changeSwiperItem" :current="currentSwiperItem">
        <swiper-item v-for="(item, index) in bannerArr" :key="index">
          <image class="swiper-item" :src="item" mode="aspectFill" />
        </swiper-item>
      </swiper>
    </uni-swiper-dot>
    <div class="btn-wrapper">
      <div class="btn btn-1" @click="goAppointementPage">
        <div class="text">
          我要预约 <image class="icon" src="@/assets/images/item_more.png" />
        </div>
      </div>
      <div class="btn btn-2" @click="goAppointementListPage">
        <div class="text">
          预约记录 <image class="icon" src="@/assets/images/item_more.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';

  import home_banner_1 from '@/assets/images/home_banner_1.jpg';
  import home_banner_2 from '@/assets/images/home_banner_2.jpg';
  import home_banner_3 from '@/assets/images/home_banner_3.jpg';
  import home_banner_4 from '@/assets/images/home_banner_4.jpg';

  const currentSwiperItem = ref(0);
  const bannerArr = [home_banner_1, home_banner_2, home_banner_3, home_banner_4];

  function goAppointementPage() {
    uni.navigateTo({ url: '/pages/appointement/insert/index' });
  }

  function goAppointementListPage() {
    uni.navigateTo({ url: '/pages/appointement/record/index' });
  }

  function clickDotItem(index: number) {
    currentSwiperItem.value = index;
  }

  function changeSwiperItem(e: any) {
    //
    currentSwiperItem.value = e.detail.current;
  }
</script>

<style lang="scss" scoped>
  .container {
    padding: 10px;

    :deep() {
      .uni-swiper__warp {
        border-radius: 20rpx;
      }
    }

    .swiper-box {
      height: 300rpx;

      .swiper-item {
        width: 100%;
        height: 300rpx;
      }
    }

    .btn-wrapper {
      display: flex;
      padding: 10px 0;

      .btn {
        width: 50%;
        padding: 20rpx;
        border-radius: 16rpx;
        background-repeat: no-repeat;
        background-size: cover;

        &.btn-1 {
          background-image: url('@/assets/images/x1.png');
        }

        &.btn-2 {
          margin-left: 10px;
          background-image: url('@/assets/images/x2.png');
        }

        .text {
          display: flex;
          align-items: center;
          color: #fff;
          font-size: 36rpx;
          font-weight: bold;

          .icon {
            width: 30rpx;
            height: 30rpx;
            margin-left: 5px;
          }
        }
      }
    }
  }
</style>
