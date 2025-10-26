/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface HandlersAPIResponse {
  data?: any;
  message?: string;
  success?: boolean;
}

export interface HandlersAdminDTO {
  /** @example "2025-01-15T10:30:00Z" */
  created_at: string;
  /** @example "00000000-0000-0000-0000-000000000001" */
  id: string;
  /** @example "super" */
  role: string;
  /** @example "2025-01-15T10:30:00Z" */
  updated_at: string;
  /** @example "admin" */
  username: string;
}

export interface HandlersAdminData {
  /** @example "550e8400-e29b-41d4-a716-446655440001" */
  id: string;
  /** @example "regular" */
  role: string;
  /** @example "newadmin" */
  username: string;
}

export interface HandlersAdminDetailData {
  /** @example "2025-01-15T10:30:00Z" */
  created_at?: string;
  /** @example "00000000-0000-0000-0000-000000000001" */
  id?: string;
  /** @example "super" */
  role?: string;
  /** @example "2025-01-15T10:30:00Z" */
  updated_at?: string;
  /** @example "admin" */
  username?: string;
}

export interface HandlersAdminDetailResponse {
  data?: HandlersAdminDetailData;
  /** @example "Admin retrieved successfully" */
  message?: string;
  /** @example true */
  success?: boolean;
}

export interface HandlersAdminLoginData {
  /** @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." */
  access_token: string;
  /** @example "00000000-0000-0000-0000-000000000001" */
  id: string;
  /** @example "super" */
  role: string;
  /** @example "admin" */
  username: string;
}

export interface HandlersAdminLoginRequest {
  /** @example "admin" */
  password: string;
  /** @example "admin" */
  username: string;
}

export interface HandlersAdminLoginResponse {
  data?: HandlersAdminLoginData;
  /** @example "Login successful" */
  message: string;
  /** @example true */
  success: boolean;
}

export interface HandlersAdminResponse {
  data?: HandlersAdminData;
  /** @example "Admin created successfully" */
  message: string;
  /** @example true */
  success: boolean;
}

export interface HandlersAdminsListResponse {
  data?: HandlersAdminDTO[];
  /** @example "Admins retrieved successfully" */
  message: string;
  pagination?: HandlersPaginationMeta;
  /** @example true */
  success: boolean;
}

export interface HandlersAuditLogDetailResponse {
  data?: ModelsAdminAuditLog;
  /** @example "Audit log retrieved successfully" */
  message?: string;
  /** @example true */
  success?: boolean;
}

export interface HandlersAvailableLocationsResponse {
  data?: HandlersLocationDTO[];
  /** @example "Available locations retrieved successfully" */
  message: string;
  /** @example true */
  success: boolean;
}

export interface HandlersContactDTO {
  /** @example "г. Бишкек, проспект Чуй, 135" */
  address?: string;
  /** @example "support@ololo.com" */
  email_support?: string;
  /** @example 77091234567 */
  support_number?: number;
}

export interface HandlersContactResponse {
  data?: HandlersContactDTO;
  /** @example "Contact information retrieved successfully" */
  message: string;
  /** @example true */
  success: boolean;
}

export interface HandlersCreateAdminRequest {
  /**
   * @minLength 6
   * @example "password123"
   */
  password: string;
  /**
   * "super" or "regular"
   * @example "regular"
   */
  role: string;
  /** @example "newadmin" */
  username: string;
}

export interface HandlersCreateUserRequest {
  /** Optional - if provided, will assign user to these locations and gates */
  locations?: HandlersLocationAssignmentRequest[];
  /**
   * @minLength 6
   * @example "password123"
   */
  password: string;
  /** @example "+77771234567" */
  phone: string;
}

export interface HandlersGateActionData {
  /** @example 1 */
  gate_id?: number;
  /** @example true */
  status?: boolean;
}

export interface HandlersGateActionResponse {
  data?: HandlersGateActionData;
  /** @example "Gate operation completed successfully" */
  message: string;
  /** @example true */
  success: boolean;
}

export interface HandlersGateDTO {
  /** @example "Main vehicle entrance for visitors. Controlled by biometric access, opens in 3 seconds with safety sensors." */
  description?: string;
  /** @example true */
  gate_is_horizontal?: boolean;
  /** @example 1 */
  id?: number;
  /** @example true */
  is_open?: boolean;
  /** @example 1 */
  location_id?: number;
  /** @example "Автоматический Шлагбаум №12" */
  title?: string;
}

export interface HandlersGatesListResponse {
  data?: HandlersGateDTO[];
  /** @example "Gates retrieved successfully" */
  message: string;
  /** @example true */
  success: boolean;
}

export interface HandlersHealthCheckResponse {
  /** @example "production" */
  environment: string;
  /** @example "Ololo Gate API is running" */
  message: string;
  /** @example "healthy" */
  status: string;
  /** @example true */
  success: boolean;
  /** @example "2025-01-15T10:30:45Z" */
  timestamp: string;
  /** @example "1h30m45s" */
  uptime: string;
  /** @example "1.0.0" */
  version: string;
}

export interface HandlersLocationAssignmentRequest {
  gateIds: number[];
  /** @example 1 */
  locationId: number;
}

export interface HandlersLocationDTO {
  /** @example "г. Бишкек, проспект Чуй, 135" */
  address?: string;
  gates?: HandlersGateDTO[];
  /** @example 1 */
  id?: number;
  /** @example "https://picsum.photos/seed/alatoo/200" */
  logo?: string;
  /** @example "Торгово-развлекательный центр Ала-Тоо" */
  title?: string;
}

