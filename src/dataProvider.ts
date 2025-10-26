// src/providers/dataProvider.ts
import { DataProvider } from "ra-core";
import { axiosClient } from "./clientProvider";
import {
  HandlersCreateAdminRequest,
  HandlersCreateUserRequest,
  HandlersUpdateAdminRequest,
  HandlersUpdateUserRequest,
  HandlersUpdateContactRequest,
} from "./api/data-contracts";

// React Admin DataProvider for your Go backend API
const dataProvider: DataProvider = {
  // GET /resource
  // @ts-expect-error generic type compatibility
  getList: async (resource, params) => {
    const pagination = params?.pagination || { page: 1, perPage: 10 };
    const filter = params?.filter || {};
    const sort = params?.sort;
    switch (resource) {
      case "users": {
        const { data } = await axiosClient.v1UsersList({
          page: pagination.page,
          limit: pagination.perPage,
          search: filter.search || undefined,
          order: sort?.order || undefined,
        });
        return {
          data: (data.data || []) as unknown as Record<string, unknown>[],
          total: data.pagination?.total || 0,
        };
      }
      case "admins": {
        const { data } = await axiosClient.v1AdminUsersList({
          page: pagination.page,
          limit: pagination.perPage,
          search: filter.search || undefined,
          role: filter.role || undefined,
          order: sort?.order || undefined,
        });
        return {
          data: (data.data || []) as unknown as Record<string, unknown>[],
          total: data.pagination?.total || 0,
        };
      }
      case "contacts": {
        const { data } = await axiosClient.v1ContactsList();
        // Since contacts returns a single object, wrap it in an array for list view
        // Assign a static ID "1" since contacts is a singleton resource
        return {
          data: data.data
            ? [{ id: 1, ...(data.data as unknown as Record<string, unknown>) }]
            : [],
          total: 1,
        };
      }
      case "available-locations": {
        const { data } = await axiosClient.v1AvailableLocationsList();
        return {
          data: (data.data || []) as unknown as Record<string, unknown>[],
          total: (data.data || []).length,
        };
      }
      default:
        throw new Error(`Unknown resource: ${resource}`);
    }
  },

  // GET /resource/:id
  // @ts-expect-error generic type compatibility
  getOne: async (resource, params) => {
    switch (resource) {
      case "users": {
        const { data } = await axiosClient.v1UsersDetail(String(params.id));
        return {
          data: data.data || {},
        };
      }
      case "admins": {
        const { data } = await axiosClient.v1AdminUsersDetail(
          String(params.id),
        );
        return {
          data: data.data || {},
        };
      }
      case "contacts": {
        const { data } = await axiosClient.v1ContactsList();
        return {
          data: data.data
            ? { id: 1, ...(data.data as unknown as Record<string, unknown>) }
            : { id: 1 },
        };
      }
      default:
        throw new Error(`Unknown resource: ${resource}`);
    }
  },

  // POST /resource
  // @ts-expect-error generic type compatibility
  create: async (resource, params) => {
    switch (resource) {
      case "users": {
        const { data } = await axiosClient.v1UsersCreate(
          params.data as HandlersCreateUserRequest,
        );
        return { data: { id: data.data?.id, ...data.data } };
      }
      case "admins": {
        const { data } = await axiosClient.v1AdminUsersCreate(
          params.data as HandlersCreateAdminRequest,
        );
        return { data: { id: data.data?.id, ...data.data } };
      }
      default:
        throw new Error(`Unknown resource: ${resource}`);
    }
  },

  // PUT /resource/:id
  // @ts-expect-error generic type compatibility
  update: async (resource, params) => {
    switch (resource) {
      case "users": {
        const { data } = await axiosClient.v1UsersPartialUpdate(
          params.id,
          params.data as HandlersUpdateUserRequest,
        );
        return { data: { id: data.data?.id, ...data.data } };
      }
      case "admins": {
        const { data } = await axiosClient.v1AdminUsersPartialUpdate(
          params.id,
          params.data as HandlersUpdateAdminRequest,
        );
        return { data: { id: data.data?.id, ...data.data } };
      }
      case "contacts": {
        const { data } = await axiosClient.v1ContactsPartialUpdate(
          params.data as HandlersUpdateContactRequest,
        );
        return { data: { id: 1, ...data.data } };
      }
      default:
        throw new Error(`Unknown resource: ${resource}`);
    }
  },

  // DELETE /resource/:id
  // @ts-expect-error generic type compatibility
  delete: async (resource, params) => {
    switch (resource) {
      case "users": {
        const { data } = await axiosClient.v1UsersDelete(String(params.id));
        return { data: { id: params.id, ...data.data } };
      }
      case "admins": {
        const { data } = await axiosClient.v1AdminUsersDelete(
          String(params.id),
        );
        return { data: { id: params.id, ...data.data } };
      }
      default:
        throw new Error(`Unknown resource: ${resource}`);
    }
  },

  // Unsupported for now
  getMany: async () => Promise.resolve({ data: [] }),
  getManyReference: async () => Promise.resolve({ data: [], total: 0 }),
  updateMany: async () => Promise.resolve({ data: [] }),
  deleteMany: async () => Promise.resolve({ data: [] }),
};

export default dataProvider;
