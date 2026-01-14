import { useRouter } from 'expo-router';
import { HelpCircle, Play, Settings, X } from 'lucide-react-native';
import { useState } from 'react';
import { Image, Modal, ScrollView, TouchableOpacity, View } from 'react-native';
import appIcon from '../assets/images/icon.png';
import { Button } from '../components/Button';
import ScreenWrapper from '../components/ScreenWrapper';
import { AppText } from '../components/Typography';
import { useI18n } from '../constants/i18n';
import { useSettingsStore } from '../store/settingsStore';

export default function HomeScreen() {
    const router = useRouter();
    const [showHowToPlay, setShowHowToPlay] = useState(false);
    const { appTheme } = useSettingsStore();
    const isDark = appTheme === 'dark';
    const t = useI18n();

    return (
        <ScreenWrapper className="justify-center items-center">
            {/* Settings Icon */}
            <TouchableOpacity
                onPress={() => router.push('/settings')}
                className="absolute top-4 right-2 p-4"
            >
                <Settings size={28} color={isDark ? "#B6C2E2" : "#475467"} />
            </TouchableOpacity>

            <View className="flex-1 justify-center items-center w-full">
                <Image
                    source={appIcon}
                    style={{ width: 120, height: 120, borderRadius: 24, marginBottom: 24 }}
                    resizeMode="contain"
                />
                <AppText variant="h1" className="text-6xl font-black mb-2 text-center">
                    {t.home.title}
                </AppText>
                <AppText variant="body" className="text-text-secondary text-center text-xl mb-16">
                    {t.home.subtitle}
                </AppText>

                <View className="w-full gap-6 max-w-sm px-4">
                    <Button
                        title={t.home.play}
                        icon={<Play size={24} color="white" fill="white" />}
                        onPress={() => router.push('/setup/players')}
                        className="w-full h-20 rounded-3xl"
                        textClassName="text-2xl"
                    />

                    <TouchableOpacity
                        onPress={() => setShowHowToPlay(true)}
                        className="flex-row items-center justify-center py-2"
                    >
                        <HelpCircle size={22} color={isDark ? "#B6C2E2" : "#475467"} className="mr-2" />
                        <AppText className={`${isDark ? 'text-text-secondary' : 'text-[#475467]'} text-lg font-bold`}>{t.home.howToPlay}</AppText>
                    </TouchableOpacity>
                </View>
            </View>

            {/* How to Play Sheet */}
            <Modal
                visible={showHowToPlay}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setShowHowToPlay(false)}
            >
                <View className="flex-1 justify-end bg-black/40">
                    <TouchableOpacity
                        className="flex-1"
                        activeOpacity={1}
                        onPress={() => setShowHowToPlay(false)}
                    />
                    <View className={`${isDark ? 'bg-[#182235]' : 'bg-white'} rounded-t-[40px] px-6 pt-10 pb-16 shadow-2xl max-h-[90%]`}>
                        <View className="flex-row justify-between items-center mb-10 px-2">
                            <AppText variant="h1" className="text-3xl font-black mb-0">{t.howToPlay.title}</AppText>
                            <TouchableOpacity onPress={() => setShowHowToPlay(false)} className={`${isDark ? 'bg-surface-soft' : 'bg-gray-100'} p-2 rounded-full`}>
                                <X size={24} color={isDark ? "#B6C2E2" : "#475467"} />
                            </TouchableOpacity>
                        </View>

                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            className="px-2"
                        >
                            <View className="gap-10">
                                <View>
                                    <AppText className="text-accent text-xl font-black mb-3">{t.howToPlay.step1Title}</AppText>
                                    <AppText className={`text-lg leading-[27px] ${isDark ? 'text-[#B6C2E2]' : 'text-gray-600'}`}>
                                        {t.howToPlay.step1Desc}
                                    </AppText>
                                </View>

                                <View>
                                    <AppText className="text-accent text-xl font-black mb-3">{t.howToPlay.step2Title}</AppText>
                                    <AppText className={`text-lg leading-[27px] ${isDark ? 'text-[#B6C2E2]' : 'text-gray-600'}`}>
                                        {t.howToPlay.step2Desc}
                                    </AppText>
                                </View>

                                <View>
                                    <AppText className="text-accent text-xl font-black mb-3">{t.howToPlay.step3Title}</AppText>
                                    <AppText className={`text-lg leading-[27px] ${isDark ? 'text-[#B6C2E2]' : 'text-gray-600'}`}>
                                        {t.howToPlay.step3Desc}
                                    </AppText>
                                </View>

                                <View>
                                    <AppText className="text-accent text-xl font-black mb-3">{t.howToPlay.step4Title}</AppText>
                                    <AppText className={`text-lg leading-[27px] ${isDark ? 'text-[#B6C2E2]' : 'text-gray-600'}`}>
                                        {t.howToPlay.step4Desc}
                                    </AppText>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </ScreenWrapper>
    );
}
