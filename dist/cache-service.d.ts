import { RequestCache } from "./request-cache";
export declare class CacheService {
    private static caches;
    static clearCache(key: string): void;
    static add(key: string, request: RequestCache): void;
    static get(key: string): RequestCache | null;
    static clearAll(): void;
}
