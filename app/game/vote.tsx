import { useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { Button } from '../../components/Button';
import ScreenWrapper from '../../components/ScreenWrapper';
import { AppText } from '../../components/Typography';
import { useI18n } from '../../constants/i18n';
import { useGameStore } from '../../store/gameStore';
import { useSettingsStore } from '../../store/settingsStore';

export default function VoteScreen() {
    const { players, voteToEliminate: eliminatePlayer } = useGameStore();
    const { appTheme } = useSettingsStore();
    const isDark = appTheme === 'dark';
    const router = useRouter();
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const t = useI18n();

    const alivePlayers = players.filter(p => p.isAlive);

    const handleEliminate = () => {
        if (selectedId) {
            eliminatePlayer(selectedId);
            router.replace('/game/elimination');
        }
    };

    return (
        <ScreenWrapper showBackButton={true}>
            <View className="flex-1 px-4">
                <View className="mt-8 mb-10">
                    <AppText variant="h1" className={`text-4xl font-black mb-2 ${isDark ? 'text-white' : 'text-[#101828]'}`}>
                        {t.vote.title}
                    </AppText>
                    <AppText className="text-text-secondary text-lg">
                        {t.vote.subtitle}
                    </AppText>
                </View>

                <FlatList
                    data={alivePlayers}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => {
                        const isSelected = selectedId === item.id;
                        return (
                            <TouchableOpacity
                                onPress={() => setSelectedId(item.id)}
                                activeOpacity={0.7}
                                className={`p-6 mb-4 rounded-3xl border-2 ${isSelected
                                    ? 'bg-primary-action/10 border-primary-action shadow-lg'
                                    : (isDark ? 'bg-[#182235] border-transparent' : 'bg-white border-gray-100 shadow-sm')
                                    }`}
                            >
                                <AppText className={`text-xl font-bold ${isSelected ? (isDark ? 'text-white' : 'text-[#101828]') : (isDark ? 'text-[#B6C2E2]' : 'text-gray-600')
                                    }`}>
                                    {item.name}
                                </AppText>
                            </TouchableOpacity>
                        );
                    }}
                    ListFooterComponent={<View className="h-32" />}
                />
            </View>

            <View className="absolute bottom-10 left-6 right-6">
                <Button
                    title={t.vote.eliminate}
                    disabled={!selectedId}
                    onPress={handleEliminate}
                    className="w-full h-16"
                />
            </View>
        </ScreenWrapper>
    );
}
