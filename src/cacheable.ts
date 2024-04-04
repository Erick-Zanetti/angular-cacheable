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
                    return cache.buffer;
                } else {
                    return cache.buffer;
                }
            } else {
                const cache = new RequestCache();
                CacheService.add(cacheKey, cache);

                const result = originalMethod.apply(this, args);
                return result.pipe(
                    tap((response) => {
                        const cacheSaved = CacheService.get(cacheKey);
                        cacheSaved?.buffer.next(response);
                        cacheSaved?.markeAsCompleted();
                        if (timer) {
                            setTimeout(() => {
                                CacheService.clearCache(cacheKey);
                            }, timer);
                        }
                    })
                );
            }
        };

        return descriptor;
    };
}
