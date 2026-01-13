import { useRouter } from 'expo-router';
import ScreenWrapper from '../components/ScreenWrapper';
import { AppText } from '../components/Typography';

export default function HowToPlay() {
    const router = useRouter();
    return (
        <ScreenWrapper scroll showBackButton={true}>
            <AppText variant="h1">How to Play</AppText>

            <AppText variant="h2" className="mt-4 text-primary-soft">The Concept</AppText>
            <AppText className="mb-4 text-text-secondary">
                A group of players share one phone. One or more players are Impostors. Everyone else is a Civilian.
                Civilians know the Secret Word. Impostors do not.
            </AppText>

            <AppText variant="h2" className="text-primary-soft">Gameplay</AppText>
            <AppText className="mb-2 text-text-secondary">1. Pass the phone to reveal your role.</AppText>
            <AppText className="mb-2 text-text-secondary">2. The app assigns a secret word to Civilians.</AppText>
            <AppText className="mb-2 text-text-secondary">3. Speak one word related to the secret word in the assigned order.</AppText>
            <AppText className="mb-4 text-text-secondary">4. Discuss and vote to eliminate the Impostor.</AppText>

            <AppText variant="h2" className="text-primary-soft">Winning</AppText>
            <AppText className="mb-2 text-text-secondary">• Civilians win if they eliminate all Impostors.</AppText>
            <AppText className="mb-8 text-text-secondary">• Impostors win if they outnumber Civilians OR guess the word correctly upon elimination.</AppText>

        </ScreenWrapper>
    )
}
