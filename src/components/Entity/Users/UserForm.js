import { useState } from "react";
import { StyleSheet } from "react-native";
import Icons from "../../UI/Icons.js";
import Form from "../../UI/Form.js";

const UserForm = ({ ogUser, onSubmit, onCancel }) => {
  // Initialisations ---------------------
  const defaultUsers = {
    UserID: Math.floor(100000 + Math.random() * 900000),
    UserFirstname: null,
    UserLastname: null,
    UserEmail: null,
    UserType: null,
    UserYear: null,
    UserImageURL:
      "https://generated.photos/face/neutral-white-middle-aged-male-with-short-gray-hair-and-blue-eyes--5e6849b06d3b380006e3c5cb",
  };

  // Initialisations -----------------------

  // State -------------------------------
  const [user, setUser] = useState(ogUser || defaultUser);

  // Handlers ----------------------------
  const handleChange = (field, value) => setUser({ ...user, [field]: value });
  const handleSubmit = () => onSubmit(user);

  // View --------------------------------
  const submitLabel = ogUser ? "Modify" : "Add";
  const submitIcon = ogUser ? <Icons.Edit /> : <Icons.Add />;

  return (
    <Form
      onSubmit={handleSubmit}
      onCancel={onCancel}
      submitLabel={submitLabel}
      submitIcon={submitIcon}
    >
      <Form.InputText
        label="First Name"
        value={user.UserFirstname}
        onChange={(value) => handleChange("UserFirstname", value)}
      />

      <Form.InputText
        label="Last Name"
        value={user.UserLastname}
        onChange={(value) => handleChange("UserFirstname", value)}
      />

      <Form.InputText
        label="Email"
        value={user.UserEmail}
        onChange={(value) => handleChange("UserEmail", value)}
      />

      <Form.InputText
        label="Type"
        value={user.UserType}
        onChange={(value) => handleChange("UserType", value)}
      />

      <Form.InputText
        label="Year"
        value={user.UserYear}
        onChange={(value) => handleChange("UserYear", value)}
      />

      <Form.InputText
        label="User Image URL"
        value={user.UserImageURL}
        onChange={(value) => handleChange("UserImage", value)}
      />
    </Form>
  );
};
const styles = StyleSheet.create({});
export default UserForm;
