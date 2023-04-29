import "react-native-gesture-handler";
import { useFonts } from "expo-font";
import { View, StatusBar, LogBox } from "react-native";
import Toast, { BaseToast, BaseToastProps } from "react-native-toast-message";
import { COLORS, Fonts, FONTS } from "./src/constants";
import { Loading } from "./src/components";
import Routes from "./src/routes/Routes";

LogBox.ignoreLogs;
LogBox.ignoreAllLogs();

const toastConfig = {
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: COLORS.secondary,
        width: "100%",
        marginHorizontal: 10,
        maxWidth: 500,
        backgroundColor: COLORS.primary,
      }}
      contentContainerStyle={{
        paddingHorizontal: 10,
        backgroundColor: COLORS.primary,
      }}
      text1Style={{
        fontSize: 20,
        fontFamily: FONTS.regularBold,
        color: COLORS.white,
      }}
      text2Style={{
        fontSize: 16,
        fontFamily: FONTS.regular,
        color: COLORS.white,
      }}
    />
  ),
};
const App = () => {
  const [loaded] = useFonts(Fonts);
  if (!loaded) return <Loading loadedFont={loaded} />;
  return (
    <>
      <View style={{ flex: 1 }}>
        <StatusBar barStyle={"light-content"} />
        <Routes />
      </View>
      <Toast config={toastConfig} />
    </>
  );
};

export default App;
