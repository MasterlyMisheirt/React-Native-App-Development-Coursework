import { StatusBar } from "expo-status-bar";
import { StyleSheet, ScrollView, View } from "react-native";

export const Screen = ({ children }) => {
  //Initialisations -------------
  //State -----------------------
  //Handlers --------------------
  //View ------------------------
  return (
    <ScrollView style={styles.container}>
      <View style={styles.screen}>
        {children}
        <StatusBar style="light" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 15,
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default Screen;
