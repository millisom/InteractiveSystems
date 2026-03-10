// Application Constants for GluGuide
// All constants used throughout the application

// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3,
};

// Application Metadata
export const APP_CONFIG = {
  NAME: 'GluGuide',
  VERSION: '1.0.0',
  DESCRIPTION: 'Your personal glucose management companion',
  COMPANY: 'GluGuide Team',
  COPYRIGHT_YEAR: new Date().getFullYear(),
};

// UI Constants
export const UI_CONFIG = {
  // Breakpoints (Tailwind CSS breakpoints)
  BREAKPOINTS: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  
  // Z-index layers
  Z_INDEX: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
    notification: 1080,
  },
  
  // Animation durations (in milliseconds)
  ANIMATION: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
  
  // Layout Configuration
  LAYOUT: {
    navbar: {
      height: 'h-16',
      background: 'bg-secondary-dark',
      position: 'sticky top-0 left-0 w-full',
      zIndex: 'z-50',
      padding: 'px-5 py-3',
      shadow: 'shadow-wcag',
    },
    footer: {
      height: 'h-20',
      background: 'bg-secondary-medium',
      position: 'fixed bottom-0 left-0 right-0',
      zIndex: 'z-40',
      padding: 'px-4 py-4',
      shadow: 'shadow-wcag',
    },
    main: {
      padding: 'pb-20 mb-4',
      minHeight: 'min-h-screen',
      background: 'bg-primary-light',
    },
    container: {
      maxWidth: 'max-w-6xl',
      margin: 'mx-auto',
      padding: 'px-4',
    },
  },
  
  // Typography
  TYPOGRAPHY: {
    fontFamily: "'DM Sans', sans-serif",
    headings: {
      h1: 'text-4xl lg:text-5xl font-bold text-text-primary',
      h2: 'text-3xl font-bold text-text-primary',
      h3: 'text-2xl font-semibold text-text-primary',
      h4: 'text-xl font-semibold text-text-primary',
    },
    body: {
      base: 'text-text-secondary',
      large: 'text-lg text-text-secondary',
      small: 'text-sm text-text-secondary',
    },
  },
  
  // Common spacing values
  SPACING: {
    xs: '0.25rem',    // 4px
    sm: '0.5rem',     // 8px
    md: '1rem',       // 16px
    lg: '1.5rem',     // 24px
    xl: '2rem',       // 32px
    '2xl': '3rem',    // 48px
    '3xl': '4rem',    // 64px
  },
  
  // Border radius values
  RADIUS: {
    none: '0',
    sm: '0.125rem',   // 2px
    md: '0.375rem',   // 6px
    lg: '0.5rem',     // 8px
    xl: '0.75rem',    // 12px
    '2xl': '1rem',    // 16px
    full: '9999px',
  },
  
  // Shadow levels
  SHADOWS: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  },
};

// Form Constants
export const FORM_CONFIG = {
  // Input validation
  VALIDATION: {
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PASSWORD_MIN_LENGTH: 8,
    PASSWORD_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    PHONE_REGEX: /^\+?[\d\s\-\(\)]+$/,
    NAME_REGEX: /^[a-zA-Z\s'-]{2,50}$/,
  },
  
  // Field lengths
  FIELD_LENGTHS: {
    name: { min: 2, max: 50 },
    email: { min: 5, max: 100 },
    password: { min: 8, max: 128 },
    title: { min: 3, max: 100 },
    content: { min: 10, max: 5000 },
    comment: { min: 1, max: 500 },
  },
};

// User Roles and Permissions
export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  MODERATOR: 'moderator',
};

export const PERMISSIONS = {
  // User permissions
  CREATE_POST: 'create_post',
  EDIT_OWN_POST: 'edit_own_post',
  DELETE_OWN_POST: 'delete_own_post',
  COMMENT: 'comment',
  LIKE_POST: 'like_post',
  
  // Admin permissions
  EDIT_ANY_POST: 'edit_any_post',
  DELETE_ANY_POST: 'delete_any_post',
  MANAGE_USERS: 'manage_users',
  MANAGE_COMMENTS: 'manage_comments',
  VIEW_ANALYTICS: 'view_analytics',
};

