// Global type definitions for MiscPay App

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// User types
export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  createdAt: string
  updatedAt: string
}

// Payment types
export interface Payment {
  id: string
  amount: number
  currency: string
  status: 'pending' | 'completed' | 'failed' | 'cancelled'
  userId: string
  createdAt: string
  updatedAt: string
}

// Common component prop types
export interface BaseProps {
  className?: string
  children?: React.ReactNode
}

// Form types
export interface FormState {
  isLoading: boolean
  errors: Record<string, string>
  isDirty: boolean
}

// Navigation types
export interface NavItem {
  label: string
  href: string
  icon?: React.ComponentType
  children?: NavItem[]
}

// Environment variables
export interface EnvironmentConfig {
  apiUrl: string
  appName: string
  appVersion: string
  isDevelopment: boolean
  isProduction: boolean
}
