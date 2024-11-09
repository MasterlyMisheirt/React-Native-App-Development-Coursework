import {
  ActivityIndicator,
  Alert,
  LogBox,
  StyleSheet,
  Text,
  View,
} from "react-native";
import useLoad from "../API/UseLoad.js";
import API from "../API/API.js";
import Screen from "../layout/Screen";
import ModuleItem from "../Entity/Modules/ModuleItem.js";
import { Button, ButtonTray } from "../UI/Button.js";
import Icons from "../UI/Icons.js";

export const ModuleListScreen = ({ navigation }) => {
  //Initialisations -------------
  LogBox.ignoreLogs([
    "Non-serializable values were found in the navigation state.",
  ]);
  const modulesEndPoint = "https://softwarehub.uk/unibase/api/modules";

  //State -----------------------
  const [modules, setRecords, isLoading, loadModules] =
    useLoad(modulesEndPoint);

  //Handlers --------------------
  const onDelete = async (module) => {
    const deleteEndPoint = `${modulesEndPoint}/${module.ModuleID}`;
    const result = await API.delete(deleteEndPoint, module);
    if (result.isSuccess) {
      loadModules(modulesEndPoint);
      navigation.goBack();
    } else Alert.alert(result.message);
  };

  const onAdd = async (module) => {
    const result = await API.post(modulesEndPoint, module);
    if (result.isSuccess) {
      loadModules(modulesEndPoint);
      navigation.goBack();
    } else Alert.alert(result.message);
  };

  const onModify = async (module) => {
    const putEndPoint = `${modulesEndPoint}/${module.ModuleID}`;
    const result = await API.put(putEndPoint, module);
    if (result.isSuccess) {
      loadModules(modulesEndPoint);
      navigation.navigate("ModuleViewScreen", { module, onDelete, onModify });
    } else Alert.alert(result.message);
  };

  const goToViewScreen = (module) =>
    navigation.navigate("ModuleViewScreen", { module, onDelete, onModify });

  const goToAddScreen = () => navigation.navigate("ModuleAddScreen", { onAdd });
  //View ------------------------
  return (
    <Screen>
      <View style={styles.container}>
        <ButtonTray>
          <Button
            label="Add Module"
            icon={<Icons.Add />}
            onClick={goToAddScreen}
          />
        </ButtonTray>
        {isLoading && (
          <View style={styles.loading}>
            <Text>Retrieving records from {modulesEndPoint} ...</Text>
            <ActivityIndicator size="large" />
          </View>
        )}
        <ModuleItem modules={modules} onSelect={goToViewScreen} />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
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

export default ModuleListScreen;
