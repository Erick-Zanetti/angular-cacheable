import { tap } from 'rxjs/operators';
import { CacheService } from './cache-service';
import { RequestCache } from './request-cache';

export function Cacheable(timer?: number): MethodDecorator {
    return function (
        target: Object,
        propertyName: string | symbol,
        descriptor: TypedPropertyDescriptor<any>
    ) {
        const originalMethod = descriptor.value;

        descriptor.value = function (...args: any[]) {
            const cacheKey = propertyName.toString() + '_' + JSON.stringify(args);

            const cache = CacheService.get(cacheKey);
            if (cache) {
                if (cache.isCompleted()) {
                    if (cache.isInvalid()) {
                        cache.marksAsUncompleted();
                        callOriginalFunction.call(this, originalMethod, args, cacheKey, timer);
                        return cache.buffer;
                    } else {
                        return cache.buffer;
                    }
                } else {
                    return cache.buffer;
                }
            } else {
                const cache = new RequestCache();
                CacheService.add(cacheKey, cache);
                callOriginalFunction.call(this, originalMethod, args, cacheKey, timer);
                return cache.buffer;
            }
        };

        return descriptor;
    };
}
function callOriginalFunction(this: TypedPropertyDescriptor<any>, originalMethod: any, args: any[], cacheKey: string, timer: number | undefined) {
    const result = originalMethod.apply(this, args);
    result.pipe(
        tap((response) => {
            const cacheSaved = CacheService.get(cacheKey);
            cacheSaved?.buffer.next(response);
            cacheSaved?.markeAsCompleted();
            if (timer) {
                setTimeout(() => {
                    cacheSaved?.markeAsInvalid();
                }, timer);
            }
        })
    );
}

