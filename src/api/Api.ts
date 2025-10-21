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
  HandlersCreateAdminRequest,
  HandlersLoginRequest,
  HandlersLoginResponse,
  HandlersRefreshRequest,
  HandlersRefreshResponse,
  HandlersRegisterRequest,
  HandlersRegisterResponse,
  HandlersUpdateAdminRequest,
  HandlersUpdateUserPasswordRequest,
  HandlersUserResponse,
  HandlersUsersListResponse,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Api<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
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
   * @description Create a new user account (requires admin authentication)
   *
   * @tags User Management
   * @name V1UsersCreate
   * @summary Create a new user
   * @request POST:/api/v1/users
   * @secure
   */
  v1UsersCreate = (
    request: HandlersRegisterRequest,
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
   * @description Retrieve a specific user's details by ID (requires admin authentication)
   *
   * @tags User Management
   * @name V1UsersDetail
   * @summary Get user by ID
   * @request GET:/api/v1/users/{id}
   * @secure
   */
  v1UsersDetail = (id: string, params: RequestParams = {}) =>
    this.request<HandlersUserResponse, HandlersAPIResponse>({
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
   * @description Update a user's password and invalidate all their existing tokens (requires admin authentication)
   *
   * @tags User Management
   * @name V1UsersPartialUpdate
   * @summary Update user password
   * @request PATCH:/api/v1/users/{id}
   * @secure
   */
  v1UsersPartialUpdate = (
    id: string,
    request: HandlersUpdateUserPasswordRequest,
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
