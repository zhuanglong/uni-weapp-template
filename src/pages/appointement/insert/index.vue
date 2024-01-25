<template>
  <view class="container">
    <image class="banner" src="@/assets/images/appointement_banner.jpg" mode="scaleToFill" />
    <uni-forms ref="formRef" :rules="validateRules" :modelValue="formData">
      <uni-forms-item label="姓名" required name="name">
        <uni-easyinput v-model="formData.name" placeholder="请输入姓名" />
      </uni-forms-item>
      <uni-forms-item label="联系电话" required name="tel" v-if="eqDate()">
        <uni-easyinput v-model="formData.tel" placeholder="请输入联系电话" />
      </uni-forms-item>
      <uni-forms-item label="预约课程" required name="scheduleId">
        <button class="choice-btn" @click="visiblePopup(true)" v-if="!selectedScheduleInfo">
          选择课程
        </button>
        <view v-else class="selected-schedule" @click="visiblePopup(true)">
          <view>{{ (selectedScheduleInfo.subject || '').replace(/\n/g, '') }}</view>
          <view>{{ formatScheduleDate(selectedScheduleInfo, false) }}</view>
        </view>
      </uni-forms-item>
    </uni-forms>
    <button class="submit-btn" @click="submit">提交</button>
    <uni-popup ref="popupRef" type="bottom">
      <view class="popup-content">
        <view class="header">
          <view class="title">课程安排</view>
          <uni-icons
            class="close-icon"
            type="closeempty"
            size="25"
            color="#969799"
            @click="visiblePopup(false)"
          />
        </view>
        <view class="body">
          <view class="list">
            <view class="list-header">
              <view class="row">
                <view
                  :class="`col ${colItem.headerClassName || ''} align-${colItem.align}`"
                  :style="{ width: colItem.width }"
                  :key="colItem.field"
                  v-for="colItem in tableColumns"
                >
                  {{ colItem.title }}
                </view>
              </view>
            </view>
            <view class="list-body" v-if="tableData.length > 0">
              <view>
                <view class="row" :key="item._id" v-for="item in tableData">
                  <view
                    :class="`col ${colItem.className || ''} align-${colItem.align}`"
                    :style="{ width: colItem.width }"
                    :key="colItem.field"
                    v-for="colItem in tableColumns"
                  >
                    <view v-if="item[colItem.field] === '_slot_'">
                      <uni-icons
                        :type="item._id === formData.scheduleId ? 'circle-filled' : 'circle'"
                        size="20"
                        :color="item._id === formData.scheduleId ? '#007aff' : undefined"
                        @click="
                          () => {
                            formData.scheduleId = item._id;
                            visiblePopup(false);
                          }
                        "
                      />
                    </view>
                    <template v-else>
                      <view>{{ item[colItem.field] }}</view>
                    </template>
                  </view>
                </view>
              </view>
            </view>
            <view class="list-body" v-else>
              <view class="empty">暂无数据</view>
            </view>
          </view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script lang="ts" setup>
  import { ref, unref, onMounted, computed, reactive } from 'vue';
  import UniIcons from '@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue';
  import type { UniFormsInstance, UniFormsRules } from '@uni-helper/uni-ui-types';

  import {
    type ResActivityChapter,
    type ResActivitySchedule,
    getActivitySchedule,
    insertAppointementInfo,
  } from '@/api/appointementApi';
  import { formatTime, getDateInWeek, eqDate } from '@/utils/formatTime';

  interface TableColumnsPropType {
    title: string;
    field: 'radio' | 'subject' | 'datetime' | 'locale';
    className?: string;
    headerClassName?: string;
    width: string;
    align: string;
  }

  const popupRef = ref();
  const formRef = ref<UniFormsInstance>();
  const formData = reactive({
    name: '',
    tel: '',
    scheduleId: '',
  });

  const resData = ref({} as ResActivityChapter);
  const tableColumns = computed(() => {
    const res: TableColumnsPropType[] = [
      {
        title: '选择',
        field: 'radio',
        width: '15%',
        align: 'center',
      },
      {
        title: '课程主题',
        field: 'subject',
        width: '30%',
        align: 'center',
      },
      {
        title: '课程时间',
        field: 'datetime',
        width: '30%',
        align: 'center',
      },
      {
        title: '课程地点',
        field: 'locale',
        width: '25%',
        align: 'center',
      },
    ];
    return res;
  });

  const tableData = computed(() => {
    return (unref(resData).details || []).map((item) => {
      return {
        _id: item._id,
        subject: item.subject,
        datetime: formatScheduleDate(item),
        locale: item.locale,
        radio: '_slot_',
      };
    });
  });

  const selectedScheduleInfo = computed(() => {
    return (unref(resData).details || []).find((item) => item._id === formData.scheduleId);
  });

  const validateRules: UniFormsRules = {
    name: {
      rules: [
        {
          required: true,
          errorMessage: '姓名不能为空',
        },
      ],
    },
    tel: {
      rules: [
        {
          required: true,
          errorMessage: '联系电话不能为空',
        },
        {
          errorMessage: '电话格式不正确',
          validateFunction: (rule, value) => {
            const telReg = /^400(-?)[0-9]{7}$|^1\d{10}$|^0[0-9]{2,3}-[0-9]{7,8}$/;
            return telReg.test(value);
          },
        },
      ],
    },
    scheduleId: {
      rules: [
        {
          required: true,
          errorMessage: '请选择课程',
        },
        {
          errorMessage: '请选择课程',
          validateFunction: (rule, value) => {
            return !!value;
          },
        },
      ],
    },
  };

  function formatScheduleDate(rowData: ResActivitySchedule, wrap = true) {
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

  function visiblePopup(bool: boolean) {
    if (bool) {
      popupRef.value.open();
    } else {
      popupRef.value.close();
    }
  }

  async function submit() {
    try {
      await formRef.value.validate();
      const { scheduleId, name, tel } = formData;
      uni.showLoading({ title: '提交中...', mask: true });
      insertAppointementInfo({ chapterId: unref(resData)._id, scheduleId, name, tel })
        .then((res) => {
          uni.hideLoading();
          if (res.code === 0) {
            uni.showToast({ title: '预约成功', icon: 'success', mask: true });
            setTimeout(() => {
              uni.redirectTo({ url: '/pages/appointement/record/index' });
            }, 1200);
          } else {
            uni.showToast({ title: '预约失败', icon: 'error', mask: true });
          }
        })
        .catch((err) => {
          console.log(err);
          uni.hideLoading();
        });
    } catch (error) {
      //
    }
  }

  function fetchActivityDate() {
    getActivitySchedule().then((res) => {
      if (res.code === 0) {
        resData.value = res.data;
      }
    });
  }

  onMounted(() => {
    fetchActivityDate();
  });
</script>

<style lang="scss" scoped>
  .container {
    padding: 10px;

    .banner {
      width: 100%;
      height: 280rpx;
      margin-bottom: 25px;
      border-radius: 20rpx;
    }

    :deep() {
      .uni-forms-item {
        align-items: center;

        .uni-forms-item__label {
          width: 80px !important;
          font-size: 14px;
          color: #606266;
        }

        .uni-easyinput__placeholder-class {
          font-size: 12px;
          color: #999;
        }

        .uni-input-input {
          font-size: 14px;
          color: rgb(51, 51, 51);
        }
      }
    }

    .choice-btn {
      height: 35px;
      line-height: 35px;
      font-size: 12px;
      color: #999;
    }

    .selected-schedule {
      font-size: 14px;
      color: rgb(51, 51, 51);
    }

    .submit-btn {
      background-color: #007aff;
      color: #fff;

      &::after {
        border: 1px solid rgba(0, 0, 0, 0.2);
      }

      &.button-hover {
        color: rgba(255, 255, 255, 0.6);
        background-color: #0062cc;
      }
    }

    .popup-content {
      overflow-y: auto;
      max-height: 80vh;
      background-color: #fff;
      border-top-right-radius: 20rpx;
      border-top-left-radius: 30rpx;

      .header {
        z-index: 1;
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 80rpx;
        background-color: #fff;
        border-radius: inherit;

        .title {
          color: #000;
          font-size: 32rpx;
          font-weight: bold;
        }

        .close-icon {
          position: absolute;
          right: 20rpx;
        }
      }

      .body {
        padding: 10px;
        padding-top: 80rpx;

        .list {
          white-space: pre-wrap;
          border-radius: 12rpx;
          font-size: 24rpx;

          .list-header {
            background-color: #d19245;

            .row {
              display: flex;
              flex-direction: row;
              border-bottom: 1px solid #000;
              color: #fff;

              .col {
                padding: 20rpx 10rpx;

                &:not(:last-child) {
                  border-right: 1px solid #71706e;
                }
              }
            }
          }

          .list-body {
            position: relative;
            overflow-y: auto;
            max-height: 300rpx;
            background-color: #e5e4e2;

            .row {
              display: flex;
              flex-direction: row;
              color: #666;

              &:not(:first-child) {
                border-top: 1px solid #71706e;
              }

              .col {
                padding: 10rpx;

                &:not(:last-child) {
                  border-right: 1px solid #71706e;
                }
              }
            }

            .empty {
              padding: 40rpx 0;
              text-align: center;
            }
          }

          .list-header,
          .list-body {
            .row {
              .col {
                &.align-left {
                  text-align: left;
                }

                &.align-center {
                  text-align: center;
                }

                &.align-right {
                  text-align: right;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