// Glucose Management Constants
export const GLUCOSE_CONFIG = {
  // Normal glucose ranges (mg/dL)
  RANGES: {
    VERY_LOW: { min: 0, max: 54, label: 'Very Low', color: 'error' },
    LOW: { min: 55, max: 69, label: 'Low', color: 'warning' },
    TARGET: { min: 70, max: 180, label: 'In Range', color: 'success' },
    HIGH: { min: 181, max: 250, label: 'High', color: 'warning' },
    VERY_HIGH: { min: 251, max: 600, label: 'Very High', color: 'error' },
  },
  
  // Measurement units
  UNITS: {
    MG_DL: 'mg/dL',
    MMOL_L: 'mmol/L',
  },
  
  // Time ranges for graphs
  TIME_RANGES: {
    TODAY: '24h',
    WEEK: '7d',
    MONTH: '30d',
    THREE_MONTHS: '90d',
  },
  
};

// Content Management
export const CONTENT_CONFIG = {
  // Post categories
  CATEGORIES: [
    'General',
    'Recipes',
    'Exercise',
    'Medication',
    'Lifestyle',
    'Technology',
    'Support',
    'News',
  ],
  
  // Post tags (common tags)
  COMMON_TAGS: [
    'diabetes',
    'glucose',
    'recipe',
    'healthy',
    'exercise',
    'medication',
    'lifestyle',
    'tips',
    'support',
    'technology',
  ],
  
  // Content limits
  LIMITS: {
    MAX_TAGS_PER_POST: 10,
    MAX_IMAGES_PER_POST: 5,
    MAX_COMMENTS_PER_PAGE: 20,
    MAX_POSTS_PER_PAGE: 12,
  },
};

// Notification Types
export const NOTIFICATIONS = {
  TYPES: {
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
    INFO: 'info',
  },
  
  DURATION: {
    SHORT: 3000,   // 3 seconds
    MEDIUM: 5000,  // 5 seconds
    LONG: 7000,    // 7 seconds
  },
};

// Error Messages
export const ERROR_MESSAGES = {
  GENERIC: 'An unexpected error occurred. Please try again.',
  NETWORK: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION: 'Please check your input and try again.',
  SESSION_EXPIRED: 'Your session has expired. Please log in again.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  PROFILE_UPDATED: 'Profile updated successfully!',
  POST_CREATED: 'Post created successfully!',
  POST_UPDATED: 'Post updated successfully!',
  POST_DELETED: 'Post deleted successfully!',
  COMMENT_ADDED: 'Comment added successfully!',
  LOGOUT: 'You have been logged out successfully.',
  LOGIN: 'Welcome back!',
  SIGNUP: 'Account created successfully!',
};

// File Upload Constants
export const UPLOAD_CONFIG = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'text/plain'],
};

// Date and Time Formats
export const DATE_FORMATS = {
  SHORT: 'MMM d, yyyy',           // Jan 1, 2024
  LONG: 'MMMM d, yyyy',           // January 1, 2024
  WITH_TIME: 'MMM d, yyyy h:mm a', // Jan 1, 2024 2:30 PM
  TIME_ONLY: 'h:mm a',            // 2:30 PM
  ISO: 'yyyy-MM-dd',              // 2024-01-01
};

// WCAG and Accessibility Constants
export const ACCESSIBILITY = {
  // ARIA Labels and Descriptions
  ARIA: {
    REQUIRED_FIELD: 'required field',
    LOADING: 'Loading content, please wait',
    ERROR_MESSAGE: 'Error message',
    SUCCESS_MESSAGE: 'Success message',
    NAVIGATION: 'Main navigation',
    SEARCH: 'Search',
    CLOSE: 'Close',
    MENU: 'Menu',
    PROFILE_PICTURE: 'Profile picture',
    EDIT: 'Edit',
    DELETE: 'Delete',
    SAVE: 'Save',
    CANCEL: 'Cancel',
  },
  
  // Color Contrast Ratios (WCAG AA compliant)
  CONTRAST: {
    NORMAL_AA: '4.5:1',     // Normal text AA
    LARGE_AA: '3:1',        // Large text AA
    NORMAL_AAA: '7:1',      // Normal text AAA
    LARGE_AAA: '4.5:1',     // Large text AAA
  },
  
  // Focus management
  FOCUS: {
    RING_WIDTH: '2px',
    RING_OFFSET: '2px',
    RING_COLOR: '#3b82f6',
  },
  
  // Screen reader utilities
  SR_ONLY: 'sr-only',
  
  // Minimum touch targets (ISO 9241-11)
  TOUCH_TARGET: {
    MIN_SIZE: '44px',       // Minimum 44x44px
    RECOMMENDED: '48px',     // Recommended 48x48px
  },
};

