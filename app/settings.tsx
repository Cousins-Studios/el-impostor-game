import { useRouter } from 'expo-router';
import { Globe, Moon, Sun } from 'lucide-react-native';
import { Image, TouchableOpacity, View } from 'react-native';
import appIcon from '../assets/images/icon.png';
import ScreenWrapper from '../components/ScreenWrapper';
import { AppText } from '../components/Typography';
import { FlagIcon } from '../components/icons/FlagIcon';
import { useI18n } from '../constants/i18n';
import { AppTheme, Language, useSettingsStore } from '../store/settingsStore';

export default function SettingsScreen() {
    const router = useRouter();
    const { language, appTheme, setLanguage, setAppTheme } = useSettingsStore();
    const isDark = appTheme === 'dark';
    const t = useI18n();

    const languages: { label: string, value: Language }[] = [
        { label: 'Español', value: 'es' },
        { label: 'English', value: 'en' },
        { label: 'Français', value: 'fr' },
        { label: 'Deutsch', value: 'de' },
        { label: 'Italiano', value: 'it' },
    ];

    const themes: { label: string, value: AppTheme, icon: typeof Sun }[] = [
        { label: t.settings.dark, value: 'dark', icon: Moon },
        { label: t.settings.light, value: 'light', icon: Sun },
    ];

    return (
        <ScreenWrapper showBackButton={true}>
            <View className="mb-8">
                <AppText variant="h1" className="mb-0">{t.settings.title}</AppText>
            </View>

            <View className="gap-4">
                {/* Idioma Section */}
                <View>
                    <View className="flex-row items-center mb-4">
                        <Globe size={20} color="#B6C2E2" className="mr-2" />
                        <AppText variant="label" className="mb-0">{t.settings.language}</AppText>
                    </View>
                    <View className={`${isDark ? 'bg-surface-card border-surface-soft' : 'bg-white border-gray-200'} rounded-2xl overflow-hidden border`}>
                        {languages.map((lang, index) => {
                            const isSelected = language === lang.value;
                            return (
                                <TouchableOpacity
                                    key={lang.value}
                                    onPress={() => setLanguage(lang.value)}
                                    className={`p-4 flex-row justify-between items-center ${index !== languages.length - 1 ? (isDark ? 'border-b border-surface-soft' : 'border-b border-gray-100') : ''} ${isSelected ? (isDark ? 'bg-surface-soft/50' : 'bg-gray-50') : ''}`}
                                >
                                    <View className="flex-row items-center">
                                        <View className="mr-4">
                                            <FlagIcon countryCode={lang.value} size={32} />
                                        </View>
                                        <AppText className={`text-lg ${isSelected ? (isDark ? 'text-white font-bold' : 'text-[#101828] font-bold') : (isDark ? 'text-text-secondary' : 'text-[#475467]')}`}>
                                            {lang.label}
                                        </AppText>
                                    </View>
                                    {isSelected && <View className="w-3 h-3 rounded-full bg-primary-action" />}
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>

                {/* Tema Section */}
                <View>
                    <View className="flex-row items-center mb-4">
                        <Moon size={20} color="#B6C2E2" className="mr-2" />
                        <AppText variant="label" className="mb-0">{t.settings.theme}</AppText>
                    </View>
                    <View className={`${isDark ? 'bg-surface-card border-surface-soft' : 'bg-white border-gray-200'} rounded-2xl overflow-hidden border`}>
                        {themes.map((theme, index) => {
                            const isSelected = appTheme === theme.value;
                            const Icon = theme.icon;
                            return (
                                <TouchableOpacity
                                    key={theme.value}
                                    onPress={() => setAppTheme(theme.value)}
                                    className={`p-5 flex-row justify-between items-center ${index !== themes.length - 1 ? (isDark ? 'border-b border-surface-soft' : 'border-b border-gray-100') : ''} ${isSelected ? (isDark ? 'bg-surface-soft/50' : 'bg-gray-50') : ''}`}
                                >
                                    <View className="flex-row items-center">
                                        <Icon size={20} color={isSelected ? (isDark ? "white" : "#101828") : "#7C8AA5"} className="mr-3" />
                                        <AppText className={`text-lg ${isSelected ? (isDark ? 'text-white font-bold' : 'text-[#101828] font-bold') : (isDark ? 'text-text-secondary' : 'text-[#475467]')}`}>
                                            {theme.label}
                                        </AppText>
                                    </View>
                                    {isSelected && <View className="w-3 h-3 rounded-full bg-primary-action" />}
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>

                {/* Version Section */}
                <View className={`items-center mt-6 border-t ${isDark ? 'border-surface-soft' : 'border-gray-200'} pt-4`}>
                    <Image
                        source={appIcon}
                        style={{ width: 44, height: 44, borderRadius: 10, marginBottom: 8, opacity: 0.6 }}
                    />
                    <AppText className="text-muted text-center text-xs italic">
                        {t.settings.version} 1.0.0
                    </AppText>
                </View>
            </View>
        </ScreenWrapper>
    );
}
