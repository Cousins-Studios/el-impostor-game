import { useRouter } from 'expo-router';
import { BookOpen, CheckCircle2, Hand, HelpCircle, Layers, Play, PlayCircle, Settings, Users, X } from 'lucide-react-native';
import { useState } from 'react';
import { Dimensions, FlatList, Image, Modal, ScrollView, TouchableOpacity, View } from 'react-native';
import appIcon from '../assets/images/icon.png';
import { Button } from '../components/Button';
import ScreenWrapper from '../components/ScreenWrapper';
import { AppText } from '../components/Typography';
import { useI18n } from '../constants/i18n';
import { useSettingsStore } from '../store/settingsStore';

export default function HomeScreen() {
    const router = useRouter();
    const [showHowToPlay, setShowHowToPlay] = useState(false);
    const [showAppGuide, setShowAppGuide] = useState(false);
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

                <View className="w-full max-w-sm self-center">
                    <Button
                        title={t.home.play}
                        icon={<Play size={24} color="white" fill="white" />}
                        onPress={() => router.push('/setup/players')}
                        className="w-full max-w-sm h-20 rounded-3xl self-center"
                        textClassName="text-2xl"
                    />

                    <TouchableOpacity
                        onPress={() => setShowHowToPlay(true)}
                        className="flex-row items-center justify-center py-2 mt-6"
                    >
                        <HelpCircle size={22} color={isDark ? "#B6C2E2" : "#475467"} className="mr-2" />
                        <AppText className={`${isDark ? 'text-text-secondary' : 'text-[#475467]'} text-lg font-bold`}>{t.home.howToPlay}</AppText>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => setShowAppGuide(true)}
                        className="flex-row items-center justify-center py-2 mt-4"
                    >
                        <BookOpen size={22} color={isDark ? "#B6C2E2" : "#475467"} className="mr-2" />
                        <AppText className={`${isDark ? 'text-text-secondary' : 'text-[#475467]'} text-lg font-bold`}>{t.home.appGuideButton}</AppText>
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

            {/* App Guide Modal */}
            <Modal
                visible={showAppGuide}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowAppGuide(false)}
            >
                <View className="flex-1 justify-end bg-black/60">
                    <TouchableOpacity
                        className="flex-1"
                        activeOpacity={1}
                        onPress={() => setShowAppGuide(false)}
                    />
                    <View className={`${isDark ? 'bg-[#101827]' : 'bg-white'} rounded-t-[32px] pt-8 pb-10 shadow-2xl h-[80%]`}>
                        {/* Header */}
                        <View className="flex-row justify-between items-center px-8 mb-4">
                            <View>
                                <AppText className="text-accent font-bold text-sm tracking-widest uppercase mb-1">TUTORIAL</AppText>
                                <AppText variant="h1" className="text-3xl font-black">{t.appGuide.title}</AppText>
                            </View>
                            <TouchableOpacity
                                onPress={() => setShowAppGuide(false)}
                                className={`w-12 h-12 rounded-full items-center justify-center ${isDark ? 'bg-surface-soft' : 'bg-gray-100'}`}
                            >
                                <X size={24} color={isDark ? "#B6C2E2" : "#475467"} strokeWidth={2.5} />
                            </TouchableOpacity>
                        </View>

                        <AppGuideContent t={t} isDark={isDark} onClose={() => setShowAppGuide(false)} />
                    </View>
                </View>
            </Modal>
        </ScreenWrapper>
    );
}

// Subcomponent for better organization and performance
function AppGuideContent({ t, isDark, onClose }: { t: any, isDark: boolean, onClose: () => void }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const { width } = Dimensions.get('window');

    const steps = [
        {
            icon: <Users size={56} color={isDark ? "#4CC9F0" : "#0EA5E9"} strokeWidth={2} />,
            title: t.appGuide.step1Title,
            desc: t.appGuide.step1Desc,
            color: isDark ? "#4CC9F0" : "#0EA5E9"
        },
        {
            icon: <Settings size={56} color={isDark ? "#E5533D" : "#EF4444"} strokeWidth={2} />,
            title: t.appGuide.step2Title,
            desc: t.appGuide.step2Desc,
            color: isDark ? "#E5533D" : "#EF4444"
        },
        {
            icon: <Layers size={56} color={isDark ? "#4CC9F0" : "#0EA5E9"} strokeWidth={2} />,
            title: t.appGuide.step3Title,
            desc: t.appGuide.step3Desc,
            color: isDark ? "#4CC9F0" : "#0EA5E9"
        },
        {
            icon: <Hand size={56} color={isDark ? "#E5533D" : "#EF4444"} strokeWidth={2} />,
            title: t.appGuide.step4Title,
            desc: t.appGuide.step4Desc,
            color: isDark ? "#E5533D" : "#EF4444"
        },
        {
            icon: <PlayCircle size={56} color={isDark ? "#4CC9F0" : "#0EA5E9"} strokeWidth={2} />,
            title: t.appGuide.step5Title,
            desc: t.appGuide.step5Desc,
            color: isDark ? "#4CC9F0" : "#0EA5E9"
        },
        {
            icon: <CheckCircle2 size={56} color="#10B981" strokeWidth={2} />,
            title: t.appGuide.step6Title,
            desc: t.appGuide.step6Desc,
            color: "#10B981",
            isLast: true
        }
    ];

    const handleScroll = (event: any) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(contentOffsetX / width);
        setCurrentIndex(index);
    };

    return (
        <View className="flex-1">
            <FlatList
                data={steps}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                keyExtractor={(_, i) => `step-${i}`}
                renderItem={({ item, index }) => (
                    <View style={{ width }} className="items-center justify-center px-8">
                        {/* Content Container - No Card Background */}
                        <View className="items-center w-full">

                            {/* Icon with subtle glow instead of container */}
                            <View
                                className="mb-12 relative items-center justify-center"
                            >
                                <View
                                    className="absolute w-32 h-32 rounded-full opacity-20 blur-xl"
                                    style={{ backgroundColor: item.color }}
                                />
                                {item.icon}
                            </View>

                            {/* Title */}
                            <AppText className={`text-3xl font-black text-center mb-6 leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                {item.title}
                            </AppText>

                            {/* Description */}
                            <AppText className={`text-xl text-center leading-8 font-medium opacity-80 ${isDark ? 'text-blue-100' : 'text-gray-600'}`}>
                                {item.desc}
                            </AppText>

                            {/* Action Button (Only on last slide) */}
                            {item.isLast && (
                                <View className="w-full mt-12">
                                    <TouchableOpacity
                                        onPress={onClose}
                                        className="w-full py-4 rounded-full bg-primary-action items-center shadow-lg shadow-primary-action/30"
                                    >
                                        <AppText className="text-white font-bold text-lg uppercase tracking-widest">
                                            {t.appGuide.finish}
                                        </AppText>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    </View>
                )}
            />

            {/* Pagination Dots */}
            <View className="flex-row justify-center items-center space-x-3 pb-8">
                {steps.map((_, i) => (
                    <View
                        key={i}
                        className={`h-2 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-8' : 'w-2'}`}
                        style={{ backgroundColor: i === currentIndex ? (isDark ? '#E5533D' : '#101828') : (isDark ? '#2A3755' : '#D1D5DB') }}
                    />
                ))}
            </View>
        </View>
    );

}
