import { useRouter } from 'expo-router';
import { View } from 'react-native';
import { Button } from '../../components/Button';
import ScreenWrapper from '../../components/ScreenWrapper';
import { AppText } from '../../components/Typography';
import { useI18n } from '../../constants/i18n';
import { useGameStore } from '../../store/gameStore';

export default function ConfirmGame() {
    const { players, settings, startGame } = useGameStore();
    const router = useRouter();
    const t = useI18n();

    const handleStart = () => {
        startGame();
        router.replace('/game/reveal');
    };

    const InfoRow = ({ label, value }: { label: string, value: string }) => (
        <View className="flex-row justify-between mb-4 border-b border-surface-soft pb-2">
            <AppText className="text-text-secondary">{label}</AppText>
            <AppText className="font-bold text-white">{value}</AppText>
        </View>
    );

    // @ts-ignore
    const themeLabel = t.themeSelection.categories[settings.theme] || settings.theme;
    const modeLabel = settings.impostorMode === 'fixed' ? t.gameConfig.modeFixed : t.gameConfig.modeProb;

    return (
        <ScreenWrapper showBackButton={true}>
            <AppText variant="h1" className="mb-8">{t.common.ready}</AppText>

            <View className="bg-surface-card p-6 rounded-2xl border border-surface-soft mb-8">
                <InfoRow label={t.playerSetup.title} value={players.length.toString()} />
                <InfoRow label={t.gameConfig.mode} value={modeLabel} />
                <InfoRow
                    label={t.gameConfig.count}
                    value={settings.impostorMode === 'fixed'
                        ? settings.impostorCount.toString()
                        : `~${settings.impostorCount} (${settings.impostorProbability}%)`}
                />
                <InfoRow label={t.settings.theme} value={themeLabel} />
                {settings.theme === 'Custom' && (
                    <InfoRow label={t.themeSelection.poolSize} value={settings.customWords.length.toString()} />
                )}
            </View>

            <AppText className="text-center text-text-secondary italic mb-8">
                {t.common.passPhoneFirst}
            </AppText>

            <Button title={t.playerSetup.startGame} onPress={handleStart} className="mt-auto mb-6" />
        </ScreenWrapper>
    );
}
