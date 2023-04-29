import { View, Text, Dimensions } from "react-native";
import React from "react";
import { COLORS, FONTS } from "../../constants";
import { PredictionType } from "../../types";
import TypeWriter from "react-native-typewriter";
import { styles } from "../../styles";
import { ProgressChart } from "react-native-chart-kit";

interface Props {
  results: PredictionType;
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
        alignItems: "center",
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
      >
        Based on what you describe to the AI model, here are the results
      </TypeWriter>
      <Text
        style={[
          {
            fontSize: 20,
            textAlign: "center",
            color: COLORS.white,
            marginVertical: 10,
            fontFamily: FONTS.extraBold,
          },
        ]}
      >
        {results.disease}
      </Text>
      <ProgressChart
        data={{
          data: [results.confidence, 1 - results.confidence],
        }}
        width={250}
        height={150}
        strokeWidth={4}
        radius={2}
        chartConfig={{
          backgroundGradientFrom: COLORS.primary,
          backgroundGradientFromOpacity: 1,
          backgroundGradientTo: COLORS.primary,
          backgroundGradientToOpacity: 0.5,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        hideLegend={false}
        style={{
          marginBottom: 10,
        }}
      />
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
      >
        {`We have detected that you have ${results.disease} with ${(
          results.confidence * 100
        ).toFixed(0)}% confidence.`}
      </TypeWriter>
    </View>
  );
};

export default Results;
