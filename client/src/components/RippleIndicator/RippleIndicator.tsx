import { Animated } from "react-native";
import React from "react";

interface Props {
  color: string;
  size: number;
}
const Ripple: React.FunctionComponent<Props> = ({ color, size }) => {
  const indicatorAnimation = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    Animated.loop(
      Animated.timing(indicatorAnimation, {
        toValue: 1,
        delay: 0,
        duration: 1000,
        useNativeDriver: false,
      })
    ).start();
  }, []);
  const scale = indicatorAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 2],
  });
  return (
    <Animated.View
      style={{
        backgroundColor: color,
        width: size,
        height: size,
        transform: [{ scale }],
        borderRadius: size,
      }}
    />
  );
};

export default Ripple;
