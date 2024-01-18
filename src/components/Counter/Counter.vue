<template>
  <view class="Counter--root">
    <view class="title">Pinia Count: {{ evenOrOdd }}</view>
    <view>
      <button @click="decrement()">-</button>
      <view class="count-text">{{ count }}</view>
      <button @click="increment()">+</button>
      <view style="margin-top: 20rpx" />
      <button @click="incrementAsync()">async +</button>
    </view>
  </view>
</template>

<script lang="ts">
  import { computed, defineComponent, reactive, toRefs } from 'vue';

  import { useCounter } from '@/stores';

  export default defineComponent({
    setup() {
      const counter = useCounter();

      const state = reactive({
        count: computed(() => counter.count),
        evenOrOdd: computed(() => counter.evenOrOdd),
      });

      function decrement() {
        counter.decrement();
      }

      function increment() {
        counter.increment();
      }

      function incrementAsync() {
        counter.incrementAsync();
      }

      return {
        ...toRefs(state),
        decrement,
        increment,
        incrementAsync,
      };
    },
  });
</script>

<style lang="scss" scoped>
  .Counter--root {
    padding: 0 20rpx;

    .title {
      padding: 20rpx 0;
      font-size: 40rpx;
      text-align: center;
    }

    .count-text {
      margin: 10rpx 0;
      color: blue;
      font-size: 36rpx;
      text-align: center;
    }
  }
</style>
