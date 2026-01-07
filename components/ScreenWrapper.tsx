import { ScrollView, StyleProp, View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSettingsStore } from '../store/settingsStore';

interface ScreenWrapperProps {
    children: React.ReactNode;
    scroll?: boolean;
    className?: string;
    contentContainerStyle?: StyleProp<ViewStyle>;
}

export default function ScreenWrapper({ children, scroll = false, className, contentContainerStyle }: ScreenWrapperProps) {
    const { appTheme } = useSettingsStore();
    const isDark = appTheme === 'dark';

    return (
        <SafeAreaView
            className={`flex-1 ${isDark ? 'bg-background' : 'bg-[#F2F4F7]'} ${className || ''}`}
            edges={['top', 'bottom']}
        >
            {scroll ? (
                <ScrollView
                    className="flex-1 px-6"
                    contentContainerStyle={[{ flexGrow: 1, paddingBottom: 40 }, contentContainerStyle]}
                    showsVerticalScrollIndicator={false}
                >
                    {children}
                </ScrollView>
            ) : (
                <View className="flex-1 px-6" style={contentContainerStyle}>
                    {children}
                </View>
            )}
        </SafeAreaView>
    );
}
