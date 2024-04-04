"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cacheable = void 0;
var operators_1 = require("rxjs/operators");
var cache_service_1 = require("./cache-service");
var request_cache_1 = require("./request-cache");
function Cacheable(timer) {
    if (timer === void 0) { timer = 6000; }
    return function (target, propertyName, descriptor) {
        var originalMethod = descriptor.value;
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var cacheKey = propertyName.toString() + '_' + JSON.stringify(args);
            var cache = cache_service_1.CacheService.get(cacheKey);
            if (cache) {
                if (cache.isCompleted()) {
                    console.log('by completed');
                    return cache.buffer;
                }
                else {
                    console.log('by buffer');
                    return cache.buffer;
                }
            }
            else {
                var cache_1 = new request_cache_1.RequestCache();
                cache_service_1.CacheService.add(cacheKey, cache_1);
                console.log('no cache');
                var result = originalMethod.apply(this, args);
                return result.pipe((0, operators_1.tap)(function (response) {
                    var cacheSaved = cache_service_1.CacheService.get(cacheKey);
                    cacheSaved === null || cacheSaved === void 0 ? void 0 : cacheSaved.buffer.next(response);
                    cacheSaved === null || cacheSaved === void 0 ? void 0 : cacheSaved.markeAsCompleted();
                    if (timer) {
                        setTimeout(function () {
                            cache_service_1.CacheService.clearCache(cacheKey);
                        }, timer);
                    }
                }));
            }
        };
        return descriptor;
    };
}
exports.Cacheable = Cacheable;
