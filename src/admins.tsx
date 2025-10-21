import {
  List,
  Datagrid,
  TextField,
  Create,
  SimpleForm,
  TextInput,
  Edit,
  SelectInput,
  required,
  useRecordContext,
  useNotify,
  useRefresh,
  useRedirect,
  usePermissions,
  ChipField,
  Pagination,
  SearchInput,
} from "react-admin";
import { Box, Typography } from "@mui/material";
import FormToolbarWithCancel from "./components/FormToolbarWithCancel";
import { useParams } from "react-router";

// Admin search filter
const AdminFilter = [
  <SearchInput source="search" placeholder="Search" alwaysOn />,
];

// Custom pagination component
const AdminPagination = () => (
  <Pagination rowsPerPageOptions={[5, 10, 25, 50]} />
);

// List all admins (super admin only)
export const AdminList = () => {
  const { permissions } = usePermissions();

  // Only super admins can access this resource
  if (permissions !== "super") {
    return (
      <Box sx={{ padding: 3 }}>
        <Typography variant="h6" color="error">
          Access Denied: Only super admins can manage admins.
        </Typography>
      </Box>
    );
  }

  const currentAdminId = localStorage.getItem("id");

  const isRowSelectable = (record: any) => {
    return record.id !== currentAdminId;
  };

  return (
    <List filters={AdminFilter} pagination={<AdminPagination />}>
      <Datagrid rowClick="edit" isRowSelectable={isRowSelectable}>
        <TextField source="username" label="Admin name" />
        <ChipField
          source="role"
          label="Role"
          sx={{
            "& .MuiChip-root": {
              backgroundColor: (theme) =>
                theme.palette.mode === "light" ? "#e3f2fd" : "#1e3a5f",
            },
          }}
        />
      </Datagrid>
    </List>
  );
};

// Create new admin (super admin only)
export const AdminCreate = () => {
  const { permissions } = usePermissions();
  const notify = useNotify();
  const refresh = useRefresh();
  const redirect = useRedirect();

  const onSuccess = () => {
    notify("Admin created successfully", { type: "success" });
    redirect("/admins");
    refresh();
  };

  const onError = (error: any) => {
    notify(error.message || "Error creating admin", { type: "error" });
  };

  if (permissions !== "super") {
    return (
      <Box sx={{ padding: 3 }}>
        <Typography variant="h6" color="error">
          Access Denied: Only super admins can create admins.
        </Typography>
      </Box>
    );
  }

  return (
    <Create mutationOptions={{ onSuccess, onError }}>
      <SimpleForm toolbar={<FormToolbarWithCancel redirectTo="/admins" />}>
        <Typography variant="h6" gutterBottom>
          Create New Admin
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
            maxWidth: 500,
          }}
        >
          <TextInput
            source="username"
            label="Admin name"
            validate={[required()]}
            fullWidth
          />
          <TextInput
            source="password"
            label="Password"
            type="password"
            validate={[required()]}
            fullWidth
          />
          <SelectInput
            source="role"
            label="Role"
            choices={[
              { id: "super", name: "Super Admin" },
              { id: "regular", name: "Regular Admin" },
            ]}
            validate={[required()]}
            fullWidth
          />
        </Box>
      </SimpleForm>
    </Create>
  );
};

// Edit admin (super admin only, password update only)
export const AdminEdit = () => {
  const { id } = useParams();
  const { permissions } = usePermissions();
  const notify = useNotify();
  const refresh = useRefresh();
  const redirect = useRedirect();
  const userId = localStorage.getItem("id");
  const onSuccess = () => {
    notify("Admin password updated successfully", { type: "success" });
    redirect("/admins");
    refresh();
  };
  const onError = (error: any) => {
    notify(error.message || "Error updating admin", { type: "error" });
  };
  const canEdit = id === userId || permissions === "super";

  if (!canEdit) {
    return (
      <Box sx={{ padding: 3 }}>
        <Typography variant="h6" color="error">
          Access Denied: Only super admins can edit admins.
        </Typography>
      </Box>
    );
  }

  return (
    <Edit mutationOptions={{ onSuccess, onError }} title={<AdminTitle />}>
      <SimpleForm
        toolbar={
          <FormToolbarWithCancel
            redirectTo="/admins"
            variant={id === userId ? undefined : "edit"}
          />
        }
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
            maxWidth: 500,
          }}
        >
          <TextField source="username" label="Admin name" />
          <TextField source="role" label="Role" />
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ marginTop: 2, marginBottom: 1 }}
          >
            Update Password
          </Typography>
          <TextInput
            source="password"
            label="New Password"
            type="password"
            validate={[required()]}
            fullWidth
          />
        </Box>
      </SimpleForm>
    </Edit>
  );
};

const AdminTitle = () => {
  const record = useRecordContext();
  return <span>Edit Admin: {record ? record.username : ""}</span>;
};
