import Screen from "../../layout/Screen";
import UserForm from "./UserForm";

export const UserModifyScreen = ({ navigation, route }) => {
  //Initialisations -------------
  const { user, onModify } = route.params;
  //State -----------------------
  //Handlers --------------------
  const handleCancel = navigation.goBack;
  //View ------------------------
  return (
    <Screen>
      <UserForm ogUser={user} onSubmit={onModify} onCancel={handleCancel} />
    </Screen>
  );
};

export default UserModifyScreen;
