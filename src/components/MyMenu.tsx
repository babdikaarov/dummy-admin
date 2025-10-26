import { Menu } from "react-admin";
import PeopleIcon from "@mui/icons-material/People";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import SettingsIcon from "@mui/icons-material/Settings";
import { usePermissions } from "react-admin";

const MyMenu = () => {
  const { permissions } = usePermissions();
  const adminId = localStorage.getItem("id");

  return (
    <Menu className="flex flex-col h-full">
      <div>
        <Menu.DashboardItem />
        <Menu.ResourceItem name="users" leftIcon={<PeopleIcon />} />

        {permissions === "super" && (
          <Menu.ResourceItem
            name="admins"
            leftIcon={<AdminPanelSettingsIcon />}
          />
        )}
        <Menu.Item
          to="/contacts/1"
          primaryText="Contacts"
          leftIcon={<SupportAgentIcon />}
        />
      </div>

      {adminId && (
        <div className="mt-auto">
          <Menu.Item
            to={`/admins/${adminId}`}
            primaryText="My Profile"
            leftIcon={<SettingsIcon />}
          />
        </div>
      )}
    </Menu>
  );
};

export default MyMenu;
