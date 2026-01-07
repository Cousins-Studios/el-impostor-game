import { useRouter } from 'expo-router';
import { ChevronLeft, Globe, Moon, Sun } from 'lucide-react-native';
import { TouchableOpacity, View } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import { AppText } from '../components/Typography';
import { AppTheme, Language, useSettingsStore } from '../store/settingsStore';

export default function SettingsScreen() {
    const router = useRouter();
    const { language, appTheme, setLanguage, setAppTheme } = useSettingsStore();
    const isDark = appTheme === 'dark';

    const languages: { label: string, value: Language }[] = [
        { label: 'Español', value: 'es' },
        { label: 'English', value: 'en' },
    ];

    const themes: { label: string, value: AppTheme, icon: typeof Sun }[] = [
        { label: 'Oscuro', value: 'dark', icon: Moon },
        { label: 'Claro', value: 'light', icon: Sun },
    ];

    return (
        <ScreenWrapper>
            <View className="flex-row items-center mb-8">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className={`${isDark ? 'bg-surface-soft' : 'bg-gray-200'} p-2 rounded-full mr-4`}
                >
                    <ChevronLeft size={28} color={isDark ? "white" : "#101828"} />
                </TouchableOpacity>
                <AppText variant="h1" className="mb-0">Configuración</AppText>
            </View>

            <View className="gap-8">
                {/* Idioma Section */}
                <View>
                    <View className="flex-row items-center mb-4">
                        <Globe size={20} color="#B6C2E2" className="mr-2" />
                        <AppText variant="label" className="mb-0">Idioma</AppText>
                    </View>
                    <View className={`${isDark ? 'bg-surface-card border-surface-soft' : 'bg-white border-gray-200'} rounded-2xl overflow-hidden border`}>
                        {languages.map((lang, index) => {
                            const isSelected = language === lang.value;
                            return (
                                <TouchableOpacity
                                    key={lang.value}
                                    onPress={() => setLanguage(lang.value)}
                                    className={`p-5 flex-row justify-between items-center ${index !== languages.length - 1 ? (isDark ? 'border-b border-surface-soft' : 'border-b border-gray-100') : ''} ${isSelected ? (isDark ? 'bg-surface-soft/50' : 'bg-gray-50') : ''}`}
                                >
                                    <AppText className={`text-lg ${isSelected ? (isDark ? 'text-white font-bold' : 'text-[#101828] font-bold') : (isDark ? 'text-text-secondary' : 'text-[#475467]')}`}>
                                        {lang.label}
                                    </AppText>
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
                        <AppText variant="label" className="mb-0">Tema</AppText>
                    </View>
                    <View className={`${isDark ? 'bg-surface-card border-surface-soft' : 'bg-white border-gray-200'} rounded-2xl overflow-hidden border`}>
                        {themes.map((t, index) => {
                            const isSelected = appTheme === t.value;
                            const Icon = t.icon;
                            return (
                                <TouchableOpacity
                                    key={t.value}
                                    onPress={() => setAppTheme(t.value)}
                                    className={`p-5 flex-row justify-between items-center ${index !== themes.length - 1 ? (isDark ? 'border-b border-surface-soft' : 'border-b border-gray-100') : ''} ${isSelected ? (isDark ? 'bg-surface-soft/50' : 'bg-gray-50') : ''}`}
                                >
                                    <View className="flex-row items-center">
                                        <Icon size={20} color={isSelected ? (isDark ? "white" : "#101828") : "#7C8AA5"} className="mr-3" />
                                        <AppText className={`text-lg ${isSelected ? (isDark ? 'text-white font-bold' : 'text-[#101828] font-bold') : (isDark ? 'text-text-secondary' : 'text-[#475467]')}`}>
                                            {t.label}
                                        </AppText>
                                    </View>
                                    {isSelected && <View className="w-3 h-3 rounded-full bg-primary-action" />}
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>

                <View className={`mt-8 border-t ${isDark ? 'border-surface-soft' : 'border-gray-200'} pt-8`}>
                    <AppText className="text-muted text-center italic">
                        El Impostor v1.0.0
                    </AppText>
                </View>
            </View>
        </ScreenWrapper>
    );
}
