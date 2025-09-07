// Base paths
const BASE_PATHS = {
    AUTH: '/auth',
    ADMIN: '/admin',
    MANAGE_USER: '/admin/manage-user',
} as const;

// Auth routes
const AUTH = {
    LOGIN: `${BASE_PATHS.AUTH}/login`,
    REGISTER: `${BASE_PATHS.AUTH}/register`,
    FORGOT_PASSWORD: `${BASE_PATHS.AUTH}/forgot-password`,
    VERIFY_OTP: `${BASE_PATHS.AUTH}/verify-otp`,
    RESET_PASSWORD: `${BASE_PATHS.AUTH}/reset-password`,
    VERIFY_EMAIL: `${BASE_PATHS.AUTH}/verify-email`,
    UNAUTHORIZED: `${BASE_PATHS.AUTH}/unauthorized`,
    LOGOUT: '/logout',
} as const;

// Admin dashboard routes
const ADMIN_DASHBOARD = {
    USER: {
        INFO: `${BASE_PATHS.MANAGE_USER}/info`,
        POINTS: `${BASE_PATHS.MANAGE_USER}/points`,
        SUBMITTED_IMAGE: `${BASE_PATHS.MANAGE_USER}/submitted-image`,
        SENT_MAIL: `${BASE_PATHS.MANAGE_USER}/sent-mail`,
        TRANSACTIONS: `${BASE_PATHS.MANAGE_USER}/transactions`,
        NOTIFICATIONS: `${BASE_PATHS.MANAGE_USER}/notifications`,
        SETTINGS: `${BASE_PATHS.MANAGE_USER}/settings`,
        LOGS: `${BASE_PATHS.MANAGE_USER}/logs`,
        REPORTS: `${BASE_PATHS.MANAGE_USER}/reports`,
        ANALYTICS: `${BASE_PATHS.MANAGE_USER}/analytics`,
    },
    CONTENT: {
        INFO: `${BASE_PATHS.ADMIN}/content-info`,
        CREATE: `${BASE_PATHS.ADMIN}/content-create`,
        EDIT: `${BASE_PATHS.ADMIN}/content-edit`,
        LIST: `${BASE_PATHS.ADMIN}/content-list`,
    },
    QUESTION: {
        INFO: `${BASE_PATHS.ADMIN}/question-info`,
        CREATE: `${BASE_PATHS.ADMIN}/question-create`,
        EDIT: `${BASE_PATHS.ADMIN}/question-edit`,
        LIST: `${BASE_PATHS.ADMIN}/question-list`,
    },
    STATISTICS: {
        INFO: `${BASE_PATHS.ADMIN}/statistics-info`,
        OVERVIEW: `${BASE_PATHS.ADMIN}/statistics-overview`,
        REPORTS: `${BASE_PATHS.ADMIN}/statistics-reports`,
        ANALYTICS: `${BASE_PATHS.ADMIN}/statistics-analytics`,
    },
} as const;




export const ROUTES = {
    AUTH,
    ADMIN_DASHBOARD,
    BASE_PATHS,
} as const;

// Type exports for better TypeScript support
export type RouteKeys = keyof typeof ROUTES;
export type AuthRoutes = keyof typeof AUTH;
export type AdminRoutes = keyof typeof ADMIN_DASHBOARD;