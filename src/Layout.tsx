import type { ReactNode } from "react";
import { Layout as RALayout, CheckForApplicationUpdate } from "react-admin";
import MyMenu from "./components/MyMenu";
import MyAppBar from "./components/MyAppBar";

export const Layout = ({ children }: { children: ReactNode }) => (
  <RALayout menu={MyMenu} appBar={MyAppBar}>
    {children}
    <CheckForApplicationUpdate />
  </RALayout>
);
