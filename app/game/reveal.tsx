import { useRouter } from 'expo-router';
import { AlertCircle, ArrowRight, Fingerprint, ShieldCheck } from 'lucide-react-native';
import { useState } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import appIcon from '../../assets/images/icon.png';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
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
        scale.value = withSpring(1.05);
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
        <ScreenWrapper showBackButton={true} onBackPress={handleBack} className="justify-between py-6">
            <View className="items-center">
                {/* Progress Indicators */}
                <View className="flex-row gap-2 mb-8">
                    {players.map((_, i) => (
                        <View
                            key={i}
                            className={`h-1.5 rounded-full ${i === index ? 'w-8 bg-primary-action' : `w-3 ${isDark ? 'bg-surface-soft' : 'bg-gray-200'}`}`}
                        />
                    ))}
                </View>

                <View className="items-center px-4">
                    <AppText className="text-accent font-black uppercase tracking-[3px] text-sm mb-2">{t.reveal.title}</AppText>
                    <AppText variant="h1" className="text-5xl font-black text-center mb-1">{currentPlayer.name}</AppText>
                    <AppText variant="body" className="text-text-secondary text-center italic">{t.reveal.passPhone}</AppText>
                </View>
            </View>

            <View className="flex-1 justify-center items-center w-full px-4">
                <Pressable
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    className="w-full max-w-[320px] h-[450px]"
                >
                    {/* Front Face (Hidden) */}
                    <Animated.View
                        style={[styles.cardFace, frontStyle]}
                        className={`${isDark ? 'bg-surface-card border-surface-soft' : 'bg-white border-gray-100 shadow-xl'} border-4 items-center justify-center rounded-[48px]`}
                    >
                        <View className={`w-32 h-32 rounded-full items-center justify-center mb-8 ${isDark ? 'bg-[#1F2A44]' : 'bg-gray-50'}`}>
                            <Fingerprint size={64} color="#E5533D" strokeWidth={1.5} />
                        </View>
                        <AppText className={`font-black text-2xl uppercase tracking-widest text-center px-8 ${isDark ? 'text-white' : 'text-[#101828]'}`}>
                            {t.reveal.tapToReveal}
                        </AppText>
                        <AppText className="text-text-secondary mt-4 text-center px-10">{t.reveal.onlyLook} {currentPlayer.name}</AppText>
                    </Animated.View>

                    {/* Back Face (Revealed) */}
                    <Animated.View
                        style={[styles.cardFace, backStyle]}
                        className={`items-center justify-center rounded-[48px] border-2 p-8 ${isDark ? 'bg-surface-card border-surface-soft' : 'bg-white border-gray-100 shadow-2xl'
                            }`}
                    >
                        {currentPlayer.role === 'impostor' ? (
                            <>
                                <View className="bg-primary-action/10 p-5 rounded-full mb-4">
                                    <AlertCircle size={40} color="#E5533D" strokeWidth={2} />
                                </View>
                                <AppText className={`font-black text-xs uppercase tracking-[4px] mb-1 ${isDark ? 'text-white/60' : 'text-gray-500'}`}>{t.reveal.youAre}</AppText>
                                <AppText className="text-primary-action font-black text-4xl uppercase tracking-tighter text-center">
                                    {t.reveal.impostor}
                                </AppText>
                                <View className="mt-6 h-px w-12 bg-primary-action/20" />
                                <AppText className="text-text-secondary mt-4 text-[10px] text-center opacity-50 uppercase tracking-widest">
                                    {t.reveal.undetected}
                                </AppText>
                            </>
                        ) : (
                            <>
                                <View className="bg-accent/10 p-5 rounded-full mb-4">
                                    <ShieldCheck size={40} color="#4CC9F0" strokeWidth={2} />
                                </View>
                                <AppText className="text-accent font-black text-[10px] uppercase tracking-[4px] mb-2">{t.reveal.secretWord}</AppText>
                                <AppText className={`font-black text-3xl text-center ${isDark ? 'text-white' : 'text-[#101828]'}`}>
                                    {secretWord}
                                </AppText>
                                <View className="mt-6 h-px w-12 bg-accent/20" />
                                <AppText className="text-text-secondary mt-4 text-[10px] text-center opacity-50 uppercase tracking-widest">
                                    {t.reveal.civilianProtocol}
                                </AppText>
                            </>
                        )}
                    </Animated.View>
                </Pressable>
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
