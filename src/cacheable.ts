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
            console.log(cacheKey);

            const cache = CacheService.get(cacheKey);
            if (cache) {
                if (cache.isCompleted()) {
                    console.log('by completed');
                    return cache.buffer;
                } else {
                    console.log('by buffer');
                    return cache.buffer;
                }
            } else {
                const cache = new RequestCache();
                CacheService.add(cacheKey, cache);
                console.log('no cache');

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
