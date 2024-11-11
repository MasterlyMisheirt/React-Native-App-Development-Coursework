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
import ModuleList from "../Entity/Modules/ModuleList.js";
import { Button, ButtonTray } from "../UI/Button.js";
import Icons from "../UI/Icons.js";
import { useEffect } from "react";

export const ModuleListScreen = ({ navigation }) => {
  //Initialisations -------------
  LogBox.ignoreLogs([
    "Non-serializable values were found in the navigation state.",
  ]);
  const modulesEndPoint = "https://softwarehub.uk/unibase/api/modules";
  const loggedinUserKey = "loggedinUser";
  const favouritesKey = "moduleFavourites";

  //State -----------------------
  const [modules, setModules, isLoading, loadModules] =
    useLoad(modulesEndPoint);

  const [loggedinUser] = useStore(loggedinUserKey, null);
  const [favourites, saveFavourites] = useStore(favouritesKey, []);

  const augmentModulesWithFavourites = () => {
    const modifyModule = (module) => ({
      ...module,
      ModuleFavourite: favourites.includes(module.ModuleID),
    });

    const augmentedModules = modules.map(modifyModule);
    setModules(augmentedModules);
  };

  useEffect(() => {
    augmentModulesWithFavourites();
  }, [isLoading]);

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

  const handleFavourite = (module) => {
    // Update the module state
    const isFavourite = !module.ModuleFavourite;
    const updateModule = (item) =>
      item.ModuleID === module.ModuleID
        ? { ...item, ModuleFavourite: isFavourite }
        : item;
    const updatedModuleList = modules.map(updateModule);
    setModules(updatedModuleList);

    // Save the new favourites
    const updatedFavouritesList = updatedModuleList
      .filter((item) => item.ModuleFavourite)
      .map((item) => item.ModuleID);
    saveFavourites(updatedFavouritesList);
  };

  //View ------------------------
  return (
    <Screen>
      {loggedinUser && (
        <Text style={styles.welcome}>Welcome {loggedinUser.UserFirstname}</Text>
      )}
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
        <ModuleList
          modules={modules}
          onSelect={goToViewScreen}
          onFavourite={handleFavourite}
        />
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

export default ModuleListScreen;
