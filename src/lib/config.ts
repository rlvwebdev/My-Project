// Utility functions and constants for MiscPay App

// Environment configuration
export const config = {
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || 'MyProject',
    version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
  },
  api: {
    url: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  },
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
} as const

// Common constants
export const CURRENCY = {
  USD: 'USD',
  EUR: 'EUR',
  GBP: 'GBP',
} as const

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
} as const

// API helpers
export const createApiUrl = (endpoint: string): string => {
  return `${config.api.url}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`
}

// Type guards
export const isString = (value: unknown): value is string => {
  return typeof value === 'string'
}

export const isNumber = (value: unknown): value is number => {
  return typeof value === 'number' && !isNaN(value)
}
