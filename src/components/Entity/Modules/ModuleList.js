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
        console.log(module.ModuleID);
        return (
          <ModuleItem
            key={module.ModuleID}
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
