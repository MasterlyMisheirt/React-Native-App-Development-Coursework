import { StyleSheet, Text, View } from "react-native";
import Selector from "../../UI/Selector";

const UserItem = ({ user, onSelect }) => {
  // Initialisations ---------------------
  // State -------------------------------
  // Handlers ----------------------------
  handleSelect = () => onSelect(user);
  // View --------------------------------
  return (
    <View>
      <Selector
        onPress={handleSelect}
        pressStyle={styles.pressedItem}
        key={user.UserID}
      >
        <View style={styles.item}>
          <Text style={styles.text}>
            {user.UserFirstname} {user.UserLastname} ({user.UserUsertypeName})
          </Text>
        </View>
      </Selector>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {},
  item: {
    paddingVertical: 15,
    borderTopWidth: 1,
    borderColor: "lightgray",
    flexDirection: "row",
  },
  text: {
    fontSize: 16,
    paddingLeft: 10,
  },
  pressedItem: {
    backgroundColor: "azure",
  },
});
export default UserItem;
