import { useRouter } from 'expo-router';
import { ArrowRight, HelpCircle, Minus, Plus, X } from 'lucide-react-native';
import { useState } from 'react';
import { Image, Modal, ScrollView, TouchableOpacity, View } from 'react-native';
import appIcon from '../../assets/images/icon.png';
import { Button } from '../../components/Button';
import ScreenWrapper from '../../components/ScreenWrapper';
import { AppText } from '../../components/Typography';
import { useI18n } from '../../constants/i18n';
import { useGameStore } from '../../store/gameStore';
import { useSettingsStore } from '../../store/settingsStore';

export default function GameConfig() {
    const { players, settings, updateSettings } = useGameStore();
    const { appTheme } = useSettingsStore();
    const isDark = appTheme === 'dark';
    const router = useRouter();
    const t = useI18n();
    const [showHelp, setShowHelp] = useState(false);

    const maxImpostors = Math.max(1, Math.floor(players.length / 2));

    const incrementCount = () => {
        if (settings.impostorCount < maxImpostors) {
            updateSettings({ impostorCount: settings.impostorCount + 1 });
        }
    };

    const decrementCount = () => {
        if (settings.impostorCount > 1) {
            updateSettings({ impostorCount: settings.impostorCount - 1 });
        }
    };

    return (
        <ScreenWrapper showBackButton={true}>
            <View className="flex-1">
                <View className="mb-4">
                    <AppText variant="h1" className="text-4xl font-black mb-1">{t.gameConfig.title}</AppText>
                    <AppText variant="body" className="text-text-secondary text-base">{t.gameConfig.impostorDesc}</AppText>
                </View>

                {/* Impostors Section */}
                <View className="mb-4">
                    <AppText className={`text-lg font-bold mb-3 ${isDark ? 'text-white' : 'text-[#101828]'}`}>{t.gameConfig.impostors}</AppText>

                    <View className={`flex-row mb-4 ${isDark ? 'bg-surface-soft' : 'bg-gray-200'} p-1 rounded-2xl`}>
                        {['fixed', 'probability'].map((mode) => {
                            const isSelected = settings.impostorMode === mode;
                            return (
                                <TouchableOpacity
                                    key={mode}
                                    onPress={() => updateSettings({ impostorMode: mode as any })}
                                    className={`flex-1 items-center py-2.5 rounded-xl ${isSelected ? (isDark ? 'bg-[#2A3755] shadow-sm' : 'bg-white shadow-sm') : ''}`}
                                >
                                    <AppText className={`text-base font-bold ${isSelected ? (isDark ? 'text-white' : 'text-[#101828]') : (isDark ? 'text-[#7C8AA5]' : 'text-gray-500')}`}>
                                        {mode === 'fixed' ? t.gameConfig.modeFixed : t.gameConfig.modeProb}
                                    </AppText>
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    <View className={`${isDark ? 'bg-surface-card' : 'bg-white shadow-sm'} p-5 rounded-[28px] border ${isDark ? 'border-transparent' : 'border-gray-100'}`}>
                        {settings.impostorMode === 'fixed' ? (
                            <>
                                <AppText variant="label" className="text-xs uppercase tracking-widest mb-3 opacity-70">{t.gameConfig.count}</AppText>
                                <View className={`flex-row items-center justify-between ${isDark ? 'bg-[#121A2B]' : 'bg-gray-50'} p-2 rounded-2xl mb-3`}>
                                    <TouchableOpacity
                                        onPress={decrementCount}
                                        className={`${isDark ? 'bg-[#1F2A44]' : 'bg-gray-200'} w-11 h-11 rounded-xl items-center justify-center`}
                                    >
                                        <Minus color={isDark ? "white" : "#101828"} size={18} strokeWidth={3} />
                                    </TouchableOpacity>
                                    <AppText className="text-3xl font-black">{settings.impostorCount}</AppText>
                                    <TouchableOpacity
                                        onPress={incrementCount}
                                        className="bg-primary-action w-11 h-11 rounded-xl items-center justify-center"
                                    >
                                        <Plus color="white" size={18} strokeWidth={3} />
                                    </TouchableOpacity>
                                </View>
                            </>
                        ) : (
                            <>
                                <AppText variant="label" className="text-[10px] uppercase tracking-widest mb-1 opacity-70">{t.gameConfig.prob}</AppText>
                                <AppText className="text-xl font-black mb-3">{settings.impostorProbability}%</AppText>

                                <View className="flex-row gap-2 mb-5">
                                    {[25, 50, 75].map((prob) => {
                                        const isSelected = settings.impostorProbability === prob;
                                        return (
                                            <TouchableOpacity
                                                key={prob}
                                                onPress={() => updateSettings({ impostorProbability: prob })}
                                                className={`flex-1 py-2 rounded-xl items-center border ${isSelected ? 'bg-primary-action border-primary-action' : (isDark ? 'bg-[#1F2A44] border-transparent' : 'bg-gray-100 border-transparent')}`}
                                            >
                                                <AppText className={`text-sm font-bold ${isSelected ? 'text-white' : (isDark ? 'text-[#7C8AA5]' : 'text-gray-500')}`}>{prob}%</AppText>
                                            </TouchableOpacity>
                                        );
                                    })}
                                </View>
                            </>
                        )}
                    </View>

                    {/* Explanation Button */}
                    <TouchableOpacity
                        onPress={() => setShowHelp(true)}
                        className="flex-row items-center justify-center py-6 mt-2"
                    >
                        <HelpCircle size={22} color={isDark ? "#B6C2E2" : "#475467"} className="mr-2" />
                        <AppText className={`${isDark ? 'text-text-secondary' : 'text-[#475467]'} text-lg font-bold`}>
                            {t.gameConfig.modeExplained}
                        </AppText>
                    </TouchableOpacity>
                </View>
            </View>

            <View className="pb-6">
                <Button
                    title={t.gameConfig.continue}
                    onPress={() => router.push('/setup/theme')}
                    icon={<ArrowRight size={22} color="white" />}
                    iconPosition="right"
                />
            </View>

            {/* Help Modal */}
            <Modal
                visible={showHelp}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setShowHelp(false)}
            >
                <View className="flex-1 justify-end bg-black/40">
                    <TouchableOpacity
                        className="flex-1"
                        activeOpacity={1}
                        onPress={() => setShowHelp(false)}
                    />
                    <View className={`${isDark ? 'bg-[#182235]' : 'bg-white'} rounded-t-[40px] px-6 pt-10 pb-16 shadow-2xl max-h-[90%]`}>
                        <View className="flex-row justify-between items-center mb-8 px-2">
                            <AppText variant="h1" className="text-3xl font-black mb-0">{t.gameConfig.mode}</AppText>
                            <TouchableOpacity onPress={() => setShowHelp(false)} className={`${isDark ? 'bg-surface-soft' : 'bg-gray-100'} p-2 rounded-full`}>
                                <X size={24} color={isDark ? "#B6C2E2" : "#475467"} />
                            </TouchableOpacity>
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false} className="px-2">
                            <View className="gap-8">
                                <View>
                                    <View className="flex-row items-center mb-3">
                                        <View className="w-2 h-8 bg-primary-action rounded-full mr-3" />
                                        <AppText className="text-primary-action text-2xl font-black">{t.gameConfig.helpFixedTitle}</AppText>
                                    </View>
                                    <AppText className={`text-lg leading-[27px] ${isDark ? 'text-[#B6C2E2]' : 'text-gray-600'}`}>
                                        {t.gameConfig.helpFixedDesc}
                                    </AppText>
                                </View>

                                <View>
                                    <View className="flex-row items-center mb-3">
                                        <View className="w-2 h-8 bg-accent rounded-full mr-3" />
                                        <AppText className="text-accent text-2xl font-black">{t.gameConfig.helpProbTitle}</AppText>
                                    </View>
                                    <AppText className={`text-lg leading-[27px] ${isDark ? 'text-[#B6C2E2]' : 'text-gray-600'}`}>
                                        {t.gameConfig.helpProbDesc}
                                    </AppText>
                                </View>
                            </View>

                            <TouchableOpacity
                                onPress={() => setShowHelp(false)}
                                className="mt-12 mb-4"
                            >
                                <Button title={t.common.confirm} onPress={() => setShowHelp(false)} />
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
            </Modal>

            {/* Subtle app branding */}
            <Image
                source={appIcon}
                style={{ position: 'absolute', bottom: 8, right: 8, width: 20, height: 20, borderRadius: 4, opacity: 0.2 }}
            />
        </ScreenWrapper>
    );
}
