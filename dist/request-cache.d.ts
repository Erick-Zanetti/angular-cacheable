import { BehaviorSubject } from "rxjs";
export declare class RequestCache {
    private _completed;
    private _buffer;
    get buffer(): BehaviorSubject<any>;
    markeAsCompleted(): void;
    isCompleted(): boolean;
}
