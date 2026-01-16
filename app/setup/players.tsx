import { useRouter } from 'expo-router';
import { GripVertical, Plus, Trash2 } from 'lucide-react-native';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, View } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Defs, LinearGradient, Rect, Stop, Svg } from 'react-native-svg';
import { Button } from '../../components/Button';
import { CustomAlert } from '../../components/CustomAlert';
import ScreenWrapper from '../../components/ScreenWrapper';
import { AppText } from '../../components/Typography';
import { useI18n } from '../../constants/i18n';
import { useGameStore } from '../../store/gameStore';
import { useSettingsStore } from '../../store/settingsStore';

export default function AddPlayers() {
    const router = useRouter();
    const { players, addPlayer, removePlayer, reorderPlayers } = useGameStore();
    const { appTheme } = useSettingsStore();
    const isDark = appTheme === 'dark';
    const [name, setName] = useState('');
    const [showError, setShowError] = useState(false);
    const scrollOffset = useSharedValue(0);
    const contentHeight = useSharedValue(0);
    const layoutHeight = useSharedValue(0);
    const t = useI18n();

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

    const handleAdd = () => {
        const trimmed = name.trim();
        if (trimmed) {
            // Normalization: Lowercase + Remove Accents
            const normalize = (str: string) => str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

            const normalizedNew = normalize(trimmed);
            const exists = players.some(p => normalize(p.name) === normalizedNew);

            if (exists) {
                setShowError(true);
                return;
            }

            addPlayer(trimmed);
            setName('');
        }
    };

    return (
        <ScreenWrapper showBackButton={true}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
            >
                <View className="mb-6">
                    <AppText variant="h1">{t.playerSetup.title}</AppText>
                    <AppText variant="sub">{t.playerSetup.addPlayer}</AppText>
                </View>

                {/* Input fixed at the top */}
                <View className="flex-row mb-6 gap-2">
                    <TextInput
                        className={`flex-1 h-14 ${isDark ? 'bg-surface-card border-surface-soft text-white' : 'bg-white border-gray-200 text-[#101828]'} px-4 rounded-xl text-lg border font-sans`}
                        placeholder={t.playerSetup.namePlaceholder}
                        placeholderTextColor={isDark ? "#7C8AA5" : "#98A2B3"}
                        value={name}
                        onChangeText={setName}
                        onSubmitEditing={handleAdd}
                    />
                    <TouchableOpacity
                        onPress={handleAdd}
                        className="bg-primary-action h-14 aspect-square rounded-xl items-center justify-center"
                        activeOpacity={0.7}
                    >
                        <Plus color="white" size={24} />
                    </TouchableOpacity>
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

                    <DraggableFlatList
                        data={players}
                        containerStyle={{ flex: 1 }}
                        keyExtractor={item => item.id}
                        onDragEnd={({ data }) => reorderPlayers(data)}
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
                        renderItem={({ item, drag, isActive }) => (
                            <TouchableOpacity
                                onLongPress={drag}
                                disabled={isActive}
                                activeOpacity={1}
                                className={`flex-row items-center p-4 mb-3 rounded-xl border ${isActive
                                    ? (isDark ? 'bg-surface-soft border-primary-action shadow-lg' : 'bg-gray-100 border-primary-action shadow-md')
                                    : (isDark ? 'bg-surface-card border-surface-soft' : 'bg-white border-gray-100')
                                    }`}
                                style={isActive ? { transform: [{ scale: 1 }] } : undefined}
                            >
                                <View className="mr-3 opacity-50 p-1">
                                    <GripVertical color={isDark ? "#B6C2E2" : "#98A2B3"} size={20} />
                                </View>
                                <AppText className={`flex-1 font-semibold ${isDark ? 'text-white' : 'text-[#101828]'}`}>{item.name}</AppText>
                                <TouchableOpacity
                                    onPress={() => removePlayer(item.id)}
                                    className="p-2"
                                    activeOpacity={0.6}
                                >
                                    <Trash2 color="#E5533D" size={20} />
                                </TouchableOpacity>
                            </TouchableOpacity>
                        )}
                        contentContainerStyle={{ paddingBottom: 20, paddingTop: 10 }}
                        showsVerticalScrollIndicator={false}
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
                <View className="pt-4 pb-6">
                    <Button
                        title={players.length < 3 ? `${t.common.next} (${players.length}/3)` : `${t.common.next} (${players.length})`}
                        disabled={players.length < 3}
                        onPress={() => router.push('/setup/config')}
                    />
                    {players.length < 3 && (
                        <AppText variant="sub" className="text-center mt-2 text-primary-action font-semibold italic">
                            {t.playerSetup.minPlayers}
                        </AppText>
                    )}
                </View>
            </KeyboardAvoidingView>

            <CustomAlert
                visible={showError}
                title={t.playerSetup.duplicateTitle}
                message={t.playerSetup.duplicateNameError}
                onClose={() => setShowError(false)}
                buttonText={"OK"}
            />

        </ScreenWrapper>
    );
}
