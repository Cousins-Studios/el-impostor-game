import { useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Defs, LinearGradient, Rect, Stop, Svg } from 'react-native-svg';
import appIcon from '../../assets/images/icon.png';
import { Button } from '../../components/Button';
import ScreenWrapper from '../../components/ScreenWrapper';
import { AppText } from '../../components/Typography';
import { useI18n } from '../../constants/i18n';
import { useGameStore } from '../../store/gameStore';
import { useSettingsStore } from '../../store/settingsStore';

export default function VoteScreen() {
    const { players, voteToEliminate: eliminatePlayer } = useGameStore();
    const { appTheme } = useSettingsStore();
    const isDark = appTheme === 'dark';
    const router = useRouter();
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const scrollOffset = useSharedValue(0);
    const contentHeight = useSharedValue(0);
    const layoutHeight = useSharedValue(0);
    const t = useI18n();

    const alivePlayers = players.filter(p => p.isAlive);

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

    const handleEliminate = () => {
        if (selectedId) {
            eliminatePlayer(selectedId);
            router.replace('/game/elimination');
        }
    };

    return (
        <ScreenWrapper showBackButton={true}>
            <View className="flex-1 px-4">
                <View className="mt-8 mb-6">
                    <AppText variant="h1" className={`text-4xl font-black mb-2 ${isDark ? 'text-white' : 'text-[#101828]'}`}>
                        {t.vote.title}
                    </AppText>
                    <AppText className="text-text-secondary text-lg">
                        {t.vote.subtitle}
                    </AppText>
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
                        data={alivePlayers}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingTop: 10, paddingBottom: 20 }}
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
                            const isSelected = selectedId === item.id;
                            return (
                                <TouchableOpacity
                                    onPress={() => setSelectedId(item.id)}
                                    activeOpacity={0.7}
                                    className={`p-6 mb-4 rounded-3xl border-2 ${isSelected
                                        ? 'bg-primary-action/10 border-primary-action shadow-lg'
                                        : (isDark ? 'bg-[#182235] border-transparent' : 'bg-white border-gray-100 shadow-sm')
                                        }`}
                                >
                                    <AppText className={`text-xl font-bold ${isSelected ? (isDark ? 'text-white' : 'text-[#101828]') : (isDark ? 'text-[#B6C2E2]' : 'text-gray-600')
                                        }`}>
                                        {item.name}
                                    </AppText>
                                </TouchableOpacity>
                            );
                        }}
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

                {/* Footer Section */}
                <View className="py-6">
                    <Button
                        title={t.vote.eliminate}
                        disabled={!selectedId}
                        onPress={handleEliminate}
                        className="w-full h-16"
                    />
                </View>
            </View>

            {/* Subtle app branding */}
            <Image
                source={appIcon}
                style={{ position: 'absolute', bottom: 8, right: 8, width: 20, height: 20, borderRadius: 4, opacity: 0.1 }}
            />
        </ScreenWrapper>
    );
}
