const prefix = '';

interface Storage<T> {
  key: string;
  defaultValue: T;
}

export class LocalStorage<T> implements Storage<T> {
  key: string;
  defaultValue: T;

  constructor(key: string, defaultValue: T) {
    this.key = prefix + key;
    this.defaultValue = defaultValue;
  }

  setItem(value: T) {
    uni.setStorageSync(this.key, JSON.stringify(value));
  }

  getItem(): T {
    const value = uni.getStorageSync(this.key);
    if (value === undefined) return this.defaultValue;
    try {
      return value && value !== 'null' && value !== 'undefined'
        ? (JSON.parse(value) as T)
        : this.defaultValue;
    } catch (error) {
      return value && value !== 'null' && value !== 'undefined'
        ? (value as unknown as T)
        : this.defaultValue;
    }
  }

  removeItem() {
    uni.removeStorageSync(this.key);
  }
}
