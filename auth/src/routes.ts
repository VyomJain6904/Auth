/**
 * An Array of Routes that are Accessible to the Public 
 * These Routes do nott require Authentication
 * @type {string[]}
 */
export const publicRoutes = [
    "/"
];


/**
 * An Array of Routes that are used for Authentication 
 * These Routes will redirect Loggined in users to /settings
 * @type {string[]}
 */
export const authRoutes = [
    "/login",
    "/register",
    "/error"
];


/**
 * The prefix for API Authentication Routes
 * Routes that starts with this prefix are used for API Authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";


/**
 * The Default Redirect path after Logging IN
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";
