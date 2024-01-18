<template>
  <view class="skeleton">
    <view class="skeleton__wrapper" v-if="props.loading">
      <view
        class="skeleton__wrapper__avatar"
        v-if="avatar"
        :class="[`skeleton__wrapper__avatar--${props.avatarShape}`, props.animate && 'animate']"
        :style="{
          height: addUnit(props.avatarSize),
          width: addUnit(props.avatarSize),
        }"
      />
      <view class="skeleton__wrapper__content" ref="uSkeletonWrapperContentRef" style="flex: 1">
        <view
          class="skeleton__wrapper__content__title"
          v-if="props.title"
          :style="{
            width: uTitleWidth,
            height: addUnit(props.titleHeight),
          }"
          :class="[props.animate && 'animate']"
        />
        <view
          class="skeleton__wrapper__content__rows"
          :class="[props.animate && 'animate']"
          v-for="(item, index) in rowsArray"
          :key="index"
          :style="{
            width: item.width,
            height: item.height,
            marginTop: item.marginTop,
          }"
        />
      </view>
    </view>
    <slot v-else></slot>
  </view>
</template>

<script lang="ts" setup>
  import { type PropType, type CSSProperties, watch, computed, ref, unref, onMounted } from 'vue';

  const props = defineProps({
    // 是否展示骨架组件
    loading: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
    // 是否开启动画效果
    animate: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
    // 段落占位图行数
    rows: {
      type: [String, Number] as PropType<string | number>,
      default: 0,
    },
    // 段落占位图的宽度
    rowsWidth: {
      type: [String, Number, Array] as PropType<string | number | []>,
      default: '100%',
    },
    // 段落占位图的高度
    rowsHeight: {
      type: [String, Number, Array] as PropType<string | number | []>,
      default: 18,
    },
    // 是否展示标题占位图
    title: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
    // 段落标题的宽度
    titleWidth: {
      type: [String, Number] as PropType<string | number>,
      default: '50%',
    },
    // 段落标题的高度
    titleHeight: {
      type: [String, Number] as PropType<string | number>,
      default: 18,
    },
    // 是否展示头像占位图
    avatar: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    // 头像占位图大小
    avatarSize: {
      type: [String, Number] as PropType<string | number>,
      default: 32,
    },
    // 头像占位图的形状
    avatarShape: {
      type: String as PropType<'circle' | 'square'>,
      default: 'circle',
    },
  });

  const width = ref(0);
  const uSkeletonWrapperContentRef = ref();

  const rowsArray = computed(() => {
    const { title, rows, rowsWidth, rowsHeight } = props;

    if (typeof rowsHeight === 'string' && /%$/.test(rowsHeight)) {
      console.error('rowsHeight参数不支持百分比单位');
    }

    const resRows = [];
    for (let i = 0; i < Number(rows); i++) {
      const len = Number(rows) - 1;
      const item: CSSProperties = {};

      // 需要预防超出数组边界的情况
      const rowWidth = Array.isArray(rowsWidth)
        ? rowsWidth[i] || (i === len ? '70%' : '100%')
        : i === len
        ? '70%'
        : rowsWidth;
      const rowHeight = Array.isArray(rowsHeight) ? rowsHeight[i] || '18px' : rowsHeight;

      // 如果有title占位图，第一个段落占位图的外边距需要大一些，如果没有title占位图，第一个段落占位图则无需外边距
      // 之所以需要这么做，是因为weex的无能，以提升性能为借口不支持css的一些伪类
      item.marginTop = !title && i === 0 ? 0 : title && i === 0 ? '20px' : '12px';

      // 如果设置的为百分比的宽度，转换为px值，因为nvue不支持百分比单位
      if (typeof rowWidth === 'string' && /%$/.test(rowWidth)) {
        // 通过parseInt提取出百分比单位中的数值部分，除以100得到百分比的小数值
        item.width = addUnit((unref(width) * parseInt(rowWidth)) / 100);
      } else {
        item.width = addUnit(rowWidth);
      }
      item.height = addUnit(rowHeight);
      resRows.push(item);
    }

    return resRows;
  });

  const uTitleWidth = computed(() => {
    const { titleWidth } = props;
    let tWidth = 0;
    if (typeof titleWidth === 'string' && /%$/.test(titleWidth)) {
      // 通过parseInt提取出百分比单位中的数值部分，除以100得到百分比的小数值
      tWidth = addUnit((unref(width) * parseInt(titleWidth)) / 100);
    } else {
      tWidth = addUnit(titleWidth);
    }
    return addUnit(tWidth);
  });

  function addUnit(value: any, unit = 'px') {
    value = String(value);
    return /^[\+-]?(\d+\.?\d*|\.\d+|\d\.\d+e\+\d+)$/.test(value) ? `${value}${unit}` : value;
  }

  function getComponentWidth() {
    setTimeout(() => {
      width.value = uSkeletonWrapperContentRef.value?.$el?.offsetWidth || 0;
    }, 20);
  }

  watch(
    () => props.loading,
    () => {
      getComponentWidth();
    },
  );

  onMounted(() => {
    getComponentWidth();
  });
</script>

<style lang="scss" scoped>
  @mixin background {
    background: linear-gradient(90deg, #f1f2f4 25%, #e6e6e6 37%, #f1f2f4 50%);
    background-size: 400% 100%;
  }

  .skeleton {
    &__wrapper {
      display: flex;
      flex-direction: row;

      &__avatar {
        @include background;
        margin-right: 15px;

        &--circle {
          border-radius: 100px;
        }

        &--square {
          border-radius: 4px;
        }
      }

      &__content {
        flex: 1;

        &__rows,
        &__title {
          @include background;
          border-radius: 3px;
        }
      }
    }
  }

  .animate {
    animation: skeleton 1.8s ease infinite;
  }

  @keyframes skeleton {
    0% {
      background-position: 100% 50%;
    }

    100% {
      background-position: 0 50%;
    }
  }
</style>
