import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  View,
} from "react-native";
import React from "react";
import { AppNavProps } from "../../params";
import { COLORS } from "../../constants";
import { Form, Results } from "../../components";
import { ResultType } from "../../types";
import { AntDesign } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Audio } from "expo-av";

const Home: React.FunctionComponent<AppNavProps<"Home">> = ({ navigation }) => {
  const [results, setResults] = React.useState<ResultType | undefined>();

  const [sound, setSound] = React.useState<Audio.Sound | undefined>();
  React.useEffect(() => {
    (async () => {
      const { sound, status } = await Audio.Sound.createAsync(
        require("../../../assets/sounds/medi.mp3"),
        {
          shouldPlay: true,
          isLooping: true,
          isMuted: false,
          volume: 0.4,
        }
      );
      if (status.isLoaded) {
        setSound(sound);
      }
    })();
  }, []);

  React.useEffect(() => {
    return sound ? () => sound.unloadAsync() : () => {};
  }, [sound]);

  React.useLayoutEffect(() => {
    let mounted: boolean = true;
    if (mounted) {
      navigation.setOptions({
        headerShown: true,
        headerStyle: {
          backgroundColor: COLORS.main,
          elevation: 0,
          borderBottomColor: "transparent",
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTitleStyle: {
          display: "none",
        },
      });
    }
    return () => {
      mounted = false;
    };
  }, [navigation]);
  return (
    <TouchableWithoutFeedback
      style={{ flex: 1, position: "relative", backgroundColor: "red" }}
      onPress={Keyboard.dismiss}
    >
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            Haptics.impactAsync();
            navigation.navigate("Settings");
          }}
          style={{
            position: "absolute",
            backgroundColor: COLORS.primary,
            justifyContent: "center",
            alignItems: "center",
            width: 50,
            height: 50,
            borderRadius: 50,
            top: 0,
            right: 20,
            zIndex: 10,
          }}
        >
          <AntDesign name="setting" size={24} color={COLORS.tertiary} />
        </TouchableOpacity>
        <KeyboardAvoidingView
          behavior="padding"
          style={{
            flex: 1,
            backgroundColor: COLORS.main,
            padding: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Form setResults={setResults} />
          {results && <Results results={results} />}
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Home;
