import { ScrollView, StyleSheet } from "react-native";
import ModuleItem from "./ModuleItem";

const ModuleList = ({ modules, onSelect, onFavourite }) => {
  // Initialisations ---------------------
  // State -------------------------------
  // Handlers ----------------------------
  // View --------------------------------
  return (
    <ScrollView style={styles.container}>
      {modules.map((module) => {
        return (
          <ModuleItem
            key={module.ID}
            module={module}
            onSelect={onSelect}
            onFavourite={onFavourite}
          />
        );
      })}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {},
});
export default ModuleList;
