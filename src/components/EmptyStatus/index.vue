<template>
  <view class="EmptyStatus--root">
    <image class="img" :style="{ marginTop: marginTop }" :src="imgSrc" />
    <view class="main-text">{{ mainText }}</view>
    <view class="second-text">
      {{ secondText }}<view class="refresh" @click="emit('clickOperate')">{{ operateText }}</view>
    </view>
  </view>
</template>

<script lang="ts" setup>
  import { PropType } from 'vue';

  import emptyStatusIMG from '@/assets/icons/empty-status.svg';

  defineProps({
    imgSrc: {
      type: String as PropType<string>,
      default: emptyStatusIMG,
    },
    mainText: {
      type: String as PropType<string>,
      default: '暂无内容',
    },
    secondText: {
      type: String as PropType<string>,
      default: '暂未搜索到相关内容，',
    },
    operateText: {
      type: String as PropType<string>,
      default: '点击重试',
    },
    marginTop: {
      type: String as PropType<string>,
      default: '300rpx',
    },
  });

  const emit = defineEmits(['clickOperate']);
</script>

<style lang="scss" scoped>
  .EmptyStatus--root {
    display: flex;
    flex-direction: column;
    align-items: center;

    .img {
      width: 150px;
      height: 150px;
    }

    .main-text {
      margin-top: 10px;
      color: #000;
      font-size: 16px;
      font-weight: bold;
    }

    .second-text {
      display: flex;
      flex-direction: row;
      justify-content: center;
      margin-top: 10px;
      color: #687383;
      font-size: 14px;

      .refresh {
        color: #4d64de;
      }
    }
  }
</style>
