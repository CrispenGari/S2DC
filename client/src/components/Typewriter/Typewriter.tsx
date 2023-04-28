import { StyleProp, Text, TextStyle } from "react-native";
import React from "react";

interface Props {
  text: string;
  style?: StyleProp<TextStyle>;
  iterationCount?: "infinite" | number;
  startAt?: number;
  duration?: number;
  reverse?: boolean;
}
const Typewriter: React.FunctionComponent<Props> = ({
  text,
  style,
  iterationCount = 1,
  startAt = 0,
  duration = 200,
}) => {
  const [_text, set_Text] = React.useState<string>(
    text[text.length - 1 < startAt ? 0 : startAt]
  );
  const [counter, setCounter] = React.useState<number>(0);
  const [go, setGo] = React.useState<boolean>(true);
  console.log(_text.length, text.length, counter);
  React.useEffect(() => {
    if (_text.length !== text.length) {
      const intervalId = setInterval(() => {
        set_Text((state) => text.slice(0, state.length + 1));
      }, duration);
      return () => {
        clearInterval(intervalId);
      };
    } else {
      setCounter((state) => state + 1);
    }
  }, [text, duration, _text]);

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted) {
      if (iterationCount === "infinite") {
        set_Text(text[text.length - 1 < startAt ? 0 : startAt]);
      } else {
        if (counter < iterationCount) {
          set_Text(text[text.length - 1 < startAt ? 0 : startAt]);
        }
      }
    }
    return () => {
      mounted = false;
    };
  }, [counter, iterationCount, startAt]);
  return <Text style={style}>{_text}</Text>;
};

export default Typewriter;
