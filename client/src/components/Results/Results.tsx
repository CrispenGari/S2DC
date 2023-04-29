import { View, Text } from "react-native";
import React from "react";
import { COLORS } from "../../constants";
import { ResultType } from "../../types";

interface Props {
  results: ResultType;
}
const Results: React.FunctionComponent<Props> = ({ results }) => {
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
        marginVertical: 30,
      }}
    >
      <Text>Results</Text>
    </View>
  );
};

export default Results;
