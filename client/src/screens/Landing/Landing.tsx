import { View, Text } from "react-native";
import React from "react";
import { AppNavProps } from "../../params";
import { FONTS } from "../../constants";
import TypeWriter from "react-native-typewriter";

const Landing: React.FunctionComponent<AppNavProps<"Landing">> = ({
  navigation,
}) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TypeWriter
        style={{ fontFamily: FONTS.extraBold, fontSize: 30 }}
        typing={1}
        delayMap={[
          { at: 4, delay: 100 },
          { at: " " as any, delay: 1000 },
        ]}
        onTypingEnd={() => console.log("Typing end...")}
      >
        Hello there!!
      </TypeWriter>
    </View>
  );
};

export default Landing;
