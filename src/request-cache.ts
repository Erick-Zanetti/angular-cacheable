import { BehaviorSubject, filter } from "rxjs";

const NULLABLE = Symbol('nullable');

export class RequestCache {
    private _completed: boolean = false;
    private _isInvalid: boolean = false;

    private _buffer: BehaviorSubject<any> = new BehaviorSubject<any>(NULLABLE);
    get buffer(): BehaviorSubject<any> {
        return this._buffer.pipe(filter((data) => data !== NULLABLE)) as BehaviorSubject<any>;
    }

    markeAsCompleted() {
        this._completed = true;
        this._isInvalid = false;
    }

    isCompleted(): boolean {
        return this._completed;
    }

    marksAsUncompleted() {
        this._completed = false;
    }

    markeAsInvalid() {
        this._isInvalid = true;
    }

    isInvalid(): boolean {
        return this._isInvalid;
    }
}