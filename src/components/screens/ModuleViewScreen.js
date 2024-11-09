import { StyleSheet, Text, View } from "react-native";
import Screen from "../layout/Screen";
import ModuleView from "../Entity/Modules/ModuleView";

export const ModuleViewScreen = ({ navigation, route }) => {
  //Initialisations -------------
  const { module, onDelete, onModify } = route.params;
  //State -----------------------
  //Handlers --------------------
  const goToModifyScreen = () =>
    navigation.navigate("ModuleModifyScreen", { module, onModify });
  //View ------------------------
  return (
    <Screen>
      <ModuleView
        module={module}
        onDelete={onDelete}
        onModify={goToModifyScreen}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({});

export default ModuleViewScreen;
