import { StyleSheet } from "react-native";
import Screen from "../../layout/Screen";
import UserForm from "../../Entity/Users/UserForm";

export const UserAddScreen = ({ navigation, route }) => {
  //Initialisations -------------
  const { onAdd } = route.params;

  //State -----------------------
  //Handlers --------------------
  const handleCancel = navigation.goBack;

  //View ------------------------
  return (
    <Screen>
      <UserForm onSubmit={onAdd} onCancel={handleCancel} />
    </Screen>
  );
};

const styles = StyleSheet.create({});

export default UserAddScreen;
