import { Text, TextProps } from 'react-native';
import { useSettingsStore } from '../store/settingsStore';

interface AppTextProps extends TextProps {
    variant?: 'h1' | 'h2' | 'h3' | 'body' | 'label' | 'sub';
    color?: string;
    className?: string;
}

export function AppText({ className, variant = 'body', style, ...props }: AppTextProps) {
    const { appTheme } = useSettingsStore();
    const isDark = appTheme === 'dark';

    let baseStyle = `${isDark ? 'text-white' : 'text-[#101828]'} font-sans`;

    switch (variant) {
        case 'h1':
            baseStyle += " text-4xl font-extrabold tracking-tight mb-6";
            break;
        case 'h2':
            baseStyle += " text-3xl font-bold mb-4";
            break;
        case 'h3':
            baseStyle += " text-xl font-semibold mb-3";
            break;
        case 'body':
            baseStyle += " text-lg leading-relaxed";
            break;
        case 'label':
            baseStyle += " text-base font-semibold text-text-secondary uppercase tracking-normal";
            break;
        case 'sub':
            baseStyle += " text-sm text-text-secondary";
            break;
    }

    return <Text style={[{ includeFontPadding: false }, style]} className={`${baseStyle} ${className || ''}`} {...props} />;
}
