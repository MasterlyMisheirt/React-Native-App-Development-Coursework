import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import useLoad from "../../API/UseLoad.js";
import Icons from "../../UI/Icons.js";
import Form from "../../UI/Form.js";

const defaultModule = {
  ModuleID: null, //Math.floor(100000 + Math.random() * 900000),
  ModuleName: null,
  ModuleCode: null,
  ModuleLevel: null,
  ModuleYearID: null,
  ModuleLeaderID: null,
  ModuleImageURL:
    "https://images.freeimages.com/images/small-previews/411/light-of-technology-1510575.jpg",
};

const ModuleForm = ({ ogModule, onSubmit, onCancel }) => {
  // Initialisations ---------------------
  defaultModule.ModuleID = Math.floor(100000 + Math.random() * 900000);

  const yearsEndPoint = "https://softwarehub.uk/unibase/api/years";
  const leadersEndPoint = "https://softwarehub.uk/unibase/api/users/staff";

  const levels = [
    { value: 3, label: "3 (Foundation)" },
    { value: 4, label: "4 (First Year)" },
    { value: 5, label: "5 (Second Year)" },
    { value: 6, label: "6 (Final Year)" },
    { value: 7, label: "7 (Masters)" },
  ];

  // State -------------------------------
  const [module, setModule] = useState(ogModule || defaultModule);
  const [years, , isYearsLoading] = useLoad(yearsEndPoint);
  const [leaders, , isLeadersLoading] = useLoad(leadersEndPoint);

  // Handlers ----------------------------
  const handleChange = (field, value) =>
    setModule({ ...module, [field]: value });
  const handleSubmit = () => onSubmit(module);

  // View --------------------------------
  const submitLabel = ogModule ? "Modify" : "Add";
  const submitIcon = ogModule ? <Icons.Edit /> : <Icons.Add />;

  const cohorts = years.map((year) => ({
    value: year.YearID,
    label: year.YearName,
  }));

  const staff = leaders.map((leader) => ({
    value: leader.UserID,
    label: `${leader.UserFirstname} ${leader.UserLastname}`,
  }));

  return (
    <Form
      onSubmit={handleSubmit}
      onCancel={onCancel}
      submitLabel={submitLabel}
      submitIcon={submitIcon}
    >
      <Form.InputText
        label="Module Code"
        value={module.ModuleCode}
        onChange={(value) => handleChange("ModuleCode", value)}
      />
      <Form.InputText
        label="Module Name"
        value={module.ModuleName}
        onChange={(value) => handleChange("ModuleName", value)}
      />
      <Form.InputSelect
        label="Module Level"
        prompt="Select Module Level..."
        options={levels}
        value={module.ModuleLevel}
        onChange={(value) => handleChange("ModuleLevel", value)}
      />

      <Form.InputSelect
        label="Module Cohort"
        prompt="Select Module Cohort..."
        options={cohorts}
        value={module.ModuleYearID}
        onChange={(value) => handleChange("ModuleYearID", value)}
        isLoading={isYearsLoading}
      />
      <Form.InputSelect
        label="Module Leader"
        prompt="Select Module Leader..."
        options={staff}
        value={module.ModuleLeaderID}
        onChange={(value) => handleChange("ModuleLeaderID", value)}
        isLoading={isLeadersLoading}
      />
      <Form.InputText
        label="Module Image URL"
        value={module.ModuleImageURL}
        onChange={(value) => handleChange("ModuleImageURL", value)}
      />
    </Form>
  );
};
const styles = StyleSheet.create({});
export default ModuleForm;
