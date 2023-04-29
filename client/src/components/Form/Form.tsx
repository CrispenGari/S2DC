import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Keyboard,
} from "react-native";
import React from "react";
import { COLORS, FONTS, serverBaseURL } from "../../constants";
import TypeWriter from "react-native-typewriter";
import { styles } from "../../styles";
import { RippleIndicator } from "..";
import { PredictionType, ResultType } from "../../types";
import * as Haptics from "expo-haptics";
import { Audio } from "expo-av";
import { useSettingsStore } from "../../store";
interface Props {
  setResults: React.Dispatch<React.SetStateAction<PredictionType | undefined>>;
}
const Form: React.FunctionComponent<Props> = ({ setResults }) => {
  const [symptoms, setSymptoms] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [showForm, setShowForm] = React.useState<boolean>(false);

  const { settings } = useSettingsStore((s) => s);
  const diagnose = async () => {
    if (settings.haptics) {
      Haptics.impactAsync();
    }

    Keyboard.dismiss();
    if (!!!symptoms.trim()) return;
    setLoading(true);
    const body = JSON.stringify({ symptoms });
    const res = await fetch(`${serverBaseURL}/api/v1/diagnose`, {
      method: "POST",
      body,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data: ResultType = await res.json();
    if (!!data) {
      const { sound, status } = await Audio.Sound.createAsync(
        require("../../../assets/sounds/notification.mp3"),
        {
          shouldPlay: false,
          isLooping: false,
          isMuted: false,
          volume: 1,
        }
      );
      if (status.isLoaded && settings.sound) {
        await sound.playAsync();
      }
      if (!!data.error) {
        Alert.alert("S2DC", data.error, [
          {
            text: "OK",
            style: "default",
          },
        ]);
      } else {
        setResults(data.prediction);
      }
      setLoading(false);
      setSymptoms("");
    }
  };

  return (
    <View
      style={{
        width: "100%",
        maxWidth: 500,
        backgroundColor: COLORS.primary,
        padding: 10,
        borderRadius: 5,
        shadowColor: COLORS.tertiary,
        shadowRadius: 3,
        shadowOpacity: 1,
      }}
    >
      <TypeWriter
        style={[
          styles.p,
          {
            marginVertical: 10,
            width: "100%",
            color: "white",
            maxWidth: 500,
            fontSize: 16,
          },
        ]}
        typing={1}
        maxDelay={-50}
        onTypingEnd={() => {
          setShowForm(true);
        }}
      >
        How are you feeling today? Tell me what symptoms do you have so that I
        can diagnose you within seconds.
      </TypeWriter>
      {showForm ? (
        <>
          <TextInput
            placeholder="tell me your symptoms..."
            style={{
              backgroundColor: COLORS.tertiary,
              padding: 10,
              borderRadius: 5,
              fontFamily: FONTS.regular,
              fontSize: 18,
              marginVertical: 10,
            }}
            multiline
            onSubmitEditing={diagnose}
            value={symptoms}
            onChangeText={(text) => setSymptoms(text)}
            onFocus={() => {
              setResults(undefined);
            }}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={diagnose}
            style={[
              styles.button,
              {
                backgroundColor: COLORS.main,
                padding: 5,
                maxWidth: 100,
                borderRadius: 5,
              },
            ]}
          >
            <Text
              style={[
                styles.button__text,
                { color: COLORS.white, marginRight: loading ? 5 : 0 },
              ]}
            >
              diagnose
            </Text>
            {loading ? (
              <RippleIndicator size={5} color={COLORS.tertiary} />
            ) : null}
          </TouchableOpacity>
        </>
      ) : null}
    </View>
  );
};

export default Form;
