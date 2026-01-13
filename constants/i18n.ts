import { useSettingsStore } from "../store/settingsStore";

export type Language = 'es' | 'en' | 'fr' | 'de' | 'it';

export const TRANSLATIONS = {
    es: {
        common: {
            back: "Volver",
            confirm: "Confirmar",
            next: "Siguiente",
            loading: "Cargando...",
            ready: "¿Listo?",
            passPhoneFirst: "Pasa el teléfono al primer jugador ahora."
        },
        home: {
            title: "El Impostor",
            subtitle: "Encuentra al que no sabe la palabra",
            play: "Jugar",
            howToPlay: "Cómo Jugar"
        },
        settings: {
            title: "Configuración",
            language: "Idioma",
            theme: "Tema",
            dark: "Oscuro",
            light: "Claro",
            version: "Versión"
        },
        playerSetup: {
            title: "Jugadores",
            addPlayer: "Agregar Jugador",
            namePlaceholder: "Nombre del jugador",
            startGame: "Comenzar Juego",
            minPlayers: "Mínimo 3 jugadores",
            duplicateTitle: "Nombre Duplicado",
            duplicateNameError: "Ya hay un jugador con ese nombre. ¡Elige otro!"
        },
        gameConfig: {
            title: "Configuración",
            impostors: "Impostores",
            impostorDesc: "Define cuántos impostores habrá en la partida",
            modeFixed: "Fijo",
            modeProb: "Probabilidad",
            count: "Cantidad",
            prob: "Probabilidad",
            continue: "Continuar",
            mode: "Modo"
        },
        themeSelection: {
            title: "Temas",
            subtitle: "Elige la categoría de palabras",
            categories: {
                Sports: "Deportes",
                Animals: "Animales",
                Food: "Comida",
                Movies: "Películas",
                Countries: "Países",
                Custom: "Personalizado"
            },
            poolSize: "Cantidad de palabras"
        },
        reveal: {
            title: "Rol Secreto",
            tapToReveal: "Mantén presionado para revelar",
            youAre: "Eres",
            impostor: "Impostor",
            civilian: "Civil",
            secretWord: "Palabra Secreta",
            nextPlayer: "Siguiente Jugador",
            startGame: "Empezar Partida",
            passPhone: "Pasa el teléfono a este jugador",
            onlyLook: "Solo mira si eres",
            undetected: "Modo Indetectable Activo",
            civilianProtocol: "Protocolo Civil"
        },
        roundStart: {
            startingPlayer: "Jugador Inicial",
            direction: "Dirección",
            left: "Izquierda",
            right: "Derecha",
            instruction: "Empezando por {player}, vayan hacia la {direction} y digan una palabra relacionada.",
            startRound: "Empezar Ronda"
        },
        play: {
            title: "Jugadores hablando",
            subtitle: "Digan una palabra relacionada a la palabra secreta",
            tip1: "Sé sutil pero no demasiado vago",
            tip2: "Escucha con atención a los demás",
            tip3: "¡No reveles la palabra!",
            timeToVote: "Hora de votar"
        },
        vote: {
            title: "¿Quién es el Impostor?",
            subtitle: "Discutan y seleccionen al jugador a eliminar",
            eliminate: "Eliminar Jugador"
        },
        elimination: {
            title: "Eliminado",
            impostorLabel: "IMPOSTOR",
            civilianLabel: "CIVIL",
            impostorFound: "¡Bien hecho! Encontraron al impostor.",
            civilianEliminated: "¡Ups! Eliminaron a un inocente.",
            lastChance: "ÚLTIMA OPORTUNIDAD: ¿ADIVINÓ LA PALABRA?",
            yes: "SÍ",
            no: "NO",
            seeResults: "Ver Resultados"
        },
        victory: {
            impostorsWin: "IMPOSTORES\nGANAN",
            civiliansWin: "CIVILES\nGANAN",
            reasonImpostor: "¡Los impostores superan a los civiles!",
            reasonCivilian: "¡Todos los impostores han sido eliminados!",
            secretWordWas: "LA PALABRA ERA",
            playAgain: "Jugar de Nuevo",
            backHome: "Volver al Inicio"
        },
        howToPlay: {
            title: "Cómo Jugar",
            step1Title: "1. Pasa el teléfono",
            step1Desc: "Cada jugador ve su rol secreto. Los civiles reciben una palabra, los impostores no.",
            step2Title: "2. Discutan",
            step2Desc: "Por turnos digan una palabra relacionada. ¡Sean sutiles!",
            step3Title: "3. Eliminen",
            step3Desc: "Después de discutir, voten para eliminar a quien crean que es el Impostor.",
            step4Title: "4. Ganen",
            step4Desc: "Civiles ganan si eliminan al Impostor. Impostor gana si sobrevive o adivina la palabra."
        }
    },
    en: {
        common: {
            back: "Back",
            confirm: "Confirm",
            next: "Next",
            loading: "Loading...",
            ready: "Ready?",
            passPhoneFirst: "Pass the phone to the first player now."
        },
        home: {
            title: "The Impostor",
            subtitle: "Find who doesn't know the word",
            play: "Play",
            howToPlay: "How to Play"
        },
        settings: {
            title: "Settings",
            language: "Language",
            theme: "Theme",
            dark: "Dark",
            light: "Light",
            version: "Version"
        },
        playerSetup: {
            title: "Players",
            addPlayer: "Add Player",
            namePlaceholder: "Player name",
            startGame: "Start Game",
            minPlayers: "Min 3 players",
            duplicateTitle: "Duplicate Name",
            duplicateNameError: "That name is already taken. Pick another one!"
        },
        gameConfig: {
            title: "Config",
            impostors: "Impostors",
            impostorDesc: "Define how many impostors are in the game",
            modeFixed: "Fixed",
            modeProb: "Probability",
            count: "Count",
            prob: "Probability",
            continue: "Continue",
            mode: "Mode"
        },
        themeSelection: {
            title: "Themes",
            subtitle: "Choose the word category",
            categories: {
                Sports: "Sports",
                Animals: "Animals",
                Food: "Food",
                Movies: "Movies",
                Countries: "Countries",
                Custom: "Custom"
            },
            poolSize: "Pool Size"
        },
        reveal: {
            title: "Secret Role",
            tapToReveal: "Hold to reveal",
            youAre: "You are",
            impostor: "Impostor",
            civilian: "Civilian",
            secretWord: "Secret Word",
            nextPlayer: "Next Player",
            startGame: "Start Game",
            passPhone: "Pass the phone to this player",
            onlyLook: "Only look if you are",
            undetected: "Undetected Mode Active",
            civilianProtocol: "Civilian Protocol"
        },
        roundStart: {
            startingPlayer: "Starting Player",
            direction: "Direction",
            left: "Left",
            right: "Right",
            instruction: "Starting with {player}, go {direction} and say one word related to the secret word.",
            startRound: "Start Round"
        },
        play: {
            title: "Players speaking",
            subtitle: "Say one word related to the secret word",
            tip1: "Be subtle but not too vague",
            tip2: "Listen carefully to others",
            tip3: "Don't reveal the word!",
            timeToVote: "Time to vote"
        },
        vote: {
            title: "Who is the Impostor?",
            subtitle: "Discuss and select the player to eliminate",
            eliminate: "Eliminate Player"
        },
        elimination: {
            title: "Eliminated",
            impostorLabel: "IMPOSTOR",
            civilianLabel: "CIVILIAN",
            impostorFound: "Great job! You found the impostor.",
            civilianEliminated: "Oops! You voted out an innocent.",
            lastChance: "LAST CHANCE: DID THEY GUESS THE WORD?",
            yes: "YES",
            no: "NO",
            seeResults: "See Results"
        },
        victory: {
            impostorsWin: "IMPOSTORS\nWIN",
            civiliansWin: "CIVILIANS\nWIN",
            reasonImpostor: "Impostors outnumbered civilians!",
            reasonCivilian: "All impostors have been eliminated!",
            secretWordWas: "THE SECRET WORD WAS",
            playAgain: "Play Again",
            backHome: "Back to Home"
        },
        howToPlay: {
            title: "How to Play",
            step1Title: "1. Pass the phone",
            step1Desc: "Each player sees their secret role. Civilians get a secret word. Impostors see nothing.",
            step2Title: "2. Discuss",
            step2Desc: "Players take turns saying one word related to the secret word. Be subtle!",
            step3Title: "3. Eliminate",
            step3Desc: "After discussion, vote to eliminate who you think is the Impostor.",
            step4Title: "4. Win",
            step4Desc: "Civilians win if they eliminate the Impostor. Impostor wins if they survive or guess the secret word."
        }
    },
    fr: {
        common: {
            back: "Retour",
            confirm: "Confirmer",
            next: "Suivant",
            loading: "Chargement...",
            ready: "Prêt ?",
            passPhoneFirst: "Passez le téléphone au premier joueur."
        },
        home: {
            title: "L'Imposteur",
            subtitle: "Trouvez qui ne connaît pas le mot",
            play: "Jouer",
            howToPlay: "Comment Jouer"
        },
        settings: {
            title: "Paramètres",
            language: "Langue",
            theme: "Thème",
            dark: "Sombre",
            light: "Clair",
            version: "Version"
        },
        playerSetup: {
            title: "Joueurs",
            addPlayer: "Ajouter Joueur",
            namePlaceholder: "Nom du joueur",
            startGame: "Commencer",
            minPlayers: "Min 3 joueurs",
            duplicateTitle: "Nom Dupliqué",
            duplicateNameError: "Ce nom est déjà pris. Choisissez-en un autre !"
        },
        gameConfig: {
            title: "Config",
            impostors: "Imposteurs",
            impostorDesc: "Définir le nombre d'imposteurs",
            modeFixed: "Fixe",
            modeProb: "Probabilité",
            count: "Nombre",
            prob: "Probabilité",
            continue: "Continuer",
            mode: "Mode"
        },
        themeSelection: {
            title: "Thèmes",
            subtitle: "Choisissez la catégorie",
            categories: {
                Sports: "Sports",
                Animals: "Animaux",
                Food: "Nourriture",
                Movies: "Films",
                Countries: "Pays",
                Custom: "Personnalisé"
            },
            poolSize: "Mots disponibles"
        },
        reveal: {
            title: "Rôle Secret",
            tapToReveal: "Maintenez pour révéler",
            youAre: "Vous êtes",
            impostor: "Imposteur",
            civilian: "Civil",
            secretWord: "Mot Secret",
            nextPlayer: "Joueur Suivant",
            startGame: "Commencer",
            passPhone: "Passez le téléphone à ce joueur",
            onlyLook: "Regardez seulement si vous êtes",
            undetected: "Mode Indétectable Actif",
            civilianProtocol: "Protocole Civil"
        },
        roundStart: {
            startingPlayer: "Premier Joueur",
            direction: "Direction",
            left: "Gauche",
            right: "Droite",
            instruction: "En commençant par {player}, allez vers la {direction} et dites un mot.",
            startRound: "Commencer le Tour"
        },
        play: {
            title: "Phase de parole",
            subtitle: "Dites un mot lié au mot secret",
            tip1: "Soyez subtil mais pas trop vague",
            tip2: "Écoutez attentivement les autres",
            tip3: "Ne révélez pas le mot !",
            timeToVote: "Passer au vote"
        },
        vote: {
            title: "Qui est l'Imposteur ?",
            subtitle: "Discutez et votez pour éliminer",
            eliminate: "Éliminer"
        },
        elimination: {
            title: "Éliminé",
            impostorLabel: "IMPOSTEUR",
            civilianLabel: "CIVIL",
            impostorFound: "Bravo ! Vous avez trouvé l'imposteur.",
            civilianEliminated: "Oups ! Vous avez éliminé un innocent.",
            lastChance: "DERNIÈRE CHANCE : A-T-IL DEVINÉ ?",
            yes: "OUI",
            no: "NON",
            seeResults: "Voir Résultats"
        },
        victory: {
            impostorsWin: "LES IMPOSTEURS\nGAGNENT",
            civiliansWin: "LES CIVILS\nGAGNENT",
            reasonImpostor: "Les imposteurs sont majoritaires !",
            reasonCivilian: "Tous les imposteurs sont éliminés !",
            secretWordWas: "LE MOT ÉTAIT",
            playAgain: "Rejouer",
            backHome: "Accueil"
        },
        howToPlay: {
            title: "Règles",
            step1Title: "1. Passez le téléphone",
            step1Desc: "Chacun voit son rôle. Les civils ont un mot, les imposteurs rien.",
            step2Title: "2. Discutez",
            step2Desc: "Dites un mot lié au secret chacun votre tour. Soyez subtils !",
            step3Title: "3. Éliminez",
            step3Desc: "Après discussion, votez pour éliminer l'imposteur suspecté.",
            step4Title: "4. Victoire",
            step4Desc: "Les civils gagnent s'ils trouvent l'imposteur. L'imposteur gagne s'il survit ou devine le mot."
        }
    },
    de: {
        common: {
            back: "Zurück",
            confirm: "Bestätigen",
            next: "Weiter",
            loading: "Laden...",
            ready: "Bereit?",
            passPhoneFirst: "Gib das Handy dem ersten Spieler."
        },
        home: {
            title: "Der Impostor",
            subtitle: "Finde heraus, wer das Wort nicht kennt",
            play: "Spielen",
            howToPlay: "Spielanleitung"
        },
        settings: {
            title: "Einstellungen",
            language: "Sprache",
            theme: "Thema",
            dark: "Dunkel",
            light: "Hell",
            version: "Version"
        },
        playerSetup: {
            title: "Spieler",
            addPlayer: "Spieler hinzufügen",
            namePlaceholder: "Spielername",
            startGame: "Spiel starten",
            minPlayers: "Min 3 Spieler",
            duplicateTitle: "Doppelter Name",
            duplicateNameError: "Name bereits vergeben. Wähle einen anderen!"
        },
        gameConfig: {
            title: "Konfig",
            impostors: "Verräter",
            impostorDesc: "Anzahl der Verräter festlegen",
            modeFixed: "Fest",
            modeProb: "Wahrsh.",
            count: "Anzahl",
            prob: "Wahrsh.",
            continue: "Weiter",
            mode: "Modus"
        },
        themeSelection: {
            title: "Themen",
            subtitle: "Wähle eine Kategorie",
            categories: {
                Sports: "Sport",
                Animals: "Tiere",
                Food: "Essen",
                Movies: "Filme",
                Countries: "Länder",
                Custom: "Benutzerdefiniert"
            },
            poolSize: "Wortanzahl"
        },
        reveal: {
            title: "Geheime Rolle",
            tapToReveal: "Gedrückt halten zum Aufdecken",
            youAre: "Du bist",
            impostor: "Verräter",
            civilian: "Zivilist",
            secretWord: "Geheimes Wort",
            nextPlayer: "Nächster",
            startGame: "Starten",
            passPhone: "Gib das Handy an diesen Spieler",
            onlyLook: "Nur ansehen, wenn du",
            undetected: "Unentdeckt-Modus Aktiv",
            civilianProtocol: "Zivilisten-Protokoll"
        },
        roundStart: {
            startingPlayer: "Startspieler",
            direction: "Richtung",
            left: "Links",
            right: "Rechts",
            instruction: "Beginnend mit {player}, geht nach {direction} und sagt ein Wort.",
            startRound: "Runde Starten"
        },
        play: {
            title: "Sprechrunde",
            subtitle: "Sagt ein Wort zum geheimen Begriff",
            tip1: "Sei subtil, aber nicht zu vage",
            tip2: "Hör den anderen gut zu",
            tip3: "Verrate das Wort nicht!",
            timeToVote: "Abstimmen"
        },
        vote: {
            title: "Wer ist der Verräter?",
            subtitle: "Diskutiert und wählt jemanden aus",
            eliminate: "Eliminieren"
        },
        elimination: {
            title: "Eliminiert",
            impostorLabel: "VERRÄTER",
            civilianLabel: "ZIVILIST",
            impostorFound: "Super! Ihr habt den Verräter gefunden.",
            civilianEliminated: "Ups! Ihr habt einen Unschuldigen erwischt.",
            lastChance: "LETZTE CHANCE: WORT ERRATEN?",
            yes: "JA",
            no: "NEIN",
            seeResults: "Ergebnisse"
        },
        victory: {
            impostorsWin: "VERRÄTER\nGEWINNEN",
            civiliansWin: "ZIVILISTEN\nGEWINNEN",
            reasonImpostor: "Die Verräter sind in der Überzahl!",
            reasonCivilian: "Alle Verräter wurden eliminiert!",
            secretWordWas: "DAS WORT WAR",
            playAgain: "Nochmal spielen",
            backHome: "Startseite"
        },
        howToPlay: {
            title: "Anleitung",
            step1Title: "1. Handy weitergeben",
            step1Desc: "Jeder sieht seine Rolle. Zivilisten sehen das Wort, Verräter nichts.",
            step2Title: "2. Diskutieren",
            step2Desc: "Reihum sagt jeder ein Wort passend zum Thema. Seid subtil!",
            step3Title: "3. Eliminieren",
            step3Desc: "Nach der Diskussion wird abgestimmt, wer rausfliegt.",
            step4Title: "4. Gewinnen",
            step4Desc: "Zivilisten siegen, wenn der Verräter fliegt. Verräter siegt, wenn er überlebt oder das Wort errät."
        }
    },
    it: {
        common: {
            back: "Indietro",
            confirm: "Conferma",
            next: "Avanti",
            loading: "Caricamento...",
            ready: "Pronto?",
            passPhoneFirst: "Passa il telefono al primo giocatore."
        },
        home: {
            title: "L'Impostore",
            subtitle: "Trova chi non conosce la parola",
            play: "Gioca",
            howToPlay: "Come Giocare"
        },
        settings: {
            title: "Impostazioni",
            language: "Lingua",
            theme: "Tema",
            dark: "Scuro",
            light: "Chiaro",
            version: "Versione"
        },
        playerSetup: {
            title: "Giocatori",
            addPlayer: "Aggiungi Giocatore",
            namePlaceholder: "Nome giocatore",
            startGame: "Inizia Gioco",
            minPlayers: "Min 3 giocatori",
            duplicateTitle: "Nome Duplicato",
            duplicateNameError: "Nome già in uso. Scegline un altro!"
        },
        gameConfig: {
            title: "Config",
            impostors: "Impostori",
            impostorDesc: "Definisci quanti impostori ci sono",
            modeFixed: "Fisso",
            modeProb: "Probabilità",
            count: "Quantità",
            prob: "Probabilità",
            continue: "Continua",
            mode: "Modalità"
        },
        themeSelection: {
            title: "Temi",
            subtitle: "Scegli la categoria",
            categories: {
                Sports: "Sport",
                Animals: "Animali",
                Food: "Cibo",
                Movies: "Film",
                Countries: "Paesi",
                Custom: "Personalizzato"
            },
            poolSize: "Numero parole"
        },
        reveal: {
            title: "Ruolo Segreto",
            tapToReveal: "Tieni premuto per rivelare",
            youAre: "Sei",
            impostor: "Impostore",
            civilian: "Civile",
            secretWord: "Parola Segreta",
            nextPlayer: "Prossimo",
            startGame: "Inizia",
            passPhone: "Passa il telefono a questo giocatore",
            onlyLook: "Guarda solo se sei",
            undetected: "Modalità Non Rilevato Attiva",
            civilianProtocol: "Protocollo Civile"
        },
        roundStart: {
            startingPlayer: "Primo Giocatore",
            direction: "Direzione",
            left: "Sinistra",
            right: "Destra",
            instruction: "Iniziando da {player}, andate a {direction} e dite una parola.",
            startRound: "Inizia Round"
        },
        play: {
            title: "Fase Parlata",
            subtitle: "Dite una parola legata al segreto",
            tip1: "Sii sottile ma non troppo vago",
            tip2: "Ascolta attentamente gli altri",
            tip3: "Non rivelare la parola!",
            timeToVote: "Vota"
        },
        vote: {
            title: "Chi è l'Impostore?",
            subtitle: "Discutete e scegliete chi eliminare",
            eliminate: "Elimina"
        },
        elimination: {
            title: "Eliminato",
            impostorLabel: "IMPOSTORE",
            civilianLabel: "CIVILE",
            impostorFound: "Ottimo! Avete trovato l'impostore.",
            civilianEliminated: "Ops! Avete eliminato un innocente.",
            lastChance: "ULTIMA CHANCE: HA INDOVINATO?",
            yes: "SÌ",
            no: "NO",
            seeResults: "Risultati"
        },
        victory: {
            impostorsWin: "VINCONO GLI\nIMPOSTORI",
            civiliansWin: "VINCONO I\nCIVILI",
            reasonImpostor: "Gli impostori sono in maggioranza!",
            reasonCivilian: "Tutti gli impostori eliminati!",
            secretWordWas: "LA PAROLA ERA",
            playAgain: "Gioca Ancora",
            backHome: "Home"
        },
        howToPlay: {
            title: "Come Giocare",
            step1Title: "1. Passa il telefono",
            step1Desc: "Ognuno vede il suo ruolo. I civili vedono la parola, gli impostori no.",
            step2Title: "2. Parlate",
            step2Desc: "A turno dite una parola inerente. Siate sottili!",
            step3Title: "3. Eliminate",
            step3Desc: "Dopo la discussione, votate per eliminare il sospettato.",
            step4Title: "4. Vittoria",
            step4Desc: "I civili vincono se eliminano l'impostore. L'impostore vince se sopravvive o indovina la parola."
        }
    }
};

export const useI18n = () => {
    const { language } = useSettingsStore();
    return TRANSLATIONS[language];
};
