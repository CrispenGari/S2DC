import { create } from "zustand";
import { SettingsType } from "../types";
export const useSettingsStore = create<{
  settings: Required<SettingsType>;
  setSettings: (settings: SettingsType) => void;
}>((set) => ({
  settings: { haptics: true, music: true, sound: true },
  setSettings: (settings: SettingsType) => set({ settings }),
}));
