import {
  List,
  Datagrid,
  TextField,
  DateField,
  Create,
  TabbedForm,
  FormTab,
  TextInput,
  Edit,
  required,
  useRecordContext,
  useNotify,
  useRefresh,
  useRedirect,
  Pagination,
  SearchInput,
  useDataProvider,
} from "react-admin";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import FormToolbarWithCancel from "./components/FormToolbarWithCancel";
import { LocationGateTreeSelect } from "./components/LocationGateTreeSelect";
import { groupGatesByLocation } from "./utils/locationGateHelpers";
import { HandlersLocationDTO } from "./api/data-contracts";

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

// Create new user with TabbedForm
export const UserCreate = () => {
  const notify = useNotify();
  const refresh = useRefresh();
  const redirect = useRedirect();
  const dataProvider = useDataProvider();
  const [availableLocations, setAvailableLocations] = useState<
    HandlersLocationDTO[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch available locations on component mount
    dataProvider
      .getList("available-locations", {
        pagination: { page: 1, perPage: 1000 },
      })
      .then((response) => {
        setAvailableLocations(response.data as HandlersLocationDTO[]);
        setLoading(false);
      })
      .catch((error) => {
        notify("Failed to load locations", { type: "error" });
        console.error(error);
        setLoading(false);
      });
  }, [dataProvider, notify]);

  const onSuccess = () => {
    notify("User created successfully", { type: "success" });
    redirect("/users");
    refresh();
  };

  const onError = (error: Error) => {
    notify(error.message || "Error creating user", { type: "error" });
  };

  const handleTransform = (data: Record<string, unknown>) => {
    // Transform form data to match API requirements
    const gateIds = (data.selectedGateIds as number[]) || [];
    const locations = groupGatesByLocation(gateIds, availableLocations);
    return {
      phone: data.phone,
      password: data.password,
      locations: locations.length > 0 ? locations : undefined,
    };
  };

  return (
    <Create
      mutationOptions={{ onSuccess, onError }}
      transform={handleTransform}
    >
      <TabbedForm>
        {/* Basic Information Tab */}
        <FormTab label="Basic Information">
          <TextInput
            source="phone"
            slotProps={{ htmlInput: { autoComplete: "off" } }}
            label="Phone Number"
            helperText="Format: +77771234567 (E.164 international format)"
            validate={[required()]}
            fullWidth
          />
          <TextInput
            slotProps={{ htmlInput: { autoComplete: "off" } }}
            source="password"
            label="Password"
            type="password"
            validate={[required()]}
            fullWidth
          />
        </FormTab>

        {/* Location & Gates Tab */}
        <FormTab label="Location & Gates">
          {loading ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 400,
                gap: 2,
              }}
            >
              <CircularProgress />
              <Typography variant="body2" color="text.secondary">
                Loading available locations...
              </Typography>
            </Box>
          ) : (
            <LocationGateTreeSelect
              source="selectedGateIds"
              label="Select Gates"
              availableLocations={availableLocations}
            />
          )}
        </FormTab>
      </TabbedForm>
    </Create>
  );
};

// Edit user - can update phone, password, and location/gate assignments
export const UserEdit = () => {
  const notify = useNotify();
  const dataProvider = useDataProvider();
  const [availableLocations, setAvailableLocations] = useState<
    HandlersLocationDTO[]
  >([]);
  const [loading, setLoading] = useState(true);

  // Fetch available locations once on component mount
  useEffect(() => {
    dataProvider
      .getList("available-locations", {
        pagination: { page: 1, perPage: 1000 },
      })
      .then((locationsResponse) => {
        const locations = locationsResponse.data as HandlersLocationDTO[];
        setAvailableLocations(locations);
        setLoading(false);
      })
      .catch((error: Error) => {
        notify("Failed to load locations", { type: "error" });
        console.error(error);
        setLoading(false);
      });
  }, [dataProvider, notify]);

  const handleTransform = (
    data: Record<string, unknown>,
    // context?: { previousData?: Record<string, unknown> },
  ) => {
    // const { previousData } = context || {};

    // Extract gateIds
    const gateIds = (data.selectedGateIds as number[]) || [];
    const locations = groupGatesByLocation(gateIds, availableLocations);

    // Build transformed payload
    const transformed: Record<string, unknown> = {
      password: data.password, // optional
      locations: locations.length > 0 ? locations : undefined,
    };

    // Only include phone if it changed
    // if (data.phone && data.phone !== previousData?.phone) {
    //   transformed.phone = data.phone;
    // }

    return transformed;
  };

  return (
    <Edit
      mutationMode="pessimistic"
      transform={handleTransform}
      redirect="edit"
    >
      <TabbedForm
        toolbar={<FormToolbarWithCancel redirectTo="/users" variant="edit" />}
      >
        {/* Location & Gates Tab */}
        <FormTab label="Location & Gates">
          <UserEditGatesTab
            availableLocations={availableLocations}
            loading={loading}
          />
        </FormTab>
        {/* Basic Information Tab */}
        <FormTab label="Basic Information">
          <UserTitle />
          {/* <TextInput
            slotProps={{ htmlInput: { autoComplete: "off" } }}
            source="phone"
            label="Phone Number"
            helperText="Format: +77771234567 (E.164 international format)"
            fullWidth
          /> */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ marginTop: 2, marginBottom: 1 }}
          >
            Update Password (optional - this will invalidate all user tokens)
          </Typography>
          <TextInput
            source="password"
            slotProps={{ htmlInput: { autoComplete: "off" } }}
            label="New Password"
            type="password"
            fullWidth
          />
        </FormTab>
      </TabbedForm>
    </Edit>
  );
};

// Separate component for the Gates Tab with useInput integration
interface UserEditGatesTabProps {
  availableLocations: HandlersLocationDTO[];
  loading: boolean;
}

const UserEditGatesTab: React.FC<UserEditGatesTabProps> = ({
  availableLocations,
  loading,
}) => {
  const record = useRecordContext();

  // Get the user's currently assigned locations from the record
  const userAssignedLocations =
    (record?.locations as HandlersLocationDTO[]) || [];

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 400,
          gap: 2,
        }}
      >
        <CircularProgress />
        <Typography variant="body2" color="text.secondary">
          Loading available locations...
        </Typography>
      </Box>
    );
  }

  return (
    <LocationGateTreeSelect
      source="selectedGateIds"
      label="Select Gates"
      availableLocations={availableLocations}
      cardDataLocations={userAssignedLocations}
    />
  );
};

const UserTitle = () => {
  const record = useRecordContext();
  return <span>Edit User: {record ? record.phone : ""}</span>;
};
