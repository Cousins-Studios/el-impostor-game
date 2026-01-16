import { create } from 'zustand';
import { THEME_WORDS_BY_LANG, ThemeKey } from '../constants/Themes';
import { useSettingsStore } from './settingsStore';

export type Role = 'civilian' | 'impostor';

export interface Player {
    id: string;
    name: string;
    role: Role;
    isAlive: boolean;
}

interface GameSettings {
    impostorMode: 'fixed' | 'probability';
    fixedImpostorCount: number;
    probabilityImpostorCount: number;
    impostorProbability: number; // 0-100
    theme: ThemeKey;
    customWords: string[];
}

interface GameState {
    players: Player[];
    settings: GameSettings;
    secretWord: string;
    starterPlayerId: string | null;
    direction: 'Left' | 'Right' | null;
    roundNumber: number;
    gameStatus: 'setup' | 'playing' | 'discussion' | 'finished';
    winner: 'civilian' | 'impostor' | null;
    winnerReason: 'majority' | 'guess' | 'eliminated' | null;
    eliminatedPlayerId: string | null;

    // Actions
    addPlayer: (name: string) => void;
    removePlayer: (id: string) => void;
    reorderPlayers: (players: Player[]) => void;
    updateSettings: (settings: Partial<GameSettings>) => void;
    addCustomWord: (word: string) => void;
    removeCustomWord: (word: string) => void;

    startGame: () => void;
    startRound: () => void;
    voteToEliminate: (playerId: string) => void;
    checkVictoryAfterElimination: () => boolean;
    impostorGuess: (word: string) => boolean;
    resolveImpostorGuess: (didGuess: boolean) => void;
    nextRound: () => void;
    undoElimination: () => void;
    resetGame: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
    players: [],
    settings: {
        impostorMode: 'fixed',
        fixedImpostorCount: 1,
        probabilityImpostorCount: 2,
        impostorProbability: 50,
        theme: 'Movies',
        customWords: [],
    },
    secretWord: '',
    starterPlayerId: null,
    direction: null,
    roundNumber: 0,
    gameStatus: 'setup',
    winner: null,
    winnerReason: null,
    eliminatedPlayerId: null,

    addPlayer: (name) => set((state) => ({
        players: [...state.players, {
            id: Math.random().toString(36).substr(2, 9),
            name,
            role: 'civilian',
            isAlive: true
        }]
    })),

    removePlayer: (id) => set((state) => ({
        players: state.players.filter(p => p.id !== id)
    })),

    reorderPlayers: (players) => set({ players }),

    updateSettings: (newSettings) => set((state) => ({
        settings: { ...state.settings, ...newSettings }
    })),

    addCustomWord: (word) => set((state) => ({
        settings: { ...state.settings, customWords: [...state.settings.customWords, word] }
    })),

    removeCustomWord: (word) => set((state) => ({
        settings: { ...state.settings, customWords: state.settings.customWords.filter(w => w !== word) }
    })),

    startGame: () => {
        const { players, settings } = get();
        // 1. Determine Impostor Count
        let numImpostors = 1;
        if (settings.impostorMode === 'fixed') {
            numImpostors = settings.fixedImpostorCount;
        } else {
            const isLucky = Math.random() * 100 < settings.impostorProbability;
            numImpostors = isLucky ? settings.probabilityImpostorCount : 1;
        }

        // 2. Assign Roles
        const shuffledIds = [...players].map(p => p.id).sort(() => Math.random() - 0.5);
        const impostorIds = new Set(shuffledIds.slice(0, numImpostors));

        const newPlayers = players.map(p => ({
            ...p,
            role: (impostorIds.has(p.id) ? 'impostor' : 'civilian') as Role,
            isAlive: true
        }));

        // 3. Select Word
        let wordList: string[] = [];
        if (settings.theme === 'Custom') {
            wordList = settings.customWords.length > 0 ? settings.customWords : ['Secret'];
        } else {
            const { language } = useSettingsStore.getState();
            // Get words for current language, fallback to English if not found
            const wordsForLang = THEME_WORDS_BY_LANG[language] || THEME_WORDS_BY_LANG['en'];
            wordList = wordsForLang[settings.theme] || ['Default'];
        }
        const secretWord = wordList[Math.floor(Math.random() * wordList.length)];

        set({
            players: newPlayers,
            secretWord,
            roundNumber: 0, // Will start naturally
            gameStatus: 'playing', // or 'reveal' logic handled in UI
            winner: null,
            winnerReason: null,
            eliminatedPlayerId: null
        });

        get().startRound(); // initialize first round starter
    },

    startRound: () => {
        const { players } = get();
        const alive = players.filter(p => p.isAlive);
        if (alive.length === 0) return;

        const starter = alive[Math.floor(Math.random() * alive.length)];
        const dir = Math.random() > 0.5 ? 'Left' : 'Right';
        set((state) => ({
            starterPlayerId: starter.id,
            direction: dir,
            roundNumber: state.roundNumber + 1
        }));
    },

    voteToEliminate: (playerId) => {
        set((state) => ({
            players: state.players.map(p => p.id === playerId ? { ...p, isAlive: false } : p),
            eliminatedPlayerId: playerId
        }));
    },

    checkVictoryAfterElimination: () => {
        const { players } = get();
        const impostorsAlive = players.filter(p => p.role === 'impostor' && p.isAlive).length;
        const civiliansAlive = players.filter(p => p.role === 'civilian' && p.isAlive).length;

        // 1) Civilians Win
        if (impostorsAlive === 0) {
            set({ winner: 'civilian', winnerReason: 'eliminated', gameStatus: 'finished' });
            return true;
        }
        // 2) Impostors Win by Majority
        else if (impostorsAlive >= civiliansAlive) {
            set({ winner: 'impostor', winnerReason: 'majority', gameStatus: 'finished' });
            return true;
        }
        return false;
    },

    resolveImpostorGuess: (didGuess) => {
        if (didGuess) {
            set({ winner: 'impostor', winnerReason: 'guess', gameStatus: 'finished' });
        } else {
            // If they didn't guess, we just let the normal flow continue
            // The victory check will be called from the UI
        }
    },

    impostorGuess: (guess) => {
        const { secretWord } = get();
        if (guess.trim().toLowerCase() === secretWord.toLowerCase()) {
            set({ winner: 'impostor', winnerReason: 'guess', gameStatus: 'finished' });
            return true;
        } else {
            // If incorrect, impostor is eliminated (already done before guess usually, or we do it now?)
            // "If incorrect: Impostor is eliminated, Game continues"
            // Usually this logic is: Eliminated -> Revealed as Impostor -> Gets Guess -> Fails -> REALLY dead.
            // Logic is preserved.
            return false;
        }
    },

    undoElimination: () => {
        const { eliminatedPlayerId } = get();
        if (eliminatedPlayerId) {
            set((state) => ({
                players: state.players.map(p => p.id === eliminatedPlayerId ? { ...p, isAlive: true } : p),
                eliminatedPlayerId: null,
                gameStatus: 'discussion' // Restore status if needed
            }));
        }
    },

    nextRound: () => {
        get().startRound();
    },

    resetGame: () => {
        set((state) => ({
            gameStatus: 'setup',
            winner: null,
            winnerReason: null,
            roundNumber: 0,
            players: state.players.map(p => ({ ...p, role: 'civilian', isAlive: true })),
            eliminatedPlayerId: null,
            secretWord: ''
        }));
    }
}));
