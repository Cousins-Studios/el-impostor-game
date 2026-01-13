import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useSettingsStore } from '../store/settingsStore';

interface BackButtonProps {
    onPress?: () => void;
    className?: string;
}

export function BackButton({ onPress, className }: BackButtonProps) {
    const router = useRouter();
    const { appTheme } = useSettingsStore();
    const isDark = appTheme === 'dark';

    const handleBack = () => {
        if (onPress) {
            onPress();
        } else {
            router.back();
        }
    };

    return (
        <TouchableOpacity
            onPress={handleBack}
            className={`w-10 h-10 items-center justify-center rounded-full ${isDark ? 'bg-surface-soft/50' : 'bg-white/80'} ${className || ''}`}
            activeOpacity={0.7}
            style={styles.shadow}
        >
            <ChevronLeft
                size={24}
                color={isDark ? '#B6C2E2' : '#475467'}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
});
