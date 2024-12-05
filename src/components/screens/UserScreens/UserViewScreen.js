import Screen from "../../layout/Screen";
import UserView from "../../Entity/Users/UserView";

export const UserViewScreen = ({ navigation, route }) => {
  //Initialisations -------------
  const { user, onDelete, onModify } = route.params;
  //State -----------------------
  //Handlers --------------------
  const goToModifyScreen = () =>
    navigation.navigate("UserModifyScreen", { user, onModify });
  //View ------------------------
  return (
    <Screen>
      <UserView user={user} onDelete={onDelete} onModify={goToModifyScreen} />
    </Screen>
  );
};

export default UserViewScreen;
