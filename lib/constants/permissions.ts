// Permiso constantes para usar en toda la aplicación
// Esto asegura que no hay errores de tipografía

export const PERMISSIONS = {
  // User Management
  CREATE_USER: 'create_user',
  EDIT_USER: 'edit_user',
  DELETE_USER: 'delete_user',
  ASSIGN_ROLE: 'assign_role',
  VIEW_USERS: 'view_users',

  // Data Management (Injectors)
  CREATE_INJECTOR: 'create_injector',
  EDIT_INJECTOR: 'edit_injector',
  DELETE_INJECTOR: 'delete_injector',
  VIEW_INJECTOR: 'view_injector',

  // Calibration Management
  EDIT_CALIBRATION: 'edit_calibration',
  UPLOAD_CALIBRATION: 'upload_calibration',
  DELETE_CALIBRATION: 'delete_calibration',
  VIEW_CALIBRATION: 'view_calibration',

  // Reports
  VIEW_REPORTS: 'view_reports',
  EXPORT_DATA: 'export_data',

  // System
  VIEW_LOGS: 'view_logs',
  MANAGE_SYSTEM: 'manage_system',
} as const

export const ROLES = {
  ADMIN: 'admin',
  SUPERVISOR: 'supervisor',
  EDITOR: 'editor',
  VIEWER: 'viewer',
} as const

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS]
export type Role = (typeof ROLES)[keyof typeof ROLES]
