import { useRouter } from 'expo-router';
import { ArrowRight, Check, EyeOff, Frown, X } from 'lucide-react-native';
import { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Button } from '../../components/Button';
import ScreenWrapper from '../../components/ScreenWrapper';
import { AppText } from '../../components/Typography';
import { useGameStore } from '../../store/gameStore';
import { useSettingsStore } from '../../store/settingsStore';

export default function EliminationScreen() {
    const { players, eliminatedPlayerId, checkVictoryAfterElimination: checkVictory, resolveImpostorGuess } = useGameStore();
    const { appTheme } = useSettingsStore();
    const isDark = appTheme === 'dark';
    const router = useRouter();
    const [guessResolved, setGuessResolved] = useState(false);

    const player = players.find(p => p.id === eliminatedPlayerId);
    if (!player) return null;

    const isImpostor = player.role === 'impostor';

    const handleNext = () => {
        const victory = checkVictory();
        if (victory) {
            router.replace('/game/victory');
        } else {
            router.replace('/game/round-start');
        }
    };

    const handleGuess = (didGuess: boolean) => {
        resolveImpostorGuess(didGuess);
        if (didGuess) {
            router.replace('/game/victory');
        } else {
            setGuessResolved(true);
        }
    };

    return (
        <ScreenWrapper className="justify-center items-center py-6">
            <View className="items-center flex-1 justify-center w-full px-6">
                <AppText className="text-primary-action font-black text-[10px] uppercase tracking-[4px] mb-2">
                    ELIMINATED
                </AppText>

                <AppText className={`text-4xl font-black text-center mb-10 ${isDark ? 'text-white' : 'text-[#101828]'}`}>
                    {player.name}
                </AppText>

                <View className="mb-6">
                    {isImpostor ? (
                        <EyeOff size={64} color="#E5533D" strokeWidth={1.5} />
                    ) : (
                        <Frown size={64} color="#B6C2E2" strokeWidth={1.5} />
                    )}
                </View>

                <AppText className={`text-2xl font-black uppercase tracking-widest mb-2 ${isImpostor ? 'text-primary-action' : 'text-[#B6C2E2]'}`}>
                    {isImpostor ? 'IMPOSTOR' : 'CIVILIAN'}
                </AppText>

                <AppText className="text-text-secondary text-sm text-center px-8 mb-8">
                    {isImpostor
                        ? "Great job! You found the impostor."
                        : "Oops! You voted out an innocent."}
                </AppText>

                {isImpostor && !guessResolved && (
                    <View className={`w-full ${isDark ? 'bg-[#182235]' : 'bg-white shadow-xl'} p-6 rounded-[28px] items-center`}>
                        <AppText className={`font-black text-[10px] uppercase tracking-[2px] mb-4 text-center ${isDark ? 'text-[#B6C2E2]' : 'text-gray-500'}`}>
                            LAST CHANCE: DID THEY GUESS THE WORD?
                        </AppText>
                        <View className="flex-row gap-3 w-full">
                            <TouchableOpacity
                                onPress={() => handleGuess(true)}
                                className="flex-1 bg-green-500/10 border-2 border-green-500/50 h-12 rounded-2xl items-center justify-center flex-row"
                            >
                                <Check color="#22C55E" size={18} strokeWidth={3} className="mr-2" />
                                <AppText className="text-green-500 font-bold text-sm">YES</AppText>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => handleGuess(false)}
                                className="flex-1 bg-red-500/10 border-2 border-red-500/50 h-12 rounded-2xl items-center justify-center flex-row"
                            >
                                <X color="#EF4444" size={18} strokeWidth={3} className="mr-2" />
                                <AppText className="text-red-500 font-bold text-sm">NO</AppText>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </View>

            <View className="w-full px-6 pb-6">
                {(!isImpostor || guessResolved) && (
                    <Button
                        title="See Results"
                        onPress={handleNext}
                        className="w-full h-14"
                        textClassName="text-base"
                        icon={<ArrowRight size={20} color="white" />}
                        iconPosition="right"
                    />
                )}
            </View>
        </ScreenWrapper>
    );
}
