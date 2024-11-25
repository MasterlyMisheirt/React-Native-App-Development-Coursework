import {
  ActivityIndicator,
  Alert,
  LogBox,
  StyleSheet,
  Text,
  View,
} from "react-native";
import useLoad from "../API/UseLoad.js";
import useStore from "../store/useStore.js";
import API from "../API/API.js";
import Screen from "../layout/Screen";
import UserList from "../Entity/Users/UserList.js";
import { Button, ButtonTray } from "../UI/Button.js";
import Icons from "../UI/Icons.js";
import { useEffect } from "react";

export const UserListScreen = ({ navigation }) => {
  //Initialisations -------------
  LogBox.ignoreLogs([
    "Non-serializable values were found in the navigation state.",
  ]);
  const usersEndPoint = "https://softwarehub.uk/unibase/api/users";

  //State -----------------------
  const [users, setUsers, isLoading, loadUsers] = useLoad(usersEndPoint);

  //Handlers --------------------
  const onDelete = async (user) => {
    const deleteEndPoint = `${usersEndPoint}/${user.UserID}`;
    const result = await API.delete(deleteEndPoint, user);
    if (result.isSuccess) {
      loadUsers(usersEndPoint);
      navigation.goBack();
    } else Alert.alert(result.message);
  };

  const onAdd = async (user) => {
    const result = await API.post(usersEndPoint, user);
    if (result.isSuccess) {
      loadUsers(usersEndPoint);
      navigation.goBack();
    } else Alert.alert(result.message);
  };

  const onModify = async (user) => {
    const putEndPoint = `${usersEndPoint}/${user.UserID}`;
    const result = await API.put(putEndPoint, user);
    if (result.isSuccess) {
      loadUsers(usersEndPoint);
      navigation.navigate("UserViewScreen", { user, onDelete, onModify });
    } else Alert.alert(result.message);
  };

  const goToViewScreen = (user) =>
    navigation.navigate("UserViewScreen", { user, onDelete, onModify });

  const goToAddScreen = () => navigation.navigate("UserAddScreen", { onAdd });

  //View ------------------------
  return (
    <Screen>
      <View style={styles.container}>
        <ButtonTray>
          <Button
            label="Add User"
            icon={<Icons.Add />}
            onClick={goToAddScreen}
          />
        </ButtonTray>
        {isLoading && (
          <View style={styles.loading}>
            <Text>Retrieving records from {usersEndPoint} ...</Text>
            <ActivityIndicator size="large" />
          </View>
        )}
        <UserList users={users} onSelect={goToViewScreen} />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  welcome: {
    marginTop: 5,
    marginBottom: 5,
  },
  container: {
    gap: 15,
  },
  loading: {
    height: 100,
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default UserListScreen;
