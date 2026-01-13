import { useRouter } from 'expo-router';
import { ArrowRight, Check, Film, Globe, PawPrint, PenTool, Pizza, Plus, Trash2, Trophy } from 'lucide-react-native';
import { useState } from 'react';
import { FlatList, TextInput, TouchableOpacity, View } from 'react-native';
import { Button } from '../../components/Button';
import ScreenWrapper from '../../components/ScreenWrapper';
import { AppText } from '../../components/Typography';
import { useI18n } from '../../constants/i18n';
import { PREDEFINED_THEMES, ThemeKey } from '../../constants/Themes';
import { useGameStore } from '../../store/gameStore';
import { useSettingsStore } from '../../store/settingsStore';

const THEME_ICONS: Record<string, any> = {
    Sports: Trophy,
    Animals: PawPrint,
    Food: Pizza,
    Movies: Film,
    Countries: Globe,
    Custom: PenTool,
};

export default function ThemeSelection() {
    const router = useRouter();
    const { settings, updateSettings, addCustomWord, removeCustomWord } = useGameStore();
    const { appTheme } = useSettingsStore();
    const isDark = appTheme === 'dark';
    const [customInput, setCustomInput] = useState('');
    const t = useI18n();

    const themes = [...Object.keys(PREDEFINED_THEMES), 'Custom'];

    const handleAddWord = () => {
        if (customInput.trim()) {
            addCustomWord(customInput.trim());
            setCustomInput('');
        }
    };

    const renderCustomEditor = () => (
        <View className={`mt-4 ${isDark ? 'bg-surface-card' : 'bg-white'} p-6 rounded-[32px] border ${isDark ? 'border-surface-soft' : 'border-gray-100'}`}>
            <AppText variant="label" className="mb-4 text-accent">{t.themeSelection.categories.Custom}</AppText>
            <View className="flex-row gap-2 mb-6">
                <TextInput
                    className={`flex-1 ${isDark ? 'bg-surface-soft border-transparent text-white' : 'bg-gray-100 border-transparent text-[#101828]'} p-4 rounded-2xl font-sans text-lg`}
                    placeholder="Add secret word..."
                    placeholderTextColor={isDark ? "#7C8AA5" : "#98A2B3"}
                    value={customInput}
                    onChangeText={setCustomInput}
                    onSubmitEditing={handleAddWord}
                />
                <TouchableOpacity
                    onPress={handleAddWord}
                    className="bg-primary-action items-center justify-center aspect-square rounded-2xl p-4"
                >
                    <Plus color="white" size={24} />
                </TouchableOpacity>
            </View>

            {settings.customWords.length === 0 ? (
                <AppText variant="body" className="text-center italic opacity-50">No words added yet</AppText>
            ) : (
                <View className="flex-row flex-wrap gap-3">
                    {settings.customWords.map((word, idx) => (
                        <View key={idx} className={`${isDark ? 'bg-surface-soft border-surface-card' : 'bg-gray-50 border-gray-100'} px-4 py-2 rounded-2xl flex-row items-center border`}>
                            <AppText className="mr-3 text-base font-bold">{word}</AppText>
                            <TouchableOpacity onPress={() => removeCustomWord(word)} className="p-1 bg-red-500/10 rounded-full">
                                <Trash2 size={16} color="#E5533D" />
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            )}
        </View>
    );

    return (
        <ScreenWrapper showBackButton={true}>
            <View className="mb-8">
                <AppText variant="h1" className="mb-1 text-4xl font-black">{t.themeSelection.title}</AppText>
                <AppText variant="body" className="text-text-secondary">{t.themeSelection.subtitle}</AppText>
            </View>

            <FlatList
                key="theme-grid-2"
                data={themes}
                keyExtractor={item => item}
                numColumns={2}
                columnWrapperStyle={{ gap: 16 }}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                    const isSelected = settings.theme === item;
                    const Icon = THEME_ICONS[item] || PenTool;
                    // @ts-ignore
                    const translatedName = t.themeSelection.categories[item] || item;

                    return (
                        <TouchableOpacity
                            onPress={() => updateSettings({ theme: item as ThemeKey })}
                            activeOpacity={0.7}
                            className={`flex-1 p-6 mb-4 rounded-[32px] border-2 items-center justify-center ${isSelected
                                ? 'bg-primary-action/10 border-primary-action shadow-lg shadow-primary-action/20'
                                : (isDark ? 'bg-surface-card border-transparent' : 'bg-white border-gray-100 shadow-sm')
                                }`}
                        >
                            <View className={`p-4 rounded-full mb-4 ${isSelected ? 'bg-primary-action/20' : (isDark ? 'bg-[#1F2A44]' : 'bg-gray-50')}`}>
                                <Icon
                                    size={32}
                                    color={isSelected ? "#E5533D" : (isDark ? "#B6C2E2" : "#475467")}
                                    strokeWidth={isSelected ? 2.5 : 2}
                                />
                            </View>
                            <AppText className={`text-lg text-center ${isSelected ? 'font-black text-white' : (isDark ? 'text-text-secondary' : 'text-gray-500')}`}>
                                {translatedName}
                            </AppText>

                            {isSelected && (
                                <View className="absolute top-4 right-4 bg-primary-action rounded-full p-1">
                                    <Check color="white" size={14} strokeWidth={4} />
                                </View>
                            )}
                        </TouchableOpacity>
                    );
                }}
                ListFooterComponent={<View className="pb-32">{settings.theme === 'Custom' ? renderCustomEditor() : null}</View>}
            />

            <View className="absolute bottom-6 left-6 right-6">
                <Button
                    title={t.playerSetup.startGame}
                    disabled={settings.theme === 'Custom' && settings.customWords.length === 0}
                    onPress={() => router.push('/setup/confirm')}
                    icon={<ArrowRight size={22} color="white" />}
                    iconPosition="right"
                />
            </View>
        </ScreenWrapper>
    );
}
