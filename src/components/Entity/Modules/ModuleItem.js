import { StyleSheet, Text, View } from "react-native";
import Selector from "../../UI/Selector";
import Favourite from "../../UI/Favourite";

const ModuleItem = ({ module, onSelect, onFavourite }) => {
  // Initialisations ---------------------
  // State -------------------------------
  // Handlers ----------------------------
  handleSelect = () => onSelect(module);
  handleFavourites = () => onFavourite(module);
  // View --------------------------------
  return (
    <View>
      <Selector onPress={handleSelect} pressStyle={styles.pressedItem}>
        <View style={styles.item}>
          <Favourite
            isFavourite={module.ModuleFavourite}
            onSelect={handleFavourites}
          />
          <Text style={styles.text}>
            {module.ModuleCode} {module.ModuleName}
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
export default ModuleItem;
