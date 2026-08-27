/**
 * ==============================================================================
 * JavaScript Concept: Promises vs Callbacks
 * Project: API Playground
 * ==============================================================================
 *
 * Comparison:
 *
 * 1. Callbacks:
 *    - A traditional asynchronous pattern where a function is passed as an
 *      argument and invoked when the operation finishes.
 *    - Drawbacks:
 *      * "Callback Hell" / "Pyramid of Doom".
 *      * Inversion of Control.
 *      * Difficult error bubbling.
 *
 * 2. Promises:
 *    - An object representing the eventual completion or failure of an async
 *      operation.
 *    - 3 States: `pending`, `fulfilled`, `rejected`.
 *    - Advantages:
 *      * Chainable with `.then()`, `.catch()`, `.finally()`.
 *      * Standardized error propagation.
 *      * Supports `Promise.all()`, `Promise.allSettled()`, and `Promise.race()`.
 *      * Works seamlessly with `async / await`.
 *
 * Project Connection:
 * This demonstration uses the API Playground's:
 * - GET /api/doctors
 * - GET /api/patients
 * ==============================================================================
 */

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:5000/api';

/**
 * 1. Callback-style API request
 *
 * Uses the error-first callback pattern:
 * callback(error, data)
 */
function fetchApiCallback(endpoint, callback) {
    if (!endpoint) {
        return callback(new Error('API endpoint is required'), null);
    }

    fetch(`${API_BASE_URL}${endpoint}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(
                    `API request failed with status ${response.status}`
                );
            }

            return response.json();
        })
        .then((data) => {
            callback(null, data);
        })
        .catch((error) => {
            callback(error, null);
        });
}

/**
 * 2. Promisification Helper
 *
 * Demonstrates how to wrap a callback-based function
 * into a standard Promise.
 */
function promisify(callbackBasedFn) {
    return function (...args) {
        return new Promise((resolve, reject) => {
            callbackBasedFn(...args, (err, result) => {
                if (err) {
                    return reject(err);
                }

                resolve(result);
            });
        });
    };
}

/**
 * 3. Wrapped Promise version
 */
const fetchApiPromise = promisify(fetchApiCallback);

/**
 * Project-specific API functions
 */
const fetchDoctorsPromise = () => fetchApiPromise('/doctors');

const fetchPatientsPromise = () => fetchApiPromise('/patients');

/**
 * 4. Concurrency Demonstrations:
 *
 * - Promise.all: Fails immediately if ANY promise rejects.
 * - Promise.allSettled: Waits for ALL promises to complete.
 * - Promise.race: Returns the first promise to settle.
 */
async function demonstratePromiseConcurrency() {
    console.log('\n--- PROMISES VS CALLBACKS DEMONSTRATION ---');

    // 1. Callback execution
    fetchApiCallback('/doctors', (err, data) => {
        if (err) {
            console.error('1. Callback error:', err.message);
        } else {
            console.log('1. Callback resolved: Doctors data received');
        }
    });

    // 2. Promise execution with .then() / .catch()
    fetchPatientsPromise()
        .then(() => {
            console.log(
                '2. Promise resolved via .then(): Patients data received'
            );
        })
        .catch((err) => {
            console.error('Promise caught error:', err.message);
        });

    // 3. Promise.all - Parallel concurrent execution
    try {
        const allResults = await Promise.all([
            fetchDoctorsPromise(),
            fetchPatientsPromise()
        ]);

        console.log(
            `3. Promise.all resolved ${allResults.length} API requests in parallel.`
        );
    } catch (err) {
        console.error('Promise.all error:', err.message);
    }

    // 4. Promise.allSettled - Success and failure handling
    const settledResults = await Promise.allSettled([
        fetchDoctorsPromise(),
        fetchApiPromise('/invalid-endpoint')
    ]);

    console.log(
        `4. Promise.allSettled handled ${settledResults.length} requests.`
    );

    // 5. Promise.race - First request to complete
    try {
        const fastestResult = await Promise.race([
            fetchDoctorsPromise(),
            fetchPatientsPromise()
        ]);

        console.log('5. Promise.race returned the fastest API response.');

        return {
            settledResults,
            fastestResult
        };
    } catch (err) {
        console.error('Promise.race error:', err.message);
    }

    console.log('-------------------------------------------\n');
}

export {
    API_BASE_URL,
    fetchApiCallback,
    fetchApiPromise,
    fetchDoctorsPromise,
    fetchPatientsPromise,
    promisify,
    demonstratePromiseConcurrency
};