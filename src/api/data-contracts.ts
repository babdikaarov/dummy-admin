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

export interface HandlersLoginData {
  /** @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." */
  access_token: string;
  /** @example "+77771234567" */
  phone: string;
  /** @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." */
  refresh_token: string;
  /** @example "550e8400-e29b-41d4-a716-446655440000" */
  user_id: string;
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
  /** @example "+77771234567" */
  phone: string;
  /** @example "550e8400-e29b-41d4-a716-446655440000" */
  user_id: string;
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

export interface HandlersUpdateUserPasswordRequest {
  /**
   * @minLength 6
   * @example "newpassword123"
   */
  password: string;
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
  /** @example "+77771234567" */
  phone: string;
  /** @example "550e8400-e29b-41d4-a716-446655440000" */
  user_id: string;
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
