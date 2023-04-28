import { View, Text } from "react-native";
import React from "react";
import { FONTS } from "../../constants";

interface Props {
  loadedFont: boolean;
}
const Loading: React.FunctionComponent<Props> = ({ loadedFont }) => {
  return (
    <View style={{ flex: 1 }}>
      {loadedFont ? (
        <Text
          style={{ color: "white", fontSize: 18, fontFamily: FONTS.semiBold }}
        >
          loading...
        </Text>
      ) : (
        <Text style={{ color: "white", fontSize: 18 }}>loading...</Text>
      )}
    </View>
  );
};

export default Loading;
