import { create } from 'zustand';

export type Language = 'es' | 'en' | 'fr' | 'de' | 'it';
export type AppTheme = 'dark' | 'light';

interface SettingsState {
    language: Language;
    appTheme: AppTheme;
    hasSeenSplash: boolean;
    hasSeenAppGuide: boolean;
    setLanguage: (lang: Language) => void;
    setAppTheme: (theme: AppTheme) => void;
    setHasSeenSplash: (seen: boolean) => void;
    setHasSeenAppGuide: (seen: boolean) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
    language: 'es',
    appTheme: 'dark',
    hasSeenSplash: false,
    hasSeenAppGuide: false,
    setLanguage: (language) => set({ language }),
    setAppTheme: (appTheme) => set({ appTheme }),
    setHasSeenSplash: (hasSeenSplash) => set({ hasSeenSplash }),
    setHasSeenAppGuide: (hasSeenAppGuide) => set({ hasSeenAppGuide }),
}));
