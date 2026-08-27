/**
 * ==============================================================================
 * JavaScript Concept: Hoisting & Temporal Dead Zone (TDZ)
 * ==============================================================================
 *
 * Definition:
 * Hoisting is JavaScript's behavior of processing declarations before code
 * execution begins.
 *
 * Key Distinctions:
 *
 * 1. Function Declarations:
 *    - Both the function name and definition are available before the function
 *      declaration appears in the source code.
 *
 * 2. `var`:
 *    - The declaration is hoisted.
 *    - It is initialized with `undefined`.
 *
 * 3. `let` and `const`:
 *    - The declarations are hoisted but remain in the
 *      Temporal Dead Zone (TDZ).
 *    - Accessing them before initialization throws a ReferenceError.
 *
 * 4. Function Expressions and Arrow Functions:
 *    - Follow the rules of their variable declarations.
 *    - `var` -> undefined before assignment.
 *    - `let` / `const` -> TDZ before initialization.
 *
 * Project Connection:
 * This demonstration uses API Playground concepts such as API endpoints
 * and route-related functions.
 * ==============================================================================
 */

function runHoistingDemonstration() {
    console.log('\n--- HOISTING DEMONSTRATION ---');

    /**
     * 1. Function Declaration Hoisting
     *
     * Works because function declarations are fully hoisted.
     */
    console.log(
        '1. Calling getDoctorsEndpoint() before declaration:',
        getDoctorsEndpoint()
    );

    function getDoctorsEndpoint() {
        return '/api/doctors';
    }

    /**
     * 2. Variable Hoisting with `var`
     *
     * `var` is hoisted and initialized as undefined.
     */
    console.log(
        '2. Accessing apiEndpoint before assignment:',
        typeof apiEndpoint,
        '(value is',
        apiEndpoint,
        ')'
    );

    var apiEndpoint = '/api/patients';

    console.log(
        '   Accessing apiEndpoint after assignment:',
        apiEndpoint
    );

    /**
     * 3. Temporal Dead Zone with `const`
     */
    try {
        eval('console.log(apiBaseUrl)');
    } catch (e) {
        console.log(
            '3. Accessing const in TDZ threw expected Error:',
            e.name
        );
    }

    const apiBaseUrl = 'http://localhost:5000/api';

    console.log(
        '   apiBaseUrl after initialization:',
        apiBaseUrl
    );

    /**
     * 4. Arrow Function Hoisting
     *
     * A const variable remains in the Temporal Dead Zone.
     */
    try {
        eval('fetchDoctorsRoute()');
    } catch (e) {
        console.log(
            '4. Calling const arrow function before declaration threw:',
            e.name
        );
    }

    const fetchDoctorsRoute = () => '/api/doctors';

    console.log(
        '   Arrow function after initialization:',
        fetchDoctorsRoute()
    );

    console.log('-------------------------------\n');
}

export {
    runHoistingDemonstration
};