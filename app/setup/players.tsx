import { useRouter } from 'expo-router';
import { GripVertical, Plus, Trash2 } from 'lucide-react-native';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, View } from 'react-native';
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist';
import { Button } from '../../components/Button';
import ScreenWrapper from '../../components/ScreenWrapper';
import { AppText } from '../../components/Typography';
import { useGameStore } from '../../store/gameStore';
import { useSettingsStore } from '../../store/settingsStore';

export default function AddPlayers() {
    const router = useRouter();
    const { players, addPlayer, removePlayer, reorderPlayers } = useGameStore();
    const { appTheme } = useSettingsStore();
    const isDark = appTheme === 'dark';
    const [name, setName] = useState('');

    const handleAdd = () => {
        if (name.trim()) {
            addPlayer(name.trim());
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
                    <AppText variant="h1">Players</AppText>
                    <AppText variant="sub">Add players and arrange turn order</AppText>
                </View>

                {/* Input fixed at the top */}
                <View className="flex-row mb-6 gap-2">
                    <TextInput
                        className={`flex-1 ${isDark ? 'bg-surface-card border-surface-soft text-white' : 'bg-white border-gray-200 text-[#101828]'} p-4 rounded-xl text-lg border font-sans`}
                        placeholder="Player Name"
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
                    title={players.length < 3 ? `Next (${players.length}/3)` : `Next (${players.length})`}
                    disabled={players.length < 3}
                    onPress={() => router.push('/setup/config')}
                />
                {players.length < 3 && (
                    <AppText variant="sub" className="text-center mt-2 text-primary-action font-semibold italic">
                        Minimum 3 players required
                    </AppText>
                )}
            </View>
        </ScreenWrapper>
    );
}
