export interface ApiResult<T = any> {
  code: number;
  data: T;
  message: string;
}

interface RequestConfig extends UniNamespace.RequestOptions {
  requestOptions?: {
    enableLoading: boolean;
  };
}

class Request {
  // 存放取消请求控制器 Map
  private abortControllerMap: Map<string, UniNamespace.RequestTask>;
  private defaultRequestConfig: RequestConfig;

  constructor(config: RequestConfig) {
    this.defaultRequestConfig = config;
    this.abortControllerMap = new Map();
  }

  // 取消全部请求
  cancelAllRequest() {
    for (const [, controller] of this.abortControllerMap) {
      controller.abort();
    }
    this.abortControllerMap.clear();
  }

  // 取消指定的请求
  cancelRequest(url: string | string[]) {
    const urlList = Array.isArray(url) ? url : [url];
    for (const _url of urlList) {
      this.abortControllerMap.get(_url)?.abort();
      this.abortControllerMap.delete(_url);
    }
  }

  // 匹配状态码
  matchHttpStatusCode(status: number): string {
    let errMessage = '';
    switch (status) {
      case 401:
        errMessage = '没有该操作权限';
        break;
      case 403:
        errMessage = '服务器禁止访问';
        break;
      case 404:
        errMessage = '服务器没有此服务';
        break;
      case 500:
      case 501:
      case 502:
      case 503:
      case 504:
        errMessage = '服务器错误';
        break;
      default:
        errMessage = `Unknown status code ${status}`;
    }
    return errMessage;
  }

  request<T = any>(config: RequestConfig): Promise<T> {
    //// showLoading
    const mergeConfig = { ...this.defaultRequestConfig, ...config };
    const enableLoading = mergeConfig.requestOptions?.enableLoading;
    delete config.requestOptions;
    if (enableLoading) {
      uni.showToast({ title: 'loading', icon: 'loading', mask: true });
    }

    // 携带 token
    if (config.url !== '/login') {
      const token = 'xxx';
      if (token) {
        config.header = {
          ...config.header,
          Authorization: `Bearer ${token}`,
        };
      }
    }

    return new Promise((resolve, reject) => {
      const task = uni.request({
        ...config,
        // statusCode: https://developers.weixin.qq.com/miniprogram/dev/framework/ability/network.html#%E5%9B%9E%E8%B0%83%E5%87%BD%E6%95%B0
        success: (response: UniNamespace.RequestSuccessCallbackResult) => {
          //// hideLoading
          if (enableLoading) {
            uni.hideToast();
          }

          // 删除 abort 项
          this.abortControllerMap.delete(config.url);

          if (response.statusCode === 200) {
            const res = response.data;
            resolve(res as unknown as Promise<T>);
            return;
          }

          // 请求已发出，但是不在 2xx 的范围
          const errMessage = this.matchHttpStatusCode(response.statusCode);
          console.warn('request error:', errMessage);

          // 401 处理
          // if (response.statusCode === 401) {
          //   reject(errMessage);
          //   return;
          // }

          reject(errMessage);
        },
        // errMsg: https://developers.weixin.qq.com/miniprogram/dev/framework/usability/PublicErrno.html
        fail: (error) => {
          //// hideLoading
          if (enableLoading) {
            uni.hideToast();
          }

          let errMessage = '';
          if (error.errMsg.indexOf('abort') !== -1) {
            errMessage = '请求取消';
          } else if (error.errMsg.indexOf('time out') !== -1) {
            errMessage = '请求超时';
          } else if (error.errMsg.indexOf('url not in domain list') !== -1) {
            errMessage = 'url域名不在安全域名列表中';
          } else {
            errMessage = 'request system error';
          }
          console.warn('request error:', errMessage);

          reject(errMessage);
        },
      });

      // 插入 abort 项
      this.abortControllerMap.set(config.url, task);
    });
  }

  get<T = any>(config: RequestConfig): Promise<T> {
    return this.request({ method: 'GET', ...config });
  }

  post<T = any>(config: RequestConfig): Promise<T> {
    return this.request({ method: 'POST', ...config });
  }
}

export const httpClient = new Request({
  url: '',
  timeout: 20 * 1000,
  requestOptions: {
    enableLoading: false,
  },
});
