/**
 * ==============================================================================
 * JavaScript Concept: Closures
 * ==============================================================================
 *
 * Definition:
 * A closure is a function bundled together with references to its surrounding
 * lexical environment.
 *
 * A closure allows an inner function to access variables from its outer function
 * even after the outer function has finished executing.
 *
 * Use Cases in API Playground:
 *
 * 1. `createApiConfig`
 *    - Encapsulates the API base URL in private lexical scope.
 *
 * 2. `createInMemoryCache`
 *    - Stores API responses privately using a Map.
 *    - The cache storage cannot be directly accessed from outside.
 *
 * 3. `createRequestTracker`
 *    - Tracks the number of API requests using private state.
 * ==============================================================================
 */

/**
 * 1. API Configuration Closure
 *
 * The returned function retains access to the API base URL.
 */
function createApiConfig(baseUrl) {
    return {
        getBaseUrl: function () {
            return baseUrl;
        },

        buildUrl: function (endpoint) {
            return `${baseUrl}${endpoint}`;
        }
    };
}

/**
 * 2. In-Memory TTL Cache Closure
 *
 * The internal cacheStore Map is private.
 *
 * This can store API Playground responses such as:
 * - Doctors data
 * - Patients data
 */
function createInMemoryCache(ttlMs = 60000) {
    // Private state held inside the closure
    const cacheStore = new Map();

    return {
        get: function (key) {
            const entry = cacheStore.get(key);

            if (!entry) {
                return null;
            }

            // Remove expired data
            if (Date.now() > entry.expiresAt) {
                cacheStore.delete(key);
                return null;
            }

            return entry.value;
        },

        set: function (key, value) {
            cacheStore.set(key, {
                value: value,
                expiresAt: Date.now() + ttlMs
            });

            return value;
        },

        has: function (key) {
            return this.get(key) !== null;
        },

        size: function () {
            return cacheStore.size;
        },

        clear: function () {
            cacheStore.clear();
        }
    };
}

/**
 * 3. API Request Tracker Closure
 *
 * Encapsulates the total number of API requests.
 *
 * The `requestCount` variable is private and cannot be directly
 * modified from outside.
 */
function createRequestTracker() {
    let requestCount = 0;

    return {
        trackRequest: function () {
            requestCount++;
            return requestCount;
        },

        getRequestCount: function () {
            return requestCount;
        },

        reset: function () {
            requestCount = 0;
        }
    };
}

export {
    createApiConfig,
    createInMemoryCache,
    createRequestTracker
};