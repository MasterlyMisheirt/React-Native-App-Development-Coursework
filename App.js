import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import UserListScreen from "./src/components/screens/UserListScreen";
import UserAddScreen from "./src/components/screens/UserAddScreen";
import UserModifyScreen from "./src/components/screens/UserModifyScreen";
import UserViewScreen from "./src/components/screens/UserViewScreen";
import ModuleListScreen from "./src/components/screens/ModuleListScreen";
import ModuleAddScreen from "./src/components/screens/ModuleAddScreen";
import ModuleModifyScreen from "./src/components/screens/ModuleModifyScreen";
import ModuleViewScreen from "./src/components/screens/ModuleViewScreen";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const UserNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="UserListScreen"
      screenOptions={{
        headerStyle: { backgroundColor: "black" },
        headerTintColor: "white",
        statusBarColor: "black",
      }}
    >
      <Stack.Screen
        name="UserListScreen"
        component={UserListScreen}
        options={{ title: "List users" }}
      />
      <Stack.Screen
        name="UserAddScreen"
        component={UserAddScreen}
        options={{ title: "Add users" }}
      />
      <Stack.Screen
        name="UserModifyScreen"
        component={UserModifyScreen}
        options={{ title: "Modify users" }}
      />
      <Stack.Screen
        name="UserViewScreen"
        component={UserViewScreen}
        options={{ title: "View users" }}
      />
    </Stack.Navigator>
  );
};

const ModuleNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="ModuleListScreen"
      screenOptions={{
        headerStyle: { backgroundColor: "black" },
        headerTintColor: "white",
        statusBarColor: "black",
      }}
    >
      <Stack.Screen
        name="ModuleListScreen"
        component={ModuleListScreen}
        options={{ title: "List modules" }}
      />
      <Stack.Screen
        name="ModuleAddScreen"
        component={ModuleAddScreen}
        options={{ title: "Add modules" }}
      />
      <Stack.Screen
        name="ModuleModifyScreen"
        component={ModuleModifyScreen}
        options={{ title: "Modify modules" }}
      />
      <Stack.Screen
        name="ModuleViewScreen"
        component={ModuleViewScreen}
        options={{ title: "View modules" }}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      UserNavigator();
      <Drawer.Navigator>
        <Drawer.Screen name="User Crudler" component={UserNavigator} />
        <Drawer.Screen name="Module Crudler" component={ModuleNavigator} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
