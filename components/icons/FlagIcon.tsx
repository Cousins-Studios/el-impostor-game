import React from 'react';
import { View } from 'react-native';
import Svg, { Circle, G, Rect } from 'react-native-svg';

interface FlagIconProps {
    countryCode: 'es' | 'en' | 'fr' | 'de' | 'it';
    size?: number;
}

export function FlagIcon({ countryCode, size = 24 }: FlagIconProps) {
    const width = size;
    const height = size * 0.75; // 4:3 aspect ratio
    const radius = 4;

    const renderFlag = () => {
        switch (countryCode) {
            case 'es': // Spain: Red, Yellow (x2), Red
                return (
                    <G>
                        <Rect x="0" y="0" width="100%" height="25%" fill="#AA151B" />
                        <Rect x="0" y="25%" width="100%" height="50%" fill="#F1BF00" />
                        <Rect x="0" y="75%" width="100%" height="25%" fill="#AA151B" />
                    </G>
                );
            case 'en': // USA: Stripes + Canton
                return (
                    <G>
                        {/* 13 Stripes (White base, 7 Red stripes) */}
                        <Rect x="0" y="0" width="100%" height="100%" fill="white" />
                        {[0, 2, 4, 6, 8, 10, 12].map(i => (
                            <Rect key={i} x="0" y={`${(i / 13) * 100}%`} width="100%" height={`${(1 / 13) * 100}%`} fill="#B22234" />
                        ))}
                        {/* Blue Canton */}
                        <Rect x="0" y="0" width="50%" height="54%" fill="#3C3B6E" />
                        {/* Simplified Stars (Just a few dots for representation) */}
                        <Circle cx="10%" cy="10%" r="2%" fill="white" />
                        <Circle cx="25%" cy="10%" r="2%" fill="white" />
                        <Circle cx="40%" cy="10%" r="2%" fill="white" />
                        <Circle cx="17%" cy="25%" r="2%" fill="white" />
                        <Circle cx="32%" cy="25%" r="2%" fill="white" />
                    </G>
                );
            case 'fr': // France: Blue, White, Red (Vertical)
                return (
                    <G>
                        <Rect x="0" y="0" width="33.3%" height="100%" fill="#0055A4" />
                        <Rect x="33.3%" y="0" width="33.3%" height="100%" fill="white" />
                        <Rect x="66.6%" y="0" width="33.4%" height="100%" fill="#EF4135" />
                    </G>
                );
            case 'de': // Germany: Black, Red, Gold (Horizontal)
                return (
                    <G>
                        <Rect x="0" y="0" width="100%" height="33.3%" fill="black" />
                        <Rect x="0" y="33.3%" width="100%" height="33.3%" fill="#DD0000" />
                        <Rect x="0" y="66.6%" width="100%" height="33.4%" fill="#FFCE00" />
                    </G>
                );
            case 'it': // Italy: Green, White, Red (Vertical)
                return (
                    <G>
                        <Rect x="0" y="0" width="33.3%" height="100%" fill="#009246" />
                        <Rect x="33.3%" y="0" width="33.3%" height="100%" fill="white" />
                        <Rect x="66.6%" y="0" width="33.4%" height="100%" fill="#CE2B37" />
                    </G>
                );
        }
    };

    return (
        <View style={{ width, height, borderRadius: radius, overflow: 'hidden' }}>
            <Svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                {renderFlag()}
                {/* Inner border for white flags like It/Fr/Us on white backgrounds */}
                <Rect x="0" y="0" width="100" height="100" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="4" />
            </Svg>
        </View>
    );
}
