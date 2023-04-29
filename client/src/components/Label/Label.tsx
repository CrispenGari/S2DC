import { View, Text } from "react-native";
import React from "react";
import { styles } from "../../styles";
interface Props {
  title: string;
}
const Label: React.FC<Props> = ({ title }) => {
  return (
    <View
      style={{
        marginVertical: 10,
        paddingHorizontal: 10,
      }}
    >
      <Text style={[styles.p, {}]}>{title}</Text>
    </View>
  );
};

export default Label;
