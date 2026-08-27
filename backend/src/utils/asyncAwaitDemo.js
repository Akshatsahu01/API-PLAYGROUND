/**
 * ==============================================================================
 * JavaScript Concept: async / await
 * ==============================================================================
 *
 * Definition:
 * `async / await` is syntactic sugar built on top of ECMAScript Promises.
 *
 * - `async`:
 *   Marks a function as asynchronous and guarantees it returns a Promise.
 *
 * - `await`:
 *   Pauses execution inside an async function until the Promise settles
 *   without blocking the Node.js Event Loop.
 *
 * Benefits:
 *
 * 1. Synchronous-looking and readable asynchronous control flow.
 * 2. Standard `try...catch...finally` error handling.
 * 3. Reduces `.then()` nesting.
 * 4. Supports concurrent execution with `Promise.all`.
 *
 * Project Connection:
 * This file fetches doctors and patients from the API Playground.
 * ==============================================================================
 */

import {
    fetchDoctorsPromise,
    fetchPatientsPromise
} from './promiseVsCallback.js';

/**
 * 1. Sequential vs Parallel execution demonstration
 */
async function runAsyncAwaitDemonstration() {
    console.log('\n--- ASYNC / AWAIT DEMONSTRATION ---');

    /**
     * A. Sequential execution
     *
     * The second request starts only after the first request completes.
     */
    console.log('1. Starting Sequential Async execution...');

    const startSeq = Date.now();

    try {
        const doctors = await fetchDoctorsPromise();
        const patients = await fetchPatientsPromise();

        const seqDuration = Date.now() - startSeq;

        console.log(
            `   Sequential completed in ~${seqDuration}ms.`
        );

        console.log('   Doctors response received:', !!doctors);
        console.log('   Patients response received:', !!patients);
    } catch (err) {
        console.error('Sequential execution error:', err.message);
    }

    /**
     * B. Parallel execution
     *
     * Both API requests are started together.
     */
    console.log(
        '2. Starting Parallel Async execution with Promise.all...'
    );

    const startPar = Date.now();

    try {
        const [doctors, patients] = await Promise.all([
            fetchDoctorsPromise(),
            fetchPatientsPromise()
        ]);

        const parDuration = Date.now() - startPar;

        console.log(
            `   Parallel completed in ~${parDuration}ms.`
        );

        console.log('   Doctors response received:', !!doctors);
        console.log('   Patients response received:', !!patients);
    } catch (err) {
        console.error('Parallel execution error:', err.message);
    }

    console.log('-----------------------------------\n');
}

export {
    runAsyncAwaitDemonstration
};