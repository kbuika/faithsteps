import { Text, View } from "react-native";
import { Theme } from "../constants/theme";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Theme.colors.background,
      }}
    >
      <Text style={{ color: Theme.colors.textPrimary }}>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
