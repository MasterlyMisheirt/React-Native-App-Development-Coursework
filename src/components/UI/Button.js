import { Pressable, StyleSheet, Text, View } from "react-native";
import Selector from "./Selector.js";

export const Button = ({ label, icon, onClick, styleLabel, styleButton }) => {
  //Initialisations -------------
  //State -----------------------
  //Handlers --------------------
  //View ------------------------
  return (
    <Selector
      onPress={onClick}
      style={[styles.button, styleButton]}
      pressStyle={styles.pressedButton}
    >
      {icon
        ? icon
        : console.log(
            "No icon is present, try running the command 'npm install @expo/vector-icons' to fix the issue"
          )}
      <Text style={[styles.label, styleLabel]}>{label}</Text>
    </Selector>
  );
};

export const ButtonTray = ({ children }) => {
  //Initialisations -------------
  //State -----------------------
  //Handlers --------------------
  //View ------------------------
  return <View style={styles.buttonTray}>{children}</View>;
};

const styles = StyleSheet.create({
  buttonTray: {
    flexDirection: "row",
    gap: 15,
  },
  button: {
    minHeight: 50,
    borderWidth: 1,
    borderRadius: 7,
    borderColor: "grey",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
    marginTop: 15,
    padding: 3,
    flex: 1,
    flexDirection: "row",
    gap: 5,
  },
  label: {
    fontSize: 16,
  },
  pressedButton: {
    backgroundColor: "azure",
    elevation: 5,
  },
});
