import { useRouter } from 'expo-router';
import { AlertCircle, ArrowRight, Fingerprint, ShieldCheck } from 'lucide-react-native';
import { useState } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import appIcon from '../../assets/images/icon.png';
import { Button } from '../../components/Button';
import ScreenWrapper from '../../components/ScreenWrapper';
import { AppText } from '../../components/Typography';
import { useI18n } from '../../constants/i18n';
import { useGameStore } from '../../store/gameStore';
import { useSettingsStore } from '../../store/settingsStore';

export default function RevealScreen() {
    const { players, secretWord } = useGameStore();
    const { appTheme } = useSettingsStore();
    const isDark = appTheme === 'dark';
    const [index, setIndex] = useState(0);
    const currentPlayer = players[index];
    const router = useRouter();
    const t = useI18n();

    const rotate = useSharedValue(0);
    const scale = useSharedValue(1);

    const frontStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { rotateY: `${rotate.value}deg` },
                { scale: scale.value }
            ],
            opacity: interpolate(rotate.value, [85, 95], [1, 0]),
            backfaceVisibility: 'hidden',
        };
    });

    const backStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { rotateY: `${rotate.value + 180}deg` },
                { scale: scale.value }
            ],
            opacity: interpolate(rotate.value, [85, 95], [0, 1]),
            backfaceVisibility: 'hidden',
        };
    });

    const handlePressIn = () => {
        rotate.value = withTiming(180, { duration: 500 });
        scale.value = withSpring(1.02); // Reduced scale to avoid collisions
    };

    const handlePressOut = () => {
        rotate.value = withTiming(0, { duration: 400 });
        scale.value = withSpring(1);
    };

    const handleBack = () => {
        if (index > 0) {
            setIndex(index - 1);
            rotate.value = 0;
        } else {
            router.back();
        }
    };

    const handleNext = () => {
        if (index < players.length - 1) {
            setIndex(index + 1);
            rotate.value = 0;
        } else {
            router.replace('/game/round-start');
        }
    };

    if (!currentPlayer) return null;

    return (
        <ScreenWrapper showBackButton={true} onBackPress={handleBack} className="py-2">
            <View className="items-center mt-2 mb-6">
                {/* Progress Indicators */}
                <View className="flex-row gap-2 mb-6">
                    {players.map((_, i) => (
                        <View
                            key={i}
                            className={`h-1.5 rounded-full ${i === index ? 'w-10 bg-primary-action' : `w-3 ${isDark ? 'bg-surface-soft' : 'bg-gray-200'}`}`}
                        />
                    ))}
                </View>

                {/* Header Info */}
                <View className="items-center px-4">
                    <AppText className="text-accent font-black uppercase tracking-[3px] text-xs mb-2 opacity-80">{t.reveal.title}</AppText>
                    <AppText variant="h1" className="text-5xl font-black text-center mb-2">{currentPlayer.name}</AppText>
                    <AppText variant="body" className="text-text-secondary text-center text-sm italic">{t.reveal.passPhone}</AppText>
                </View>
            </View>

            <View className="flex-1 justify-center items-center w-full px-4 mb-4">
                {/* Card Container */}
                <View className="w-full max-w-[320px] h-[450px] relative items-center justify-center">
                    {/* Front Face (Hidden/Confidential) */}
                    <Animated.View
                        style={[styles.cardFace, frontStyle]}
                        className={`${isDark ? 'bg-surface-card border-surface-soft' : 'bg-white border-gray-100 shadow-2xl'} border-[3px] items-center py-10 px-6 rounded-[48px]`}
                    >
                        {/* Top Section */}
                        <View className="items-center w-full">
                            <AppText className={`font-bold text-[10px] text-center opacity-50 uppercase tracking-[3px] ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                {t.reveal.onlyLook}
                            </AppText>
                            <AppText
                                adjustsFontSizeToFit
                                numberOfLines={1}
                                className={`font-black text-3xl text-center uppercase mt-1 ${isDark ? 'text-white' : 'text-[#101828]'}`}
                            >
                                {currentPlayer.name}
                            </AppText>
                        </View>

                        {/* Center Section - Text in the middle */}
                        <View className="flex-1 w-full items-center justify-center">
                            <AppText className={`font-black text-2xl uppercase tracking-widest text-center leading-8 ${isDark ? 'text-primary-action' : 'text-primary-action'}`}>
                                {t.reveal.tapToReveal}
                            </AppText>
                        </View>

                        {/* Bottom Section - Fingerprint */}
                        <View className="items-center w-full pb-2">
                            <Pressable
                                onPressIn={handlePressIn}
                                onPressOut={handlePressOut}
                            >
                                {({ pressed }) => (
                                    <Fingerprint
                                        size={90}
                                        color={pressed ? "#C03520" : "#E5533D"}
                                        strokeWidth={1.5}
                                        style={{ opacity: pressed ? 0.8 : 1 }}
                                    />
                                )}
                            </Pressable>
                        </View>
                    </Animated.View>

                    {/* Back Face (Revealed) */}
                    <Animated.View
                        style={[styles.cardFace, backStyle]}
                        className={`items-center justify-between py-10 px-6 rounded-[48px] border-[3px] ${isDark ? 'bg-surface-card border-surface-soft' : 'bg-white border-gray-100 shadow-2xl'}`}
                    >
                        {currentPlayer.role === 'impostor' ? (
                            <>
                                <View className="items-center">
                                    <View className="bg-primary-action/10 p-4 rounded-full mb-4">
                                        <AlertCircle size={48} color="#E5533D" strokeWidth={2} />
                                    </View>
                                    <AppText className={`font-black text-xs uppercase tracking-[4px] mb-1 ${isDark ? 'text-white/60' : 'text-gray-500'}`}>{t.reveal.youAre}</AppText>
                                </View>

                                <AppText
                                    adjustsFontSizeToFit
                                    numberOfLines={1}
                                    className="text-primary-action font-black text-5xl uppercase tracking-tighter text-center"
                                >
                                    {t.reveal.impostor}
                                </AppText>

                                <View className="items-center">
                                    <View className="h-px w-16 bg-primary-action/20 mb-3" />
                                    <AppText className="text-text-secondary text-[10px] text-center opacity-60 uppercase tracking-widest font-bold">
                                        {t.reveal.undetected}
                                    </AppText>
                                </View>
                            </>
                        ) : (
                            <>
                                <View className="items-center">
                                    <View className="bg-accent/10 p-4 rounded-full mb-4">
                                        <ShieldCheck size={48} color="#4CC9F0" strokeWidth={2} />
                                    </View>
                                    <AppText className="text-accent font-black text-xs uppercase tracking-[4px] mb-1">{t.reveal.secretWord}</AppText>
                                </View>

                                <AppText
                                    adjustsFontSizeToFit
                                    numberOfLines={2}
                                    className={`font-black text-4xl text-center ${isDark ? 'text-white' : 'text-[#101828]'}`}
                                >
                                    {secretWord}
                                </AppText>

                                <View className="items-center">
                                    <View className="h-px w-16 bg-accent/20 mb-3" />
                                    <AppText className="text-text-secondary text-[10px] text-center opacity-60 uppercase tracking-widest font-bold">
                                        {t.reveal.civilianProtocol}
                                    </AppText>
                                </View>
                            </>
                        )}
                    </Animated.View>
                </View>
            </View>

            <View className="px-6 pb-2">
                <Button
                    title={index < players.length - 1 ? t.reveal.nextPlayer : t.reveal.startGame}
                    onPress={handleNext}
                    className="w-full"
                    variant="primary"
                    icon={<ArrowRight size={22} color="white" />}
                    iconPosition="right"
                />
            </View>

            {/* Subtle app branding */}
            <Image
                source={appIcon}
                style={{ position: 'absolute', bottom: 8, right: 8, width: 20, height: 20, borderRadius: 4, opacity: 0.2 }}
            />
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    cardFace: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backfaceVisibility: 'hidden',
    },
});
