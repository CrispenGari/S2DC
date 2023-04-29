import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "../../styles";
import { COLORS } from "../../constants";

interface Props {
  onPress: () => void;
  title: string;
  Icon: React.ReactNode;
}
const SettingItem: React.FunctionComponent<Props> = ({
  onPress,
  title,
  Icon,
}) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        padding: 10,
        marginBottom: 1,
        backgroundColor: COLORS.primary,
        alignItems: "center",
      }}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {Icon}
      <Text
        style={[styles.p, { flex: 1, color: COLORS.white, marginLeft: 10 }]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default SettingItem;
