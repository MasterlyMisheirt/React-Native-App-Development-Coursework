import { useState } from "react";
import {
  ActivityIndicator,
  LogBox,
  StyleSheet,
  Text,
  View,
} from "react-native";
import initialModules from "../../data/modules.js";
import useStore from "../store/useStore.js";
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
  const loggedinUserKey = "loggedinUser";
  const favouritesKey = "moduleFavourites";

  //State -----------------------
  const [modules, setModules] = useState(initialModules);

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
  }, []);

  //Handlers --------------------
  const handleDelete = (module) =>
    setModules(modules.filter((item) => item.ModuleID !== module.ModuleID));

  const handleAdd = (module) => setModules([...modules, module]);

  const handleModify = (updatedModule) =>
    setModules(
      modules.map((module) =>
        module.ModuleID === updatedModule.ModuleID ? updatedModule : module
      )
    );

  const onDelete = (module) => {
    handleDelete(module);
    navigation.goBack();
  };

  const onAdd = (module) => {
    handleAdd(module);
    navigation.goBack();
  };

  const onModify = (module) => {
    handleModify(module);
    navigation.navigate("ModuleListScreen");
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