// Common CSS Class Combinations
export const COMMON_CLASSES = {
  // Flexbox utilities
  FLEX_CENTER: 'flex items-center justify-center',
  FLEX_BETWEEN: 'flex items-center justify-between',
  FLEX_START: 'flex items-center justify-start',
  FLEX_COL_CENTER: 'flex flex-col items-center justify-center',
  
  // Grid utilities
  GRID_COLS_1: 'grid grid-cols-1',
  GRID_COLS_2: 'grid grid-cols-2',
  GRID_COLS_3: 'grid grid-cols-3',
  GRID_COLS_4: 'grid grid-cols-4',
  
  // Common button styles
  BUTTON_BASE: 'px-4 py-2 rounded-md font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2',
  
  // Common input styles
  INPUT_BASE: 'w-full px-3 py-2 border rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0',
  
  // Common card styles
  CARD_BASE: 'bg-background-primary rounded-lg shadow-wcag overflow-hidden',
  
  // Common text styles
  TEXT_HEADING: 'font-bold text-text-primary',
  TEXT_BODY: 'text-text-secondary',
  TEXT_MUTED: 'text-text-tertiary',
  
  // Hover and focus states
  HOVER_LIFT: 'transition-transform duration-200 hover:transform hover:-translate-y-1',
  FOCUS_RING: 'focus:ring-2 focus:ring-secondary-dark focus:ring-offset-2',
};

// Color Definitions for WCAG Compliance
export const COLORS = {
  // Primary colors
  PRIMARY: {
    DEFAULT: '#FFF2E0',
    LIGHT: '#FFFAF5',
    DARK: '#E5D4BC',
  },
  
  // Secondary colors  
  SECONDARY: {
    DEFAULT: '#898AC4',
    LIGHT: '#C0C9EE',
    MEDIUM: '#A2AADB', 
    DARK: '#6B6C9A',
    DARKER: '#5A5B84',
  },
  
  // Background colors
  BACKGROUND: {
    PRIMARY: '#FFFFFF',
    SECONDARY: '#F9FAFB',
    LIGHT: '#FFFAF5',
  },
  
  // Text colors
  TEXT: {
    PRIMARY: '#000000',
    SECONDARY: '#374151',
    TERTIARY: '#6B7280',
    LIGHT: '#FFF2E0',
  },
  
  // Border colors
  BORDER: {
    DEFAULT: '#A2AADB',
    LIGHT: '#C0C9EE',
    DARK: '#898AC4',
  },
  
  // Semantic colors - WCAG AA compliant
  SUCCESS: {
    DEFAULT: '#10B981',
    DARK: '#047857',
    LIGHT: '#D1FAE5',
  },
  
  WARNING: {
    DEFAULT: '#F59E0B',
    DARK: '#D97706', 
    LIGHT: '#FEF3C7',
  },
  
  ERROR: {
    DEFAULT: '#EF4444',
    DARK: '#DC2626',
    LIGHT: '#FEE2E2',
  },
  
  INFO: {
    DEFAULT: '#3B82F6',
    DARK: '#1D4ED8',
    LIGHT: '#DBEAFE',
  },
};


export default {
  API_CONFIG,
  APP_CONFIG,
  UI_CONFIG,
  FORM_CONFIG,
  USER_ROLES,
  PERMISSIONS,
  GLUCOSE_CONFIG,
  CONTENT_CONFIG,
  NOTIFICATIONS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  UPLOAD_CONFIG,
  DATE_FORMATS,
  COMMON_CLASSES,
  COLORS,
  ACCESSIBILITY,
};