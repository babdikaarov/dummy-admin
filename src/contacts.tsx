import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  required,
  SaveButton,
  Toolbar,
} from "react-admin";
import { Box } from "@mui/material";

// Edit contact information
export const ContactEdit = () => {
  return (
    <Edit redirect={false} id="1" mutationMode="pessimistic">
      <SimpleForm
        toolbar={
          <Toolbar>
            <SaveButton />
          </Toolbar>
        }
      >
        <ContactTitle />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
            maxWidth: 500,
          }}
        >
          <NumberInput
            source="support_number"
            label="Support Number"
            helperText="e.g., 77091234567"
            validate={[required()]}
            fullWidth
          />
          <TextInput
            source="email_support"
            label="Support Email"
            type="email"
            helperText="e.g., support@ololo.com"
            validate={[required()]}
            fullWidth
          />
          <TextInput
            source="address"
            label="Address"
            helperText="e.g., г. Бишкек, проспект Чуй, 135"
            validate={[required()]}
            fullWidth
            multiline
            rows={3}
          />
        </Box>
      </SimpleForm>
    </Edit>
  );
};

const ContactTitle = () => {
  return <span>Edit Contact Information</span>;
};
