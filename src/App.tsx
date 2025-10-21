import { Admin, Resource } from "react-admin";
import { Layout } from "./Layout";
import authProvider from "./authProvider";
import dataProvider from "./dataProvider";
import LoginPage from "./LoginPage";
import { UserList, UserCreate, UserEdit } from "./users";
import { AdminList, AdminCreate, AdminEdit } from "./admins";
import PeopleIcon from "@mui/icons-material/People";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import Dashboard from "./Doashboard";

export const App = () => (
  <Admin
    dashboard={Dashboard}
    authProvider={authProvider}
    dataProvider={dataProvider}
    loginPage={LoginPage}
    layout={Layout}
    requireAuth
  >
    {(permissions) => (
      <>
        <Resource
          name="users"
          list={UserList}
          create={UserCreate}
          edit={UserEdit}
          icon={PeopleIcon}
          options={{ label: "Users" }}
        />
        <Resource
          name="admins"
          list={permissions === "super" ? AdminList : undefined}
          create={permissions === "super" ? AdminCreate : undefined}
          edit={AdminEdit} // Everyone can access their own edit page (with restriction logic inside)
          icon={AdminPanelSettingsIcon}
          options={{ label: "Admins" }}
        />
      </>
    )}
  </Admin>
);
