import { useRouter } from 'expo-router';
import { Image, View } from 'react-native';
import appIcon from '../../assets/images/icon.png';
import { Button } from '../../components/Button';
import ScreenWrapper from '../../components/ScreenWrapper';
import { AppText } from '../../components/Typography';
import { useI18n } from '../../constants/i18n';
import { useGameStore } from '../../store/gameStore';
import { useSettingsStore } from '../../store/settingsStore';

export default function ConfirmGame() {
    const { players, settings, startGame } = useGameStore();
    const { appTheme } = useSettingsStore();
    const isDark = appTheme === 'dark';
    const router = useRouter();
    const t = useI18n();

    const handleStart = () => {
        startGame();
        router.replace('/game/reveal');
    };

    const InfoRow = ({ label, value }: { label: string, value: string }) => (
        <View className={`flex-row justify-between mb-4 border-b ${isDark ? 'border-surface-soft' : 'border-gray-100'} pb-2`}>
            <AppText className={isDark ? "text-text-secondary" : "text-gray-500"}>{label}</AppText>
            <AppText className={`font-bold ${isDark ? "text-white" : "text-[#101828]"}`}>{value}</AppText>
        </View>
    );

    // @ts-ignore
    const themeLabel = t.themeSelection.categories[settings.theme] || settings.theme;
    const modeLabel = settings.impostorMode === 'fixed' ? t.gameConfig.modeFixed : t.gameConfig.modeProb;

    return (
        <ScreenWrapper showBackButton={true}>
            <AppText variant="h1" className="mb-8">{t.common.ready}</AppText>

            <View className={`${isDark ? 'bg-surface-card border-surface-soft' : 'bg-white border-gray-100 shadow-sm'} p-6 rounded-[32px] border mb-8`}>
                <InfoRow label={t.playerSetup.title} value={players.length.toString()} />
                <InfoRow label={t.gameConfig.mode} value={modeLabel} />
                <InfoRow
                    label={t.gameConfig.count}
                    value={settings.impostorMode === 'fixed'
                        ? settings.fixedImpostorCount.toString()
                        : `~${settings.probabilityImpostorCount} (${settings.impostorProbability}%)`}
                />
                <InfoRow label={t.settings.theme} value={themeLabel} />
                {settings.theme === 'Custom' && (
                    <InfoRow label={t.themeSelection.poolSize} value={settings.customWords.length.toString()} />
                )}
            </View>

            <AppText className={`text-center italic mb-8 ${isDark ? 'text-text-secondary' : 'text-gray-500'}`}>
                {t.common.passPhoneFirst}
            </AppText>

            <Button title={t.playerSetup.startGame} onPress={handleStart} className="mt-auto mb-6" />

            {/* Subtle app branding */}
            <View className="items-center pb-2">
                <Image
                    source={appIcon}
                    style={{ width: 24, height: 24, borderRadius: 5, opacity: 0.35 }}
                />
            </View>
        </ScreenWrapper>
    );
}
