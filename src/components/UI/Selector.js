import { Pressable, Vibration } from "react-native";
const Selector = ({ children, onPress, style, pressStyle }) => {
  //Initialisations -------------
  //State -----------------------
  //Handlers --------------------
  const handlePress = () => {
    Vibration.vibrate(5);
    onPress();
  };
  //View ------------------------
  return (
    <Pressable
      onLongPress={handlePress}
      style={({ pressed }) => [style, pressed && pressStyle]}
    >
      {children}
    </Pressable>
  );
};

export default Selector;
