import { useState } from "react";
import { StyleSheet } from "react-native";
import useLoad from "../../API/UseLoad.js";
import Icons from "../../UI/Icons.js";
import Form from "../../UI/Form.js";

const UserForm = ({ ogUser, onSubmit, onCancel }) => {
  // Initialisations ---------------------
  const defaultUser = {
    UserID: null,
    UserFirstname: null,
    UserLastname: null,
    UserEmail: null,
    UserLevel: null,
    UserUsertypeID: null,
    UserUsertypeName: null,
    UserRegistered: 0,
    UserYearID: null,
    UserImageURL:
      "https://images.generated.photos/WIwNwGAxeJRXK01PcPpxHFnsAsWmKwbFJO1X0d05ZhQ/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/Njk5MDY5LmpwZw.jpg",
  };

  const levels = [
    { value: 3, label: "3 (Foundation)" },
    { value: 4, label: "4 (First Year)" },
    { value: 5, label: "5 (Second Year)" },
    { value: 6, label: "6 (Final Year)" },
    { value: 7, label: "7 (Masters)" },
  ];

  // Initialisations -----------------------
  defaultUser.UserID = Math.floor(100000 + Math.random() * 900000);

  const typesEndPoint = "https://softwarehub.uk/unibase/api/usertypes";
  const yearsEndPoint = "https://softwarehub.uk/unibase/api/years";

  // State -------------------------------
  const [user, setUser] = useState(ogUser || defaultUser);
  const [types, , isTypesLoading] = useLoad(typesEndPoint);
  const [years, , isYearsLoading] = useLoad(yearsEndPoint);

  // Handlers ----------------------------
  const handleChange = (field, value) => setUser({ ...user, [field]: value });
  const handleSubmit = () => onSubmit(user);

  // View --------------------------------
  const submitLabel = ogUser ? "Modify" : "Add";
  const submitIcon = ogUser ? <Icons.Edit /> : <Icons.Add />;

  const cohorts = years.map((year) => ({
    value: year.YearID,
    label: `${year.YearName}`,
  }));

  const actors = types.map((type) => ({
    value: type.UsertypeID,
    label: `${type.UsertypeName}`,
  }));

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
        onChange={(value) => handleChange("UserLastname", value)}
      />

      <Form.InputText
        label="Email"
        value={user.UserEmail}
        onChange={(value) => handleChange("UserEmail", value)}
      />

      <Form.InputSelect
        label="Course Level"
        prompt="Select Course Level..."
        options={levels}
        value={user.UserLevel}
        onChange={(value) => handleChange("UserLevel", value)}
      />

      <Form.InputSelect
        label="User Type"
        prompt="Select staff or student..."
        options={actors}
        value={user.UserUsertypeID}
        onChange={(value) => handleChange("UserUsertypeID", value)}
        isLoading={isTypesLoading}
      />

      <Form.InputSelect
        label="Course Cohort"
        prompt="Select Course Cohort..."
        options={cohorts}
        value={user.UserYearID}
        onChange={(value) => handleChange("UserYearID", value)}
        isLoading={isYearsLoading}
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
