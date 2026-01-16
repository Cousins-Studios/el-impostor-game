import { useRouter } from 'expo-router';
import { ArrowRight, Check, Film, Globe, Heart, Lightbulb, PawPrint, PenTool, Pizza, Plus, Shuffle, Sparkles, Trash2, Trophy, Users, X } from 'lucide-react-native';
import { useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, Modal, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { Defs, LinearGradient, Rect, Stop, Svg } from 'react-native-svg';
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
    const [showIdeas, setShowIdeas] = useState(false);
    const scrollOffset = useSharedValue(0);
    const contentHeight = useSharedValue(0);
    const layoutHeight = useSharedValue(0);
    const t = useI18n();

    const topFadeStyle = useAnimatedStyle(() => {
        return {
            opacity: withTiming(scrollOffset.value > 5 ? 1 : 0, { duration: 300 })
        };
    });

    const bottomFadeStyle = useAnimatedStyle(() => {
        const canScroll = contentHeight.value > layoutHeight.value;
        const hasMoreContent = (contentHeight.value - layoutHeight.value - scrollOffset.value) > 10;
        return {
            opacity: withTiming(canScroll && hasMoreContent ? 1 : 0, { duration: 300 })
        };
    });
    const flatListRef = useRef<FlatList>(null);

    // Ripple animation for ideas button
    const rippleScale = useSharedValue(1);
    const rippleOpacity = useSharedValue(0.2);
    useEffect(() => {
        rippleScale.value = withRepeat(
            withSequence(
                withTiming(1, { duration: 0 }),
                withTiming(1.4, { duration: 1400, easing: Easing.out(Easing.ease) })
            ),
            -1,
            false
        );
        rippleOpacity.value = withRepeat(
            withSequence(
                withTiming(0.18, { duration: 0 }),
                withTiming(0, { duration: 1400, easing: Easing.out(Easing.ease) })
            ),
            -1,
            false
        );
    }, []);
    const rippleStyle = useAnimatedStyle(() => ({
        transform: [{ scale: rippleScale.value }],
        opacity: rippleOpacity.value
    }));

    const predefinedThemes = PREDEFINED_THEMES ?? {};
    const themes = [...Object.keys(predefinedThemes), 'Custom'];

    useEffect(() => {
        if (settings.theme === 'Custom') {
            setTimeout(() => {
                flatListRef.current?.scrollToEnd({ animated: true });
            }, 100);
        }
    }, [settings.theme]);

    const handleAddWord = () => {
        if (customInput.trim()) {
            addCustomWord(customInput.trim());
            setCustomInput('');
            // Scroll again after adding word to keep the list visible
            setTimeout(() => {
                flatListRef.current?.scrollToEnd({ animated: true });
            }, 100);
        }
    };

    const renderCustomEditor = () => (
        <View className={`mt-4 ${isDark ? 'bg-surface-card' : 'bg-white'} p-6 rounded-[32px] border ${isDark ? 'border-surface-soft' : 'border-gray-100'}`}>
            <View className="flex-row justify-between items-center mb-4">
                <AppText variant="label" className="text-accent">{t.themeSelection.categories.Custom}</AppText>
                <TouchableOpacity onPress={() => setShowIdeas(true)} activeOpacity={0.7}>
                    <View className="relative items-center justify-center">
                        <Animated.View
                            style={rippleStyle}
                            className={`absolute w-9 h-9 rounded-full ${isDark ? 'bg-yellow-500' : 'bg-yellow-400'}`}
                        />
                        <View className={`p-2 rounded-full ${isDark ? 'bg-yellow-500/15' : 'bg-yellow-100'}`}>
                            <Lightbulb size={18} color={isDark ? "#FBBF24" : "#D97706"} />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
            <View className="flex-row gap-2 mb-6">
                <TextInput
                    className={`flex-1 h-14 ${isDark ? 'bg-surface-soft border-transparent text-white' : 'bg-gray-100 border-transparent text-[#101828]'} px-4 rounded-2xl font-sans text-lg`}
                    placeholder={t.themeSelection.addWord}
                    placeholderTextColor={isDark ? "#7C8AA5" : "#98A2B3"}
                    value={customInput}
                    onChangeText={setCustomInput}
                    onSubmitEditing={handleAddWord}
                />
                <TouchableOpacity
                    onPress={handleAddWord}
                    className="bg-primary-action items-center justify-center aspect-square rounded-2xl h-14"
                >
                    <Plus color="white" size={24} />
                </TouchableOpacity>
            </View>

            {settings.customWords.length === 0 ? (
                <AppText variant="body" className="text-center italic opacity-50">{t.themeSelection.noWordsAdded}</AppText>
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

            <View className="flex-1 relative">
                {/* Top Fade */}
                <Animated.View style={[{ position: 'absolute', top: 0, left: 0, right: 0, height: 32, zIndex: 10 }, topFadeStyle]} pointerEvents="none">
                    <Svg height="100%" width="100%">
                        <Defs>
                            <LinearGradient id="topFade" x1="0" y1="0" x2="0" y2="1">
                                <Stop offset="0" stopColor={isDark ? '#101827' : '#F2F4F7'} stopOpacity="1" />
                                <Stop offset="1" stopColor={isDark ? '#101827' : '#F2F4F7'} stopOpacity="0" />
                            </LinearGradient>
                        </Defs>
                        <Rect x="0" y="0" width="100%" height="100%" fill="url(#topFade)" />
                    </Svg>
                </Animated.View>

                <FlatList
                    ref={flatListRef}
                    key="theme-grid-2"
                    data={themes}
                    keyExtractor={item => item}
                    numColumns={2}
                    columnWrapperStyle={{ gap: 16 }}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingTop: 10 }}
                    onScroll={(e) => {
                        scrollOffset.value = e.nativeEvent.contentOffset.y;
                    }}
                    onContentSizeChange={(_, height) => {
                        contentHeight.value = height;
                    }}
                    onLayout={(e) => {
                        layoutHeight.value = e.nativeEvent.layout.height;
                    }}
                    scrollEventThrottle={16}
                    renderItem={({ item }) => {
                        const isSelected = settings.theme === item;
                        const Icon = THEME_ICONS[item] || PenTool;
                        // @ts-ignore
                        const translatedName = t.themeSelection.categories[item] || item;

                        return (
                            <TouchableOpacity
                                onPress={() => updateSettings({ theme: item as ThemeKey })}
                                activeOpacity={0.7}
                                className={`flex-1 p-5 mb-4 rounded-[32px] border-2 items-center justify-center ${isSelected
                                    ? 'bg-primary-action/10 border-primary-action shadow-primary-action/20'
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

                {/* Bottom Fade */}
                <Animated.View style={[{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 40, zIndex: 10 }, bottomFadeStyle]} pointerEvents="none">
                    <Svg height="100%" width="100%">
                        <Defs>
                            <LinearGradient id="bottomFade" x1="0" y1="0" x2="0" y2="1">
                                <Stop offset="0" stopColor={isDark ? '#101827' : '#F2F4F7'} stopOpacity="0" />
                                <Stop offset="1" stopColor={isDark ? '#101827' : '#F2F4F7'} stopOpacity="1" />
                            </LinearGradient>
                        </Defs>
                        <Rect x="0" y="0" width="100%" height="100%" fill="url(#bottomFade)" />
                    </Svg>
                </Animated.View>
            </View>

            <View className="absolute bottom-6 left-6 right-6">
                <Button
                    title={t.playerSetup.startGame}
                    disabled={settings.theme === 'Custom' && settings.customWords.length === 0}
                    onPress={() => router.push('/setup/confirm')}
                    icon={<ArrowRight size={22} color="white" />}
                    iconPosition="right"
                />
            </View>

            {/* Custom Theme Ideas Modal */}
            <Modal
                visible={showIdeas}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowIdeas(false)}
            >
                <View className="flex-1 justify-end bg-black/60">
                    <TouchableOpacity
                        className="flex-1"
                        activeOpacity={1}
                        onPress={() => setShowIdeas(false)}
                    />
                    <View className={`${isDark ? 'bg-[#101827]' : 'bg-white'} rounded-t-[32px] pt-8 pb-10 shadow-2xl h-[75%]`}>
                        {/* Header */}
                        <View className="flex-row justify-between items-center px-8 mb-4">
                            <View>
                                <AppText className="text-yellow-500 font-bold text-sm tracking-widest uppercase mb-1">IDEAS</AppText>
                                <AppText variant="h1" className="text-3xl font-black">{t.themeSelection.ideas.title}</AppText>
                            </View>
                            <TouchableOpacity
                                onPress={() => setShowIdeas(false)}
                                className={`w-12 h-12 rounded-full items-center justify-center ${isDark ? 'bg-surface-soft' : 'bg-gray-100'}`}
                            >
                                <X size={24} color={isDark ? "#B6C2E2" : "#475467"} strokeWidth={2.5} />
                            </TouchableOpacity>
                        </View>

                        <CustomThemeIdeasContent t={t} isDark={isDark} onClose={() => setShowIdeas(false)} />
                    </View>
                </View>
            </Modal>
        </ScreenWrapper>
    );
}

// Slideshow component for custom theme ideas
function CustomThemeIdeasContent({ t, isDark, onClose }: { t: any, isDark: boolean, onClose: () => void }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const { width } = Dimensions.get('window');

    const ideas = [
        {
            icon: <Users size={56} color={isDark ? "#4CC9F0" : "#0EA5E9"} strokeWidth={2} />,
            title: t.themeSelection.ideas.playerNames.title,
            desc: t.themeSelection.ideas.playerNames.desc,
            color: isDark ? "#4CC9F0" : "#0EA5E9"
        },
        {
            icon: <Shuffle size={56} color={isDark ? "#A855F7" : "#9333EA"} strokeWidth={2} />,
            title: t.themeSelection.ideas.themeMix.title,
            desc: t.themeSelection.ideas.themeMix.desc,
            color: isDark ? "#A855F7" : "#9333EA"
        },
        {
            icon: <Heart size={56} color={isDark ? "#F472B6" : "#EC4899"} strokeWidth={2} />,
            title: t.themeSelection.ideas.knownPeople.title,
            desc: t.themeSelection.ideas.knownPeople.desc,
            color: isDark ? "#F472B6" : "#EC4899"
        },
        {
            icon: <Sparkles size={56} color={isDark ? "#FBBF24" : "#F59E0B"} strokeWidth={2} />,
            title: t.themeSelection.ideas.beCreative.title,
            desc: t.themeSelection.ideas.beCreative.desc,
            color: isDark ? "#FBBF24" : "#F59E0B",
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
                data={ideas}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                keyExtractor={(_, i) => `idea-${i}`}
                renderItem={({ item }) => (
                    <View style={{ width }} className="items-center justify-center px-8">
                        <View className="items-center w-full">
                            {/* Icon */}
                            <View className="mb-12">
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
                                <View className="w-full mt-8">
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
                {ideas.map((_, i) => (
                    <View
                        key={i}
                        className={`h-2 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-8' : 'w-2'}`}
                        style={{ backgroundColor: i === currentIndex ? (isDark ? '#FBBF24' : '#F59E0B') : (isDark ? '#2A3755' : '#D1D5DB') }}
                    />
                ))}
            </View>
        </View>
    );
}
