import { ScrollView, Linking } from "react-native";
import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";
import React from "react";
import { AppNavProps } from "../../params";
import { COLORS, FONTS, KEYS } from "../../constants";
import { AppBackButton, Label, SettingItem } from "../../components";
import * as Haptics from "expo-haptics";
import { store } from "../../utils";
import { useSettingsStore } from "../../store";
import { SettingsType } from "../../types";
const Settings: React.FunctionComponent<AppNavProps<"Settings">> = ({
  navigation,
}) => {
  const { settings, setSettings } = useSettingsStore((s) => s);
  React.useLayoutEffect(() => {
    let mounted: boolean = true;
    if (mounted) {
      navigation.setOptions({
        headerTitleStyle: {
          fontSize: 18,
          fontFamily: FONTS.regular,
          color: COLORS.white,
          backgroundColor: COLORS.primary,
          paddingHorizontal: 10,
          borderRadius: 999,
        },
        headerShown: true,
        headerStyle: {
          backgroundColor: COLORS.main,
          elevation: 0,
          borderBottomColor: "transparent",
          shadowOpacity: 0,
          borderBottomWidth: 0,
          height: 100,
        },
        headerLeft: ({ label, onPress }) => (
          <AppBackButton
            label={""}
            onPress={() => {
              Haptics.impactAsync();
              navigation.goBack();
            }}
          />
        ),
      });
    }
    return () => {
      mounted = false;
    };
  }, [navigation]);
  return (
    <ScrollView
      bounces={false}
      style={{ flex: 1, backgroundColor: COLORS.secondary }}
    >
      <Label title="MISC" />
      <SettingItem
        title={settings.haptics ? "Disable Haptics" : "Enable Haptics"}
        Icon={
          settings.haptics ? (
            <MaterialCommunityIcons
              name="vibrate"
              size={24}
              color={COLORS.secondary}
            />
          ) : (
            <MaterialCommunityIcons
              name="vibrate-off"
              size={24}
              color={COLORS.secondary}
            />
          )
        }
        onPress={async () => {
          const s: SettingsType = {
            haptics: !settings.haptics,
            music: settings.music,
            sound: settings.sound,
          };
          await store(KEYS.APP_SETTINGS, JSON.stringify(settings));
          setSettings(s);
        }}
      />
      <SettingItem
        title={settings.music ? "Disable Music" : "Enable Music"}
        Icon={
          !settings.music ? (
            <MaterialIcons
              name="music-off"
              size={24}
              color={COLORS.secondary}
            />
          ) : (
            <MaterialIcons
              name="music-note"
              size={24}
              color={COLORS.secondary}
            />
          )
        }
        onPress={async () => {
          const s: SettingsType = {
            haptics: settings.haptics,
            music: !settings.music,
            sound: settings.sound,
          };
          await store(KEYS.APP_SETTINGS, JSON.stringify(settings));
          setSettings(s);
        }}
      />
      <SettingItem
        title={settings.sound ? "Disable Sound" : "Enable Sound"}
        Icon={
          !settings.sound ? (
            <Ionicons name="volume-mute" size={24} color={COLORS.secondary} />
          ) : (
            <Ionicons
              name="volume-medium-sharp"
              size={24}
              color={COLORS.secondary}
            />
          )
        }
        onPress={async () => {
          const s: SettingsType = {
            haptics: settings.haptics,
            music: settings.music,
            sound: !settings.sound,
          };
          await store(KEYS.APP_SETTINGS, JSON.stringify(settings));
          setSettings(s);
        }}
      />

      <Label title="MAINTAINERS" />

      <SettingItem
        title="GitHub"
        Icon={<AntDesign name="github" size={24} color={COLORS.secondary} />}
        onPress={async () => {
          await Linking.openURL("https://github.com/CrispenGari/S2DC");
        }}
      />
    </ScrollView>
  );
};

export default Settings;
