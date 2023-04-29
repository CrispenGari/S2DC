import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS, FONTS } from "../../constants";
import { Entypo } from "@expo/vector-icons";

interface Props {
  onPress: () => void;
  label: string;
}
const AppBackButton: React.FunctionComponent<Props> = ({ onPress, label }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 10,
      }}
    >
      <Entypo name="chevron-left" size={24} color={COLORS.white} />
      <Text
        style={{
          marginLeft: 2,
          color: COLORS.white,
          fontFamily: FONTS.regular,
          fontSize: 20,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default AppBackButton;
