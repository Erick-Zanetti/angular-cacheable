import { RequestCache } from "./request-cache";

export class CacheService {
    private static caches = new Map<string, RequestCache>();

    public static clearCache(key: string): void {
        this.caches.get(key)?.buffer.complete();
        this.caches.delete(key);
    }

    public static add(key: string, request: RequestCache): void {
        if (this.caches.has(key)) {
            this.clearCache(key);
        }
        this.caches.set(key, request);
    }

    public static get(key: string): RequestCache | null {
        return this.caches.get(key) || null;
    }

    public static clearAll(): void {
        this.caches = new Map<string, RequestCache>();
    }
}