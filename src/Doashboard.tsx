import {
  Card,
  CardContent,
  Typography,
  TextField,
  Box,
  Button,
  ListItemButton,
  ListItemText,
  List,
  Pagination as MuiPagination,
} from "@mui/material";
import { useDataProvider, useNotify, useRedirect } from "react-admin";
import { useEffect, useState } from "react";
import { HandlersAdminData, HandlersUserDTO } from "./api/data-contracts";

const ITEMS_PER_PAGE = 5;

const Dashboard = () => {
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const redirect = useRedirect();

  const [totals, setTotals] = useState({ users: 0, admins: 0 });
  const [userQuery, setUserQuery] = useState("");
  const [adminQuery, setAdminQuery] = useState("");
  const [userResults, setUserResults] = useState<HandlersUserDTO[]>([]);
  const [adminResults, setAdminResults] = useState<HandlersAdminData[]>([]);
  const [userPage, setUserPage] = useState(1);
  const [adminPage, setAdminPage] = useState(1);

  // Get role from localStorage
  const role = localStorage.getItem("role");

  // Fetch total counts
  useEffect(() => {
    const fetchTotals = async () => {
      try {
        const users = await dataProvider.getList("users", {});
        let adminsCount = 0;
        if (role === "super") {
          const admins = await dataProvider.getList("admins", {});
          adminsCount = admins.total || 0;
        }
        setTotals({ users: users.total || 0, admins: adminsCount });
      } catch (error: any) {
        notify(error.message || "Error fetching totals", { type: "error" });
      }
    };
    fetchTotals();
  }, [dataProvider, notify, role]);

  // Search users
  const searchUsers = async (page: number = 1) => {
    try {
      const res = await dataProvider.getList("users", {
        pagination: { page, perPage: ITEMS_PER_PAGE },
        sort: { field: "created_at", order: "DESC" },
        filter: { search: userQuery },
      });

      setUserResults(res.data as HandlersUserDTO[]);
      setUserPage(page);
    } catch (error: any) {
      notify(error.message || "Error searching users", { type: "error" });
    }
  };

  // Search admins (only if super)
  const searchAdmins = async (page: number = 1) => {
    if (role !== "super") return;

    try {
      const res = await dataProvider.getList("admins", {
        pagination: { page, perPage: ITEMS_PER_PAGE },
        sort: { field: "created_at", order: "DESC" },
        filter: { search: adminQuery },
      });

      setAdminResults(res.data as HandlersAdminData[]);
      setAdminPage(page);
    } catch (error: any) {
      notify(error.message || "Error searching admins", { type: "error" });
    }
  };

  return (
    <Box className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Totals */}
      <Card className="bg-blue-50">
        <CardContent>
          <Typography variant="h6">Total Users</Typography>
          <Typography variant="h4">{totals.users}</Typography>
        </CardContent>
      </Card>

      {role === "super" && (
        <Card className="bg-purple-50">
          <CardContent>
            <Typography variant="h6">Total Admins</Typography>
            <Typography variant="h4">{totals.admins}</Typography>
          </CardContent>
        </Card>
      )}

      {/* Search Users */}
      <Card className="col-span-1 md:col-span-2">
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Search Users
          </Typography>
          <Box className="flex gap-2 mb-2">
            <TextField
              label="Phone"
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              variant="outlined"
              size="small"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => searchUsers(1)}
            >
              Search
            </Button>
          </Box>
          {userResults.length > 0 && (
            <Box>
              <List>
                {userResults.map((user) => (
                  <ListItemButton
                    key={user.id}
                    onClick={() => redirect(`/users/${user.id}`)}
                  >
                    <ListItemText primary={user.phone} secondary={user.phone} />
                  </ListItemButton>
                ))}
              </List>
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <MuiPagination
                  count={Math.ceil(userResults.length / ITEMS_PER_PAGE) || 1}
                  page={userPage}
                  onChange={(_, page) => searchUsers(page)}
                />
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Search Admins (super only) */}
      {role === "super" && (
        <Card className="col-span-1 md:col-span-2">
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Search Admins
            </Typography>
            <Box className="flex gap-2 mb-2">
              <TextField
                label="Username"
                value={adminQuery}
                onChange={(e) => setAdminQuery(e.target.value)}
                variant="outlined"
                size="small"
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => searchAdmins(1)}
              >
                Search
              </Button>
            </Box>
            {adminResults.length > 0 && (
              <Box>
                <List>
                  {adminResults.map((admin) => (
                    <ListItemButton
                      key={admin.id}
                      onClick={() => redirect(`/admins/${admin.id}`)}
                    >
                      <ListItemText
                        primary={admin.username}
                        secondary={admin.role}
                      />
                    </ListItemButton>
                  ))}
                </List>
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                  <MuiPagination
                    count={Math.ceil(adminResults.length / ITEMS_PER_PAGE) || 1}
                    page={adminPage}
                    onChange={(_, page) => searchAdmins(page)}
                  />
                </Box>
              </Box>
            )}
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default Dashboard;
