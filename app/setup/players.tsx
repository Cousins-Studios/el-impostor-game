import { useRouter } from 'expo-router';
import { GripVertical, Plus, Trash2 } from 'lucide-react-native';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, View } from 'react-native';
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist';
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
    const t = useI18n();

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
        <ScreenWrapper>
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
                        className={`flex-1 ${isDark ? 'bg-surface-card border-surface-soft text-white' : 'bg-white border-gray-200 text-[#101828]'} p-4 rounded-xl text-lg border font-sans`}
                        placeholder={t.playerSetup.namePlaceholder}
                        placeholderTextColor={isDark ? "#7C8AA5" : "#98A2B3"}
                        value={name}
                        onChangeText={setName}
                        onSubmitEditing={handleAdd}
                    />
                    <TouchableOpacity
                        onPress={handleAdd}
                        className="bg-primary-action aspect-square rounded-xl items-center justify-center p-4"
                        activeOpacity={0.7}
                    >
                        <Plus color="white" size={24} />
                    </TouchableOpacity>
                </View>

                <DraggableFlatList
                    data={players}
                    keyExtractor={item => item.id}
                    onDragEnd={({ data }) => reorderPlayers(data)}
                    renderItem={({ item, drag, isActive }) => (
                        <ScaleDecorator>
                            <TouchableOpacity
                                onLongPress={drag}
                                disabled={isActive}
                                activeOpacity={1}
                                className={`flex-row items-center p-4 mb-3 rounded-xl border ${isActive ? (isDark ? 'bg-surface-soft border-primary-action' : 'bg-gray-100 border-primary-action') : (isDark ? 'bg-surface-card border-surface-soft' : 'bg-white border-gray-100')
                                    }`}
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
                        </ScaleDecorator>
                    )}
                    contentContainerStyle={{ paddingBottom: 150 }}
                    showsVerticalScrollIndicator={false}
                />
            </KeyboardAvoidingView>

            <View className="absolute bottom-6 left-6 right-6">
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
