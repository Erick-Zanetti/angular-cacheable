import { BehaviorSubject, filter } from "rxjs";

const NULLABLE = Symbol('nullable');

export class RequestCache {
    private _completed: boolean = false;

    private _buffer: BehaviorSubject<any> = new BehaviorSubject<any>(NULLABLE);
    get buffer(): BehaviorSubject<any> {
        return this._buffer.pipe(filter((data) => data !== NULLABLE)) as BehaviorSubject<any>;
    }

    markeAsCompleted() {
        this._completed = true;
    }

    isCompleted(): boolean {
        return this._completed;
    }
}