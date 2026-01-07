import { useRouter } from 'expo-router';
import { MessageSquare } from 'lucide-react-native';
import { View } from 'react-native';
import { Button } from '../../components/Button';
import ScreenWrapper from '../../components/ScreenWrapper';
import { AppText } from '../../components/Typography';
import { useSettingsStore } from '../../store/settingsStore';

export default function PlayRound() {
    const router = useRouter();
    const { appTheme } = useSettingsStore();
    const isDark = appTheme === 'dark';

    return (
        <ScreenWrapper className="justify-center items-center py-8">
            <View className="items-center flex-1 justify-center w-full px-6">
                <View className={`${isDark ? 'bg-[#182235]' : 'bg-white shadow-lg'} p-4 rounded-full mb-8 border-2 border-[#4CC9F0]/20`}>
                    <MessageSquare size={40} color="#4CC9F0" strokeWidth={1.5} />
                </View>

                <AppText variant="h1" className={`text-3xl font-black text-center mb-2 ${isDark ? 'text-white' : 'text-[#101828]'}`}>
                    Players speaking
                </AppText>
                <AppText className="text-text-secondary text-sm text-center mb-8">
                    Say one word related to the secret word
                </AppText>

                <View className={`${isDark ? 'bg-[#182235]' : 'bg-white shadow-xl'} w-full p-6 rounded-[28px]`}>
                    <View className="gap-3">
                        <View className="flex-row items-center">
                            <AppText className="text-accent text-lg font-black mr-3">•</AppText>
                            <AppText className={`text-base font-bold ${isDark ? 'text-[#B6C2E2]' : 'text-gray-600'}`}>Be subtle but not too vague</AppText>
                        </View>
                        <View className="flex-row items-center">
                            <AppText className="text-accent text-lg font-black mr-3">•</AppText>
                            <AppText className={`text-lg font-bold ${isDark ? 'text-[#B6C2E2]' : 'text-gray-600'}`}>Listen carefully to others</AppText>
                        </View>
                        <View className="flex-row items-center">
                            <AppText className="text-accent text-lg font-black mr-3">•</AppText>
                            <AppText className={`text-lg font-bold ${isDark ? 'text-[#B6C2E2]' : 'text-gray-600'}`}>Don't reveal the word!</AppText>
                        </View>
                    </View>
                </View>
            </View>

            <View className="w-full px-6 pb-8">
                <Button
                    title="Time to vote"
                    onPress={() => router.replace('/game/vote')}
                    className="w-full h-14"
                    textClassName="text-base"
                />
            </View>
        </ScreenWrapper>
    );
}
