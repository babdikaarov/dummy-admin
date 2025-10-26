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

import {
  HandlersAPIResponse,
  HandlersAdminDetailResponse,
  HandlersAdminLoginRequest,
  HandlersAdminLoginResponse,
  HandlersAdminResponse,
  HandlersAdminsListResponse,
  HandlersAuditLogDetailResponse,
  HandlersAvailableLocationsResponse,
  HandlersContactResponse,
  HandlersCreateAdminRequest,
  HandlersCreateUserRequest,
  HandlersGateActionResponse,
  HandlersGatesListResponse,
  HandlersLocationsListResponse,
  HandlersLoginRequest,
  HandlersLoginResponse,
  HandlersPaginatedAuditLogResponse,
  HandlersPhoneAvailabilityResponse,
  HandlersRefreshRequest,
  HandlersRefreshResponse,
  HandlersRegisterRequest,
  HandlersRegisterResponse,
  HandlersUpdateAdminRequest,
  HandlersUpdateContactRequest,
  HandlersUpdateUserRequest,
  HandlersUserDetailResponse,
  HandlersUserResponse,
  HandlersUsersListResponse,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Api<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Retrieve audit logs of admin actions (super admin only). Returns paginated list of all administrative operations.
   *
   * @tags Admin Audit Logs
   * @name V1AdminAuditLogsList
   * @summary Get admin audit logs
   * @request GET:/api/v1/admin/audit-logs
   * @secure
   */
  v1AdminAuditLogsList = (
    query?: {
      /**
       * Page number
       * @default 1
       */
      page?: number;
      /**
       * Items per page
       * @default 20
       */
      limit?: number;
      /** Filter by admin ID */
      admin_id?: string;
      /** Filter by action type */
      action?: string;
      /** Filter by resource type */
      resource_type?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<HandlersPaginatedAuditLogResponse, HandlersAPIResponse>({
      path: `/api/v1/admin/audit-logs`,
      method: "GET",
      query: query,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Retrieve a specific audit log entry by ID (super admin only)
   *
   * @tags Admin Audit Logs
   * @name V1AdminAuditLogsDetail
   * @summary Get audit log by ID
   * @request GET:/api/v1/admin/audit-logs/{id}
   * @secure
   */
  v1AdminAuditLogsDetail = (id: string, params: RequestParams = {}) =>
    this.request<HandlersAuditLogDetailResponse, HandlersAPIResponse>({
      path: `/api/v1/admin/audit-logs/${id}`,
      method: "GET",
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Authenticate admin with username and password, returns permanent access token (no expiry)
   *
   * @tags Admin Authentication
   * @name V1AdminLoginCreate
   * @summary Admin login
   * @request POST:/api/v1/admin/login
   */
  v1AdminLoginCreate = (
    request: HandlersAdminLoginRequest,
    params: RequestParams = {},
  ) =>
    this.request<HandlersAdminLoginResponse, HandlersAPIResponse>({
      path: `/api/v1/admin/login`,
      method: "POST",
      body: request,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Retrieve a list of all admin accounts with pagination, search, filtering, and ordering (super admin only)
   *
   * @tags Admin User Management
   * @name V1AdminUsersList
   * @summary Get all admin users
   * @request GET:/api/v1/admin/users
   * @secure
   */
  v1AdminUsersList = (
    query?: {
      /** Page number (default: 1) */
      page?: number;
      /** Records per page (default: 500) */
      limit?: number;
      /** Search by username */
      search?: string;
      /** Filter by role (super or regular) */
      role?: string;
      /** Order results by created_at (ASC or DESC, default: DESC) */
      order?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<HandlersAdminsListResponse, HandlersAPIResponse>({
      path: `/api/v1/admin/users`,
      method: "GET",
      query: query,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Create a new admin account with specified role (super admin only)
   *
   * @tags Admin User Management
   * @name V1AdminUsersCreate
   * @summary Create a new admin user
   * @request POST:/api/v1/admin/users
   * @secure
   */
  v1AdminUsersCreate = (
    request: HandlersCreateAdminRequest,
    params: RequestParams = {},
  ) =>
    this.request<HandlersAdminResponse, HandlersAPIResponse>({
      path: `/api/v1/admin/users`,
      method: "POST",
      body: request,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Retrieve a specific admin's details by ID. Super admins can retrieve any admin. Regular admins can only retrieve their own details.
   *
   * @tags Admin User Management
   * @name V1AdminUsersDetail
   * @summary Get admin by ID
   * @request GET:/api/v1/admin/users/{id}
   * @secure
   */
  v1AdminUsersDetail = (id: string, params: RequestParams = {}) =>
    this.request<HandlersAdminDetailResponse, HandlersAPIResponse>({
      path: `/api/v1/admin/users/${id}`,
      method: "GET",
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Delete an admin account by ID (soft delete, super admin only)
   *
   * @tags Admin User Management
   * @name V1AdminUsersDelete
   * @summary Delete an admin user
   * @request DELETE:/api/v1/admin/users/{id}
   * @secure
   */
  v1AdminUsersDelete = (id: string, params: RequestParams = {}) =>
    this.request<HandlersAdminResponse, HandlersAPIResponse>({
      path: `/api/v1/admin/users/${id}`,
      method: "DELETE",
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Update an admin's details (password, username, and/or role). Super admins can update any admin. Regular admins can only update their own password and username (not role).
   *
   * @tags Admin User Management
   * @name V1AdminUsersPartialUpdate
   * @summary Update admin details
   * @request PATCH:/api/v1/admin/users/{id}
   * @secure
   */
  v1AdminUsersPartialUpdate = (
    id: string,
    request: HandlersUpdateAdminRequest,
    params: RequestParams = {},
  ) =>
    this.request<HandlersAdminResponse, HandlersAPIResponse>({
      path: `/api/v1/admin/users/${id}`,
      method: "PATCH",
      body: request,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Check if a phone number is available for registration or account creation (public endpoint, no authentication required)
   *
   * @tags User Authentication
   * @name V1AuthCheckPhoneList
   * @summary Check if phone number is available for registration
   * @request GET:/api/v1/auth/check-phone
   */
  v1AuthCheckPhoneList = (
    query: {
      /** Phone number in E.164 format (e.g., +77771234567) */
      phone: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<HandlersPhoneAvailabilityResponse, HandlersAPIResponse>({
      path: `/api/v1/auth/check-phone`,
      method: "GET",
      query: query,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Authenticate user with phone and password, returns access and refresh tokens
   *
   * @tags User Authentication
   * @name V1AuthLoginCreate
   * @summary User login
   * @request POST:/api/v1/auth/login
   */
  v1AuthLoginCreate = (
    request: HandlersLoginRequest,
    params: RequestParams = {},
  ) =>
    this.request<HandlersLoginResponse, HandlersAPIResponse>({
      path: `/api/v1/auth/login`,
      method: "POST",
      body: request,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Exchange a valid refresh token for a new access token
   *
   * @tags User Authentication
   * @name V1AuthRefreshCreate
   * @summary Refresh access token
   * @request POST:/api/v1/auth/refresh
   */
  v1AuthRefreshCreate = (
    request: HandlersRefreshRequest,
    params: RequestParams = {},
  ) =>
    this.request<HandlersRefreshResponse, HandlersAPIResponse>({
      path: `/api/v1/auth/refresh`,
      method: "POST",
      body: request,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Register a new user account with phone number and password (E.164 format required)
   *
   * @tags User Authentication
   * @name V1AuthRegisterCreate
   * @summary Register a new user
   * @request POST:/api/v1/auth/register
   */
  v1AuthRegisterCreate = (
    request: HandlersRegisterRequest,
    params: RequestParams = {},
  ) =>
    this.request<HandlersRegisterResponse, HandlersAPIResponse>({
      path: `/api/v1/auth/register`,
      method: "POST",
      body: request,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Fetch all locations from third-party API without filtering by user (admin access only)
   *
   * @tags Location Management
   * @name V1AvailableLocationsList
   * @summary Get all available locations in the system
   * @request GET:/api/v1/available-locations
   * @secure
   */
  v1AvailableLocationsList = (params: RequestParams = {}) =>
    this.request<HandlersAvailableLocationsResponse, HandlersAPIResponse>({
      path: `/api/v1/available-locations`,
      method: "GET",
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Retrieve the application's contact information (public endpoint, no authentication required). Returns empty values if contact information has not been set.
   *
   * @tags Contact Information
   * @name V1ContactsList
   * @summary Get contact information
   * @request GET:/api/v1/contacts
   */
  v1ContactsList = (params: RequestParams = {}) =>
    this.request<HandlersContactResponse, HandlersAPIResponse>({
      path: `/api/v1/contacts`,
      method: "GET",
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Update or create the application's contact information (admin only). Creates a new contact record if one doesn't exist.
   *
   * @tags Contact Information
   * @name V1ContactsPartialUpdate
   * @summary Update contact information
   * @request PATCH:/api/v1/contacts
   * @secure
   */
  v1ContactsPartialUpdate = (
    request: HandlersUpdateContactRequest,
    params: RequestParams = {},
  ) =>
    this.request<HandlersContactResponse, HandlersAPIResponse>({
      path: `/api/v1/contacts`,
      method: "PATCH",
      body: request,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Fetch all locations from third-party API based on user's phone with their gates
   *
   * @tags Gate Management
   * @name V1LocationsList
   * @summary Get all locations accessible to the current user
   * @request GET:/api/v1/locations
   * @secure
   */
  v1LocationsList = (params: RequestParams = {}) =>
    this.request<HandlersLocationsListResponse, HandlersAPIResponse>({
      path: `/api/v1/locations`,
      method: "GET",
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Send command to close a specific gate to third-party API
   *
   * @tags Gate Management
   * @name V1LocationsCloseUpdate
   * @summary Close a gate
   * @request PUT:/api/v1/locations/{gateId}/close
   * @secure
   */
  v1LocationsCloseUpdate = (gateId: number, params: RequestParams = {}) =>
    this.request<HandlersGateActionResponse, HandlersAPIResponse>({
      path: `/api/v1/locations/${gateId}/close`,
      method: "PUT",
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Send command to open a specific gate to third-party API
   *
   * @tags Gate Management
   * @name V1LocationsOpenUpdate
   * @summary Open a gate
   * @request PUT:/api/v1/locations/{gateId}/open
   * @secure
   */
  v1LocationsOpenUpdate = (gateId: number, params: RequestParams = {}) =>
    this.request<HandlersGateActionResponse, HandlersAPIResponse>({
      path: `/api/v1/locations/${gateId}/open`,
      method: "PUT",
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Fetch all gates accessible to the current user for a specific location from third-party API
   *
   * @tags Gate Management
   * @name V1LocationsGatesList
   * @summary Get all gates for a specific location
   * @request GET:/api/v1/locations/{locationId}/gates
   * @secure
   */
  v1LocationsGatesList = (locationId: number, params: RequestParams = {}) =>
    this.request<HandlersGatesListResponse, HandlersAPIResponse>({
      path: `/api/v1/locations/${locationId}/gates`,
      method: "GET",
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Retrieve a list of all registered users with pagination and search (requires admin authentication)
   *
   * @tags User Management
   * @name V1UsersList
   * @summary Get all users
   * @request GET:/api/v1/users
   * @secure
   */
  v1UsersList = (
    query?: {
      /** Page number (default: 1) */
      page?: number;
      /** Records per page (default: 500) */
      limit?: number;
      /** Search by phone number */
      search?: string;
      /** Order results by created_at (ASC or DESC, default: DESC) */
      order?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<HandlersUsersListResponse, HandlersAPIResponse>({
      path: `/api/v1/users`,
      method: "GET",
      query: query,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Create a new user account and assign locations and gates via third-party API (requires admin authentication)
   *
   * @tags User Management
   * @name V1UsersCreate
   * @summary Create a new user with location and gate assignment
   * @request POST:/api/v1/users
   * @secure
   */
  v1UsersCreate = (
    request: HandlersCreateUserRequest,
    params: RequestParams = {},
  ) =>
    this.request<HandlersUserResponse, HandlersAPIResponse>({
      path: `/api/v1/users`,
      method: "POST",
      body: request,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Retrieve a specific user's details by ID including their assigned locations and gates from third-party API (requires admin authentication)
   *
   * @tags User Management
   * @name V1UsersDetail
   * @summary Get user by ID with assigned locations and gates
   * @request GET:/api/v1/users/{id}
   * @secure
   */
  v1UsersDetail = (id: string, params: RequestParams = {}) =>
    this.request<HandlersUserDetailResponse, HandlersAPIResponse>({
      path: `/api/v1/users/${id}`,
      method: "GET",
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Delete a user account by ID (soft delete, requires admin authentication)
   *
   * @tags User Management
   * @name V1UsersDelete
   * @summary Delete a user
   * @request DELETE:/api/v1/users/{id}
   * @secure
   */
  v1UsersDelete = (id: string, params: RequestParams = {}) =>
    this.request<HandlersUserResponse, HandlersAPIResponse>({
      path: `/api/v1/users/${id}`,
      method: "DELETE",
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Update a user's password (optional) and reassign locations and gates via third-party API (requires admin authentication)
   *
   * @tags User Management
   * @name V1UsersPartialUpdate
   * @summary Update user password and location/gate assignments
   * @request PATCH:/api/v1/users/{id}
   * @secure
   */
  v1UsersPartialUpdate = (
    id: string,
    request: HandlersUpdateUserRequest,
    params: RequestParams = {},
  ) =>
    this.request<HandlersUserResponse, HandlersAPIResponse>({
      path: `/api/v1/users/${id}`,
      method: "PATCH",
      body: request,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
