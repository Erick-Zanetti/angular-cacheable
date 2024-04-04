"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestCache = void 0;
var rxjs_1 = require("rxjs");
var NULLABLE = Symbol('nullable');
var RequestCache = /** @class */ (function () {
    function RequestCache() {
        this._completed = false;
        this._buffer = new rxjs_1.BehaviorSubject(NULLABLE);
    }
    Object.defineProperty(RequestCache.prototype, "buffer", {
        get: function () {
            return this._buffer.pipe((0, rxjs_1.filter)(function (data) { return data !== NULLABLE; }));
        },
        enumerable: false,
        configurable: true
    });
    RequestCache.prototype.markeAsCompleted = function () {
        this._completed = true;
    };
    RequestCache.prototype.isCompleted = function () {
        return this._completed;
    };
    return RequestCache;
}());
exports.RequestCache = RequestCache;
