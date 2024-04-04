"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheService = void 0;
var CacheService = /** @class */ (function () {
    function CacheService() {
    }
    CacheService.clearCache = function (key) {
        var _a;
        (_a = this.caches.get(key)) === null || _a === void 0 ? void 0 : _a.buffer.complete();
        this.caches.delete(key);
    };
    CacheService.add = function (key, request) {
        if (this.caches.has(key)) {
            this.clearCache(key);
        }
        this.caches.set(key, request);
    };
    CacheService.get = function (key) {
        return this.caches.get(key) || null;
    };
    CacheService.clearAll = function () {
        this.caches = new Map();
    };
    CacheService.caches = new Map();
    return CacheService;
}());
exports.CacheService = CacheService;
