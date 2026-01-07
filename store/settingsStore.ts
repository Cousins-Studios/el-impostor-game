import { create } from 'zustand';

export type Language = 'es' | 'en' | 'fr' | 'de' | 'it';
export type AppTheme = 'dark' | 'light';

interface SettingsState {
    language: Language;
    appTheme: AppTheme;
    setLanguage: (lang: Language) => void;
    setAppTheme: (theme: AppTheme) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
    language: 'es',
    appTheme: 'dark',
    setLanguage: (language) => set({ language }),
    setAppTheme: (appTheme) => set({ appTheme }),
}));
