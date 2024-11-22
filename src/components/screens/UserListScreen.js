import { useState } from "react";
import { LogBox, StyleSheet, Text, View } from "react-native";
import initialUsers from "../../data/users.js";
import Screen from "../layout/Screen";
import UserList from "../Entity/Users/UserList.js";
import { Button, ButtonTray } from "../UI/Button.js";
import Icons from "../UI/Icons.js";

export const UserListScreen = ({ navigation }) => {
  //Initialisations -------------
  LogBox.ignoreLogs([
    "Non-serializable values were found in the navigation state.",
  ]);

  //State -----------------------
  const [users, setUsers] = useState(initialUsers);

  //Handlers --------------------
  const handleDelete = (user) =>
    setUsers(users.filter((item) => item.UserID !== user.UserID));

  const handleAdd = (user) => setUsers([...users, user]);

  const handleModify = (updatedUser) =>
    setUsers(
      users.map((user) =>
        user.UserID === updatedUser.UserID ? updatedUser : user
      )
    );

  const onDelete = (user) => {
    handleDelete(user);
    navigation.goBack();
  };

  const onAdd = (user) => {
    handleAdd(user);
    navigation.goBack();
  };

  const onModify = (user) => {
    handleModify(user);
    navigation.navigate("UserListScreen");
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
