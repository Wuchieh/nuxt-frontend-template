import { md5 } from 'js-md5';

import { useWithResolvers } from '~/utils/index';
import type { withResolversPromise } from '~/utils/index';

export function debounceFunc<T extends unknown[]>(
    func: (...args: T) => void,
    duration: number = 500,
): (...args: T) => void {
    let timeout: NodeJS.Timeout;

    return (...args: T) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func(...args);
        }, duration);
    };
}

export function debouncePromise<T extends (...args: any[]) => Promise<any>>(apiCall: T) {
    const running = new Map<string, withResolversPromise<ReturnType<T>>>();

    return (...args: Parameters<T>): ReturnType<T> => {
        return new Promise((resolve, reject) => {
            const key = md5(JSON.stringify(args));

            if (running.has(key)) {
                running.get(key)!.promise.then(resolve).catch(reject);
            } else {
                const promiseWrapper = useWithResolvers<ReturnType<T>>();

                running.set(key, promiseWrapper);

                apiCall(...args)
                    .then((result) => {
                        running.delete(key);
                        promiseWrapper.resolve(result as ReturnType<T>);
                        resolve(result);
                    })
                    .catch((error) => {
                        running.delete(key);
                        promiseWrapper.reject(error);
                        reject(error);
                    });
            }
        }) as ReturnType<T>;
    };
}

export function debounceRef<T = any>(value: T, duration: number = 500) {
    return customRef<T>((track, trigger) => {
        let timeout: any;
        return {
            get() {
                track();
                return value;
            },
            set(newValue) {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    value = newValue;
                    trigger();
                }, duration);
            },
        };
    });
}
