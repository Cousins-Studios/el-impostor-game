import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

interface ButtonProps {
    onPress: () => void;
    title: string;
    variant?: 'primary' | 'secondary' | 'outline' | 'danger';
    disabled?: boolean;
    loading?: boolean;
    className?: string; // container extra styles
    textClassName?: string;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    style?: any;
}

export function Button({
    onPress,
    title,
    variant = 'primary',
    disabled,
    loading,
    className,
    textClassName,
    icon,
    iconPosition = 'left',
    style
}: ButtonProps) {
    let bg = "bg-primary-action";
    let text = "text-white";
    let border = "";

    if (variant === 'secondary') {
        bg = "bg-surface-soft";
        text = "text-text-primary";
    } else if (variant === 'outline') {
        bg = "bg-transparent";
        border = "border-2 border-primary-action";
        text = "text-primary-action";
    } else if (variant === 'danger') {
        bg = "bg-red-600";
        text = "text-white";
    }

    if (disabled) {
        bg = "bg-muted";
        text = "text-gray-300";
        border = "border-muted";
    }

    const iconSize = 20;
    const iconMargin = 12; // equivalent to mr-3/ml-3 (3 * 4 = 12)
    const iconFootprint = icon ? (iconSize + iconMargin) : 0;

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.8}
            className={`h-12 px-6 rounded-2xl flex-row items-center justify-center shadow-sm ${bg} ${border} ${className || ''}`}
            style={style}
        >
            {loading ? (
                <ActivityIndicator color={variant === 'outline' ? "#E5533D" : "white"} />
            ) : (
                <View className="flex-row items-center justify-center w-full relative">
                    {/* Invisible spacer to balance the icon on the opposite side and keep text perfectly centered */}
                    {icon && iconPosition === 'right' && <View style={{ width: iconFootprint }} />}

                    {icon && iconPosition === 'left' && (
                        <View className="mr-3 items-center justify-center" style={{ width: iconSize, height: iconSize }}>
                            {icon}
                        </View>
                    )}

                    <Text
                        style={{ includeFontPadding: false }}
                        className={`font-black text-center ${text} text-base leading-tight ${textClassName || ''}`}
                    >
                        {title}
                    </Text>

                    {icon && iconPosition === 'right' && (
                        <View className="ml-3 items-center justify-center" style={{ width: iconSize, height: iconSize }}>
                            {icon}
                        </View>
                    )}

                    {/* Invisible spacer to balance the icon on the opposite side and keep text perfectly centered */}
                    {icon && iconPosition === 'left' && <View style={{ width: iconFootprint }} />}
                </View>
            )}
        </TouchableOpacity>
    );
}
