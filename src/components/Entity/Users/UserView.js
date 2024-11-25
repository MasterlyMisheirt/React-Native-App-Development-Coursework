import { Alert, StyleSheet, Text, View } from "react-native";
import FullWidthImage from "react-native-fullwidth-image";
import { Button, ButtonTray } from "../../UI/Button";
import Icons from "../../UI/Icons";
const UserView = ({ user, onDelete, onModify }) => {
  // Initialisations ---------------------
  // State -------------------------------
  // Handlers ----------------------------
  const handleDelete = () => onDelete(user);

  const requestDelete = () =>
    Alert.alert(
      "Delete warnining",
      `Are you sure you want to delete ${user.UserFirstname} ${user.UserLastname} from the list?`,
      [{ text: "Cancel" }, { text: "Delete", onPress: handleDelete }]
    );
  // View --------------------------------
  return (
    <View style={styles.container}>
      <FullWidthImage
        source={{ uri: user.UserImageURL }}
        style={styles.image}
      />
      <View style={styles.infoTray}>
        <Text style={styles.boldText}>
          ({1 === user.UserUsertypeID ? "Staff" : "Student"})
        </Text>
        <Text style={styles.boldText}>
          {user.UserFirstname} {user.UserLastname}
        </Text>
        <Text style={styles.text}>Level {user.UserLevel}</Text>
        <Text style={styles.text}>Email: {user.UserEmail}</Text>
        {user.UserYear && (
          <Text style={styles.text}>Year: {user.UserYear}</Text>
        )}
      </View>
      <ButtonTray>
        <Button icon={<Icons.Edit />} label="Modify" onClick={onModify} />
        <Button
          icon={<Icons.Delete />}
          label="Delete"
          onClick={requestDelete}
          styleButton={{ backgroundColor: "mistyrose" }}
          styleLabel={{ color: "red" }}
        />
      </ButtonTray>
    </View>
  );
};
const styles = StyleSheet.create({
  container: { gap: 15 },
  image: { borderRadius: 3 },
  infoTray: { gap: 5 },
  buttonTray: {},
  text: { fontSize: 16 },
  boldText: { fontSize: 16, fontWeight: "bold" },
  dimText: { color: "grey" },
});
export default UserView;