export interface HandlersLocationsListResponse {
  data?: HandlersLocationDTO[];
  /** @example "Locations retrieved successfully" */
  message: string;
  /** @example true */
  success: boolean;
}

export interface HandlersLoginData {
  /** @example 900 */
  access_expires_in: number;
  /** @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." */
  access_token: string;
  /** @example "550e8400-e29b-41d4-a716-446655440000" */
  id: string;
  /** @example "+77771234567" */
  phone: string;
  /** @example 2592000 */
  refresh_expires_in: number;
  /** @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." */
  refresh_token: string;
}

export interface HandlersLoginRequest {
  /** @example "password123" */
  password: string;
  /** @example "+77771234567" */
  phone: string;
}

export interface HandlersLoginResponse {
  data?: HandlersLoginData;
  /** @example "Login successful" */
  message: string;
  /** @example true */
  success: boolean;
}

export interface HandlersPaginatedAuditLogResponse {
  data?: ModelsAdminAuditLog[];
  /** @example "Audit logs retrieved successfully" */
  message?: string;
  pagination?: HandlersPaginationMeta;
  /** @example true */
  success?: boolean;
}

export interface HandlersPaginationMeta {
  /** @example 1 */
  current_page?: number;
  /** @example 1 */
  last_page?: number;
  /** @example 100 */
  per_page?: number;
  /** @example 100 */
  total?: number;
}

export interface HandlersPhoneAvailabilityResponse {
  /**
   * true if phone is available, false if already in use
   * @example true
   */
  available: boolean;
  /** @example "Phone availability checked" */
  message: string;
  /** @example true */
  success: boolean;
}

export interface HandlersRefreshData {
  /** @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." */
  access_token: string;
}

export interface HandlersRefreshRequest {
  /** @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." */
  refresh_token: string;
}

export interface HandlersRefreshResponse {
  data?: HandlersRefreshData;
  /** @example "Token refreshed successfully" */
  message: string;
  /** @example true */
  success: boolean;
}

export interface HandlersRegisterData {
  /** @example "550e8400-e29b-41d4-a716-446655440000" */
  id: string;
  /** @example "+77771234567" */
  phone: string;
}

export interface HandlersRegisterRequest {
  /**
   * @minLength 6
   * @example "password123"
   */
  password: string;
  /** @example "+77771234567" */
  phone: string;
}

export interface HandlersRegisterResponse {
  data?: HandlersRegisterData;
  /** @example "User registered successfully" */
  message: string;
  /** @example true */
  success: boolean;
}

export interface HandlersUpdateAdminRequest {
  /**
   * @minLength 6
   * @example "newpassword123"
   */
  password?: string;
  /** @example "regular" */
  role?: string;
  /** @example "newusername" */
  username?: string;
}

export interface HandlersUpdateContactRequest {
  /** @example "г. Бишкек, проспект Чуй, 135" */
  address: string;
  /** @example "support@ololo.com" */
  email_support: string;
  /** @example 77091234567 */
  support_number: number;
}

export interface HandlersUpdateUserRequest {
  /** Optional - if provided, will reassign user to these locations and gates */
  locations?: HandlersLocationAssignmentRequest[];
  /**
   * Optional - only updates if provided
   * @minLength 6
   * @example "newpassword123"
   */
  password?: string;
  /**
   * Optional - if provided, will update phone number after checking availability
   * @example "+77771234567"
   */
  phone?: string;
}

export interface HandlersUserDTO {
  /** @example "2025-01-15T10:30:00Z" */
  created_at: string;
  /** @example "550e8400-e29b-41d4-a716-446655440000" */
  id: string;
  /** @example "+77771234567" */
  phone: string;
  /** @example "2025-01-15T10:30:00Z" */
  updated_at: string;
}

export interface HandlersUserData {
  /** @example "550e8400-e29b-41d4-a716-446655440000" */
  id: string;
  /** @example "+77771234567" */
  phone: string;
}

export interface HandlersUserDetailDTO {
  /** @example "2025-01-15T10:30:00Z" */
  created_at: string;
  /** @example "550e8400-e29b-41d4-a716-446655440000" */
  id: string;
  locations: HandlersLocationDTO[];
  /** @example "+77771234567" */
  phone: string;
  /** @example "2025-01-15T10:30:00Z" */
  updated_at: string;
}

export interface HandlersUserDetailResponse {
  data?: HandlersUserDetailDTO;
  /** @example "User retrieved successfully" */
  message: string;
  /** @example true */
  success: boolean;
}

export interface HandlersUserResponse {
  data?: HandlersUserData;
  /** @example "User created successfully" */
  message: string;
  /** @example true */
  success: boolean;
}

export interface HandlersUsersListResponse {
  data?: HandlersUserDTO[];
  /** @example "Users retrieved successfully" */
  message: string;
  pagination?: HandlersPaginationMeta;
  /** @example true */
  success: boolean;
}

export interface ModelsAdminAuditLog {
  /** "create_user", "update_user", "delete_user", "create_admin", "delete_admin", "update_contact", etc. */
  action?: string;
  /** Who performed the action */
  admin_id?: string;
  /** Admin username for quick access (denormalized) */
  admin_name?: string;
  created_at?: string;
  /** JSON with request details (what was changed) */
  details?: string;
  /** Error message if failed */
  error_message?: string;
  id?: string;
  /** Request IP address */
  ip_address?: string;
  /** UUID or ID of affected resource */
  resource_id?: string;
  /** "user", "admin", "contact", etc. */
  resource_type?: string;
  /** "success" or "failed" */
  status?: string;
  /** Request user agent */
  user_agent?: string;
}
