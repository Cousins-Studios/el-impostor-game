import { ScrollView, StyleProp, View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSettingsStore } from '../store/settingsStore';
import { BackButton } from './BackButton';

interface ScreenWrapperProps {
    children: React.ReactNode;
    scroll?: boolean;
    className?: string;
    contentContainerStyle?: StyleProp<ViewStyle>;
    showBackButton?: boolean;
    onBackPress?: () => void;
}

export default function ScreenWrapper({
    children,
    scroll = false,
    className,
    contentContainerStyle,
    showBackButton = false,
    onBackPress
}: ScreenWrapperProps) {
    const { appTheme } = useSettingsStore();
    const isDark = appTheme === 'dark';

    return (
        <SafeAreaView
            className={`flex-1 ${isDark ? 'bg-background' : 'bg-[#F2F4F7]'} ${className || ''}`}
            edges={['top', 'bottom']}
        >
            <View className="flex-1">
                {showBackButton && (
                    <View className="absolute top-2 left-6 z-50">
                        <BackButton onPress={onBackPress} />
                    </View>
                )}

                {scroll ? (
                    <ScrollView
                        className={`flex-1 px-6 ${showBackButton ? 'pt-14' : ''}`}
                        contentContainerStyle={[{ flexGrow: 1, paddingBottom: 40 }, contentContainerStyle]}
                        showsVerticalScrollIndicator={false}
                    >
                        {children}
                    </ScrollView>
                ) : (
                    <View className={`flex-1 px-6 ${showBackButton ? 'pt-14' : ''}`} style={contentContainerStyle}>
                        {children}
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
}
