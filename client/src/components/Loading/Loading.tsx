import { View, Text } from "react-native";
import React from "react";
import { COLORS, FONTS } from "../../constants";

interface Props {
  loadedFont: boolean;
}
const Loading: React.FunctionComponent<Props> = ({ loadedFont }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.main,
      }}
    >
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
