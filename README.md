# Cacheable Decorator Library

## Overview

This library provides a single decorator function, `Cacheable`, designed to enhance methods with caching capabilities. It leverages RxJS operators and a simple caching service to store and retrieve method call results based on unique arguments and method names. This functionality is especially useful for reducing the number of repeated calls to resource-intensive or time-consuming operations.

## Features

- **Method Caching**: Automatically caches the results of method calls, reducing the need for repeated executions.
- **Customizable Expiration**: Optionally specify a cache duration, after which the cached data will be invalidated.
- **Easy Integration**: Designed to be seamlessly integrated with minimal configuration.

## Installation

```bash
npm install angular-cacheable
```

## Usage

To use the `Cacheable` decorator, simply import it and apply it to any class method. Optionally, you can specify a timer in milliseconds to control how long the data should be cached.

```typescript
import { Cacheable } from 'angular-cacheable';

class SomeService {
    @Cacheable(5000) // Cache for 5000 ms
    fetchData(args: any): Observable<any> {
        // method implementation
    }
}
```

### How It Works

1. **Caching**: When a method annotated with `@Cacheable` is called, the decorator checks if a cached result is available.
2. **Cache Retrieval**: If a cached result is found and is still valid, it returns the cached data instead of executing the method.
3. **Cache Storage**: If no cache is found or if the cache has expired, the method is executed, and its result is cached for future calls.

## API Reference

### `Cacheable(timer?: number): MethodDecorator`

Decorates a method to enable caching of its return values.

- **Parameters**:
  - `timer` (optional): The duration in milliseconds for which the cache is considered valid.
  
## Dependencies

- `rxjs`: Utilized for its operators and observables to handle asynchronous data streams.
- Internal `CacheService` and `RequestCache`: Used for managing cache instances and their lifecycle.

## License

Include your license information here.
