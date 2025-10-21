import {
  List,
  Datagrid,
  TextField,
  DateField,
  Create,
  SimpleForm,
  TextInput,
  Edit,
  required,
  useRecordContext,
  useNotify,
  useRefresh,
  useRedirect,
  Pagination,
  SearchInput,
} from "react-admin";
import { Box, Typography } from "@mui/material";
import FormToolbarWithCancel from "./components/FormToolbarWithCancel";

// User search filter
const UserFilter = [
  <SearchInput source="search" placeholder="Search" alwaysOn />,
];

// Custom pagination component
const UserPagination = () => (
  <Pagination rowsPerPageOptions={[5, 10, 25, 50]} />
);

// List all users
export const UserList = () => (
  <List filters={UserFilter} pagination={<UserPagination />}>
    <Datagrid rowClick="edit">
      <TextField source="phone" label="Phone Number" />
      <DateField source="created_at" label="Created At" showTime />
    </Datagrid>
  </List>
);

// Create new user
export const UserCreate = () => {
  const notify = useNotify();
  const refresh = useRefresh();
  const redirect = useRedirect();

  const onSuccess = () => {
    notify("User created successfully", { type: "success" });
    redirect("/users");
    refresh();
  };

  const onError = (error: any) => {
    notify(error.message || "Error creating user", { type: "error" });
  };

  return (
    <Create mutationOptions={{ onSuccess, onError }}>
      <SimpleForm>
        <Typography variant="h6" gutterBottom>
          Create New User
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
            source="phone"
            label="Phone Number"
            helperText="Format: +77771234567 (E.164 international format)"
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
        </Box>
      </SimpleForm>
    </Create>
  );
};

// Edit user (only password can be updated)
export const UserEdit = () => {
  const notify = useNotify();
  const refresh = useRefresh();
  const redirect = useRedirect();

  const onSuccess = () => {
    notify(
      "User password updated successfully. All user tokens have been invalidated.",
      {
        type: "success",
      },
    );
    redirect("/users");
    refresh();
  };

  const onError = (error: any) => {
    notify(error.message || "Error updating user", { type: "error" });
  };

  return (
    <Edit mutationOptions={{ onSuccess, onError }}>
      <SimpleForm
        toolbar={<FormToolbarWithCancel redirectTo="/users" variant="edit" />}
      >
        <UserTitle />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
            maxWidth: 500,
          }}
        >
          <TextField source="phone" label="Phone Number" />
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ marginTop: 2, marginBottom: 1 }}
          >
            Update Password (this will invalidate all user tokens)
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

const UserTitle = () => {
  const record = useRecordContext();
  return <span>Edit User: {record ? record.phone : ""}</span>;
};
