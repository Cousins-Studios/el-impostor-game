import { Redirect, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef } from 'react';
import { Animated, Image, Text, View } from 'react-native';
import { useSettingsStore } from '../store/settingsStore';

import splashLogo from '../assets/images/splash_logo.png';

export default function SplashScreen() {
    const router = useRouter();
    const { hasSeenSplash, setHasSeenSplash } = useSettingsStore();
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (hasSeenSplash) return;

        fadeAnim.setValue(0);

        Animated.sequence([
            Animated.delay(100), // Breve pausa inicial
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1500, // Fade in más lento
                useNativeDriver: true,
            }),
            Animated.delay(2000), // Mantener
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 1000, // Fade out
                useNativeDriver: true,
            }),
        ]).start(({ finished }) => {
            if (finished) {
                setHasSeenSplash(true);
                router.replace('/home');
            }
        });
    }, [hasSeenSplash]);

    if (hasSeenSplash) {
        return <Redirect href="/home" />;
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
            <StatusBar style="dark" />

            <Animated.View style={{ opacity: fadeAnim, alignItems: 'center', justifyContent: 'center' }}>
                <Image
                    source={splashLogo}
                    style={{ width: 300, height: 300, resizeMode: 'contain', marginBottom: -40 }}
                />
                <View style={{ marginTop: 0, paddingBottom: 20 }}>
                    <Text style={{ fontSize: 14, fontWeight: '500', letterSpacing: 4, textAlign: 'center', color: '#6b7280' }}>
                        PRESENTS
                    </Text>
                </View>
            </Animated.View>
        </View>
    );
}
