import {
  Toolbar,
  SaveButton,
  useRedirect,
  DeleteWithConfirmButton,
} from "react-admin";
import { Box, Button } from "@mui/material";
interface FormToolbarWithCancelProps {
  redirectTo: string;
  variant?: "create" | "edit";
}

const FormToolbarWithCancel: React.FC<FormToolbarWithCancelProps> = ({
  redirectTo,
  variant = "create",
}) => {
  const redirect = useRedirect();
  return (
    <Toolbar className="flex flex-wrap gap-2.5 w-full">
      <SaveButton />

      <Box className="grow" />

      {/* Right side buttons */}
      <div className="flex gap-2.5">
        <Button
          variant="outlined"
          color="secondary"
          size="medium"
          onClick={() => redirect(redirectTo)}
          className="h-10 px-4"
        >
          Cancel
        </Button>

        {variant === "edit" && <DeleteWithConfirmButton />}
      </div>
    </Toolbar>
  );
};

export default FormToolbarWithCancel;
