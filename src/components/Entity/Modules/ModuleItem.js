import { StyleSheet, Text, View } from "react-native";
import Selector from "../../UI/Selector";

const ModuleItem = ({ modules, onSelect }) => {
  // Initialisations ---------------------
  // State -------------------------------
  // Handlers ----------------------------
  // View --------------------------------
  return (
    <View>
      {modules.map((module) => {
        return (
          <Selector
            onPress={() => onSelect(module)}
            pressStyle={styles.pressedItem}
            key={module.ModuleID}
          >
            <View style={styles.item}>
              <Text style={styles.text}>
                {module.ModuleCode} {module.ModuleName}
              </Text>
            </View>
          </Selector>
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {},
  item: {
    paddingVertical: 15,
    borderTopWidth: 1,
    borderColor: "lightgray",
  },
  text: {
    fontSize: 16,
  },
  pressedItem: {
    backgroundColor: "azure",
  },
});
export default ModuleItem;
