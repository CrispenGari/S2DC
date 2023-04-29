import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { AppNavProps } from "../../params";
import { COLORS, KEYS } from "../../constants";
import TypeWriter from "react-native-typewriter";
import * as Animatable from "react-native-animatable";
import { styles } from "../../styles";
import { retrieve, store } from "../../utils";
import { Loading } from "../../components";

const Landing: React.FunctionComponent<AppNavProps<"Landing">> = ({
  navigation,
}) => {
  const [loading, setLoading] = React.useState<boolean>(true);
  React.useLayoutEffect(() => {
    (async () => {
      const value = await retrieve(KEYS.NEW_TO_APP);
      if (!!value) {
        setLoading(false);
        navigation.replace("Home");
      } else {
        setLoading(false);
      }
    })();
  }, [navigation]);

  if (loading) return <Loading loadedFont={true} />;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.main,
        padding: 10,
      }}
    >
      <View
        style={{
          flex: 0.6,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: COLORS.main,
          maxWidth: 500,
        }}
      >
        <Text
          style={[
            styles.h1,
            {
              color: "white",
              fontSize: 25,
              letterSpacing: 1,
              marginBottom: 20,
            },
          ]}
        >
          S2DC Tool.
        </Text>
        <Animatable.Image
          animation={"bounce"}
          duration={2000}
          iterationCount={1}
          easing={"linear"}
          direction={"normal"}
          useNativeDriver={false}
          source={{
            uri: Image.resolveAssetSource(require("../../../assets/logo.png"))
              .uri,
          }}
          style={{
            width: 100,
            height: 100,
            marginVertical: 30,
            resizeMode: "contain",
          }}
        />
        <TypeWriter
          style={[
            styles.p,
            {
              marginVertical: 10,
              width: "100%",
              textAlign: "center",
              color: "white",
              maxWidth: 500,
            },
          ]}
          typing={1}
          maxDelay={-50}
        >
          Hello, welcome to the S2DC (Sickness to Disease Classifier) tool. This
          is an AI tool that is used for self diagnosis.
        </TypeWriter>
      </View>
      <View
        style={{
          flex: 0.4,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: COLORS.main,
          width: "100%",
          maxWidth: 500,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={async () => {
            await store(KEYS.NEW_TO_APP, "not");
            navigation.replace("Home");
          }}
          style={[
            styles.button,
            {
              backgroundColor: COLORS.primary,
              padding: 10,
              marginTop: 10,
              maxWidth: 200,
            },
          ]}
        >
          <Text style={[styles.button__text, { color: COLORS.white }]}>
            OPEN TOOL
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Landing;
