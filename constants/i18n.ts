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
            passPhoneFirst: "Presiona el botón \"Comenzar Juego\" y pasa el teléfono al primer jugador."
        },
        home: {
            title: "El Impostor",
            subtitle: "Encuentra al que no sabe la palabra",
            play: "Jugar",
            howToPlay: "Cómo Jugar",
            appGuideButton: "Guía de la App"
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
            mode: "Modo",
            prob: "Probabilidad",
            continue: "Continuar",
            modeExplained: "¿Cómo funcionan los modos?",
            modeProbLimit: "El modo Probabilidad requiere al menos 4 jugadores.",
            helpFixedTitle: "Modo Fijo",
            helpFixedDesc: "¡Sin sorpresas! El número de impostores será exactamente el que tú elijas. Si configuras 1 impostor, habrá 1. Si configuras 2, habrá 2.\n\nEs el modo ideal para partidas equilibradas donde todos saben contra cuántos enemigos están luchando.",
            helpProbTitle: "Modo Probabilidad",
            helpProbDesc: "¡Pura incertidumbre!\n\nEn este modo siempre habrá al menos un impostor, pero existe la posibilidad de que aparezcan más.\n\nAntes de iniciar la partida se define una cantidad posible de impostores extra y una probabilidad.\n\nSi la suerte acompaña, la partida tendrá la cantidad de impostores que se definio. Si no, el juego continuará con solo 1.\n\nNadie sabe si habrá uno o más enemigos acechando, y esa duda constante aumenta la tensión y la desconfianza entre los jugadores."
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
            poolSize: "Cantidad de palabras",
            addWord: "Agregar palabra",
            noWordsAdded: "No se han agregado palabras",
            ideasButton: "Ideas para temas",
            ideas: {
                title: "Ideas para Temas",
                playerNames: {
                    title: "Nombres de Jugadores",
                    desc: "¡Usa los nombres de quienes están jugando! La palabra secreta será uno de ustedes. ¿Podrán describirse sin decir el nombre?"
                },
                themeMix: {
                    title: "Mezcla de Temas",
                    desc: "Combina palabras de diferentes categorías: deportes, animales, películas... ¡Todo mezclado para mayor dificultad!"
                },
                knownPeople: {
                    title: "Personas Conocidas",
                    desc: "Amigos en común, familiares, profesores, compañeros de trabajo... ¡Personas fuera del juego que todos conocen!"
                },
                beCreative: {
                    title: "¡Sean Creativos!",
                    desc: "Chistes internos, lugares favoritos, recuerdos, palabras inventadas... ¡No hay límites! Piensen en algo divertido y único para su grupo."
                }
            }
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
            seeResults: "Ver Resultados",
            nextRound: "Siguiente Ronda"
        },
        victory: {
            impostorsWin: "IMPOSTORES\nGANAN",
            civiliansWin: "CIVILES\nGANAN",
            reasonImpostor: "¡Los impostores superan a los civiles!",
            reasonImpostorGuess: "¡Los impostores adivinaron la palabra!",
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
            step4Desc: "Los civiles ganan al eliminar a todos los impostores. Los impostores ganan si igualan o superan en número a los civiles, o si adivinan la palabra."
        },
        appGuide: {
            title: "Guía de la App",
            step1Title: "1. Añade Jugadores",
            step1Desc: "Escribe los nombres de los participantes. Necesitas al menos 3 para empezar. ¡Puedes reordenarlos arrastrando!",
            step2Title: "2. Configuración",
            step2Desc: "Elige cuántos impostores quieres. Usa el modo 'Fijo' para saber cuántos hay, o 'Probabilidad' para añadir misterio.",
            step3Title: "3. Temas",
            step3Desc: "Selecciona una categoría de palabras. ¡Cada tema tiene cientos de palabras secretas!",
            step4Title: "4. El Giro",
            step4Desc: "Sigue las instrucciones en pantalla. Pasa el teléfono al jugador indicado y mantén presionada la tarjeta para ver tu rol.",
            step5Title: "5. Jugando",
            step5Desc: "La app te dirá quién empieza y en qué dirección. ¡No te pierdas!",
            step6Title: "6. Selección",
            step6Desc: "Cuando llegue la hora de votar, simplemente toca el nombre del jugador que quieres eliminar.",
            finish: "¡Entendido!"
        }
    },
    en: {
        common: {
            back: "Back",
            confirm: "Confirm",
            next: "Next",
            loading: "Loading...",
            ready: "Ready?",
            passPhoneFirst: "Press the 'Start Game' button and pass the phone to the first player."
        },
        home: {
            title: "The Impostor",
            subtitle: "Find who doesn't know the word",
            play: "Play",
            howToPlay: "How to Play",
            appGuideButton: "App Guide"
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
            mode: "Mode",
            prob: "Probability",
            continue: "Continue",
            modeExplained: "How do modes work?",
            modeProbLimit: "Probability mode requires at least 4 players.",
            helpFixedTitle: "Fixed Mode",
            helpFixedDesc: "No surprises! The number of impostors will be exactly what you choose. If you set 1 impostor, there will be 1. If you set 2, there will be 2.\n\nThis is the ideal mode for balanced games where everyone knows how many enemies they are up against.",
            helpProbTitle: "Probability Mode",
            helpProbDesc: "Pure uncertainty!\n\nIn this mode, there will always be at least one impostor, but there's a chance for more to appear.\n\nBefore starting the game, you define the maximum possible number of additional impostors and the probability of them appearing.\n\nIf luck is on your side, the game will have the number of impostors defined. If not, it will continue with just 1.\n\nNo one knows for sure if there will be one or more enemies lurking, and that constant doubt increases the tension and distrust among players."
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
            poolSize: "Pool Size",
            addWord: "Add word",
            noWordsAdded: "No words added yet",
            ideasButton: "Theme ideas",
            ideas: {
                title: "Theme Ideas",
                playerNames: {
                    title: "Player Names",
                    desc: "Use the names of the players! The secret word will be one of you. Can you describe each other without saying the name?"
                },
                themeMix: {
                    title: "Theme Mix",
                    desc: "Mix words from different categories: sports, animals, movies... All mixed up for extra difficulty!"
                },
                knownPeople: {
                    title: "People You Know",
                    desc: "Mutual friends, family members, teachers, coworkers... People outside the game that everyone knows!"
                },
                beCreative: {
                    title: "Be Creative!",
                    desc: "Inside jokes, favorite places, memories, made-up words... No limits! Think of something fun and unique for your group."
                }
            }
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
            seeResults: "See Results",
            nextRound: "Next Round"
        },
        victory: {
            impostorsWin: "IMPOSTORS\nWIN",
            civiliansWin: "CIVILIANS\nWIN",
            reasonImpostor: "Impostors outnumbered civilians!",
            reasonImpostorGuess: "The impostors guessed the word!",
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
            step4Desc: "Civilians win if they eliminate all impostors. Impostors win if they equal or outnumber civilians, or if they guess the secret word."
        },
        appGuide: {
            title: "App Guide",
            step1Title: "1. Add Players",
            step1Desc: "Type the names of the participants. You need at least 3 to start. You can reorder them by dragging!",
            step2Title: "2. Configuration",
            step2Desc: "Choose how many impostors you want. Use 'Fixed' mode to know the exact count, or 'Probability' for more mystery.",
            step3Title: "3. Themes",
            step3Desc: "Select a word category. Each theme has hundreds of secret words!",
            step4Title: "4. The Reveal",
            step4Desc: "Follow the screen instructions. Pass the phone to the indicated player and hold the card to see your role.",
            step5Title: "5. Playing",
            step5Desc: "The app will tell you who starts and in which direction. Don't get lost!",
            step6Title: "6. Selection",
            step6Desc: "When it's time to vote, simply tap the name of the player you want to eliminate.",
            finish: "Got it!"
        }
    },
    fr: {
        common: {
            back: "Retour",
            confirm: "Confirmer",
            next: "Suivant",
            loading: "Chargement...",
            ready: "Prêt ?",
            passPhoneFirst: "Appuyez sur le bouton 'Commencer Jeu' et passez le téléphone au premier joueur."
        },
        home: {
            title: "L'Imposteur",
            subtitle: "Trouvez qui ne connaît pas le mot",
            play: "Jouer",
            howToPlay: "Comment Jouer",
            appGuideButton: "Guide de l'App"
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
            mode: "Mode",
            prob: "Probabilité",
            continue: "Continuer",
            modeExplained: "Comment fonctionnent les modes ?",
            modeProbLimit: "Le mode Probabilité nécessite au moins 4 joueurs.",
            helpFixedTitle: "Mode Fixe",
            helpFixedDesc: "Pas de surprises ! Le nombre d'imposteurs sera exactement celui que vous choisirez. Si vous réglez 1 imposteur, il y en aura 1. Si vous en réglez 2, il y en aura 2.\n\nC'est le mode idéal pour des parties équilibrées où tout le monde sait contre combien d'ennemis il se bat.",
            helpProbTitle: "Mode Probabilité",
            helpProbDesc: "Pura incertidumbre !\n\nDans ce mode, il y aura toujours au moins un imposteur, mais il y a une possibilité que d'autres apparaissent.\n\nAvant de commencer la partie, vous définissez le nombre maximum possible d'imposteurs supplémentaires et la probabilité qu'ils apparaissent.\n\nSi la chance vous sourit, la partie aura la quantité d'imposteurs définie. Sinon, elle continuera avec seulement 1.\n\nPersonne ne sait avec certitude s'il y aura un ou plusieurs ennemis cachés, et ce doute constant augmente la tension et la méfiance entre les joueurs."
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
            poolSize: "Mots disponibles",
            addWord: "Ajouter un mot",
            noWordsAdded: "Aucun mot ajouté",
            ideasButton: "Idées de thèmes",
            ideas: {
                title: "Idées de Thèmes",
                playerNames: {
                    title: "Noms des Joueurs",
                    desc: "Utilisez les noms des joueurs ! Le mot secret sera l'un d'entre vous. Pourrez-vous vous décrire sans dire le nom ?"
                },
                themeMix: {
                    title: "Mélange de Thèmes",
                    desc: "Combinez des mots de différentes catégories : sports, animaux, films... Tout mélangé pour plus de difficulté !"
                },
                knownPeople: {
                    title: "Personnes Connues",
                    desc: "Amis communs, famille, professeurs, collègues... Des personnes hors du jeu que tout le monde connaît !"
                },
                beCreative: {
                    title: "Soyez Créatifs !",
                    desc: "Blagues internes, lieux préférés, souvenirs, mots inventés... Pas de limites ! Pensez à quelque chose d'amusant et unique pour votre groupe."
                }
            }
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
            seeResults: "Voir Résultats",
            nextRound: "Tour Suivant"
        },
        victory: {
            impostorsWin: "LES IMPOSTEURS\nGAGNENT",
            civiliansWin: "LES CIVILS\nGAGNENT",
            reasonImpostor: "Les imposteurs sont majoritaires !",
            reasonImpostorGuess: "Les imposteurs ont deviné le mot !",
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
            step4Desc: "Les civils gagnent s'ils éliminent tous les imposteurs. Les imposteurs gagnent s'ils égalent ou dépassent en nombre les civils, ou s'ils devinent le mot."
        },
        appGuide: {
            title: "Guide de l'App",
            step1Title: "1. Ajoutez des Joueurs",
            step1Desc: "Tapez les noms des participants. Il en faut au moins 3. Vous pouvez les réorganiser en les faisant glisser !",
            step2Title: "2. Configuration",
            step2Desc: "Choisissez le nombre d'imposteurs. Utilisez le mode 'Fixe' pour un compte exact, ou 'Probabilité' pour plus de mystère.",
            step3Title: "3. Thèmes",
            step3Desc: "Sélectionnez une catégorie. Chaque thème contient des centaines de mots secrets !",
            step4Title: "4. La Révélation",
            step4Desc: "Suivez les instructions. Passez le téléphone au joueur indiqué et maintenez la carte pour voir votre rôle.",
            step5Title: "5. Jeu en Cours",
            step5Desc: "L'app vous dit qui commence et dans quelle direction. Ne vous perdez pas !",
            step6Title: "6. Sélection",
            step6Desc: "Au moment de voter, touchez simplement le nom du joueur que vous souhaitez éliminer.",
            finish: "Compris !"
        }
    },
    de: {
        common: {
            back: "Zurück",
            confirm: "Bestätigen",
            next: "Weiter",
            loading: "Laden...",
            ready: "Bereit?",
            passPhoneFirst: "Drücke den 'Spiel Starten' Knopf und gib das Handy dem ersten Spieler."
        },
        home: {
            title: "Der Impostor",
            subtitle: "Finde heraus, wer das Wort nicht kennt",
            play: "Spielen",
            howToPlay: "Spielanleitung",
            appGuideButton: "App-Handbuch"
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
            modeProb: "Wahrsch.",
            count: "Anzahl",
            mode: "Modus",
            prob: "Wahrsch.",
            continue: "Weiter",
            modeExplained: "Wie funktionieren die Modi?",
            modeProbLimit: "Der Wahrscheinlichkeitsmodus benötigt mindestens 4 Spieler.",
            helpFixedTitle: "Fester Modus",
            helpFixedDesc: "Keine Überraschungen! Die Anzahl der Verräter entspricht genau deiner Auswahl. Wenn du 1 Verräter einstellst, gibt es 1. Wenn du 2 einstellst, gibt es 2.\n\nDies ist der ideale Modus für ausgeglichene Spiele, in denen jeder weiß, gegen wie viele Feinde er antritt.",
            helpProbTitle: "Wahrscheinlichkeitsmodus",
            helpProbDesc: "Pura incertidumbre!\n\nIn diesem Modus gibt es immer mindestens einen Verräter, aber es besteht die Möglichkeit, dass weitere hinzukommen.\n\nVor Beginn des Spiels legen Sie die maximal mögliche Anzahl zusätzlicher Verräter und die Wahrscheinlichkeit ihres Erscheinens fest.\n\nWenn das Glück auf Ihrer Seite ist, hat das Spiel die Anzahl der Verräter, die Sie festgelegt haben. Wenn nicht, geht es mit nur 1 weiter.\n\nNiemand weiß genau, ob ein oder mehrere Feinde lauern, und dieser ständige Zweifel erhöht die Spannung und das Misstrauen zwischen den Spielern."
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
            poolSize: "Wortanzahl",
            addWord: "Wort hinzufügen",
            noWordsAdded: "Keine Wörter hinzugefügt",
            ideasButton: "Themen-Ideen",
            ideas: {
                title: "Themen-Ideen",
                playerNames: {
                    title: "Spielernamen",
                    desc: "Verwendet die Namen der Spieler! Das geheime Wort wird einer von euch sein. Könnt ihr euch beschreiben, ohne den Namen zu sagen?"
                },
                themeMix: {
                    title: "Themen-Mix",
                    desc: "Mische Wörter aus verschiedenen Kategorien: Sport, Tiere, Filme... Alles durcheinander für mehr Schwierigkeit!"
                },
                knownPeople: {
                    title: "Bekannte Personen",
                    desc: "Gemeinsame Freunde, Familie, Lehrer, Kollegen... Personen außerhalb des Spiels, die alle kennen!"
                },
                beCreative: {
                    title: "Seid Kreativ!",
                    desc: "Insider-Witze, Lieblingsorte, Erinnerungen, erfundene Wörter... Keine Grenzen! Denkt an etwas Lustiges und Einzigartiges für eure Gruppe."
                }
            }
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
            seeResults: "Ergebnisse",
            nextRound: "Nächste Runde"
        },
        victory: {
            impostorsWin: "VERRÄTER\nGEWINNEN",
            civiliansWin: "ZIVILISTEN\nGEWINNEN",
            reasonImpostor: "Die Verräter sind in der Überzahl!",
            reasonImpostorGuess: "Die Verräter haben das Wort erraten!",
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
            step4Desc: "Die Zivilisten gewinnen, wenn sie alle Verräter eliminieren. Die Verräter gewinnen, wenn sie gleich viele oder mehr Zivilisten sind oder wenn sie das Wort erraten."
        },
        appGuide: {
            title: "App-Handbuch",
            step1Title: "1. Spieler hinzufügen",
            step1Desc: "Gib die Namen der Teilnehmer ein. Du brauchst mindestens 3. Du kannst sie per Drag & Drop neu anordnen!",
            step2Title: "2. Konfiguration",
            step2Desc: "Wähle die Anzahl der Verräter. Nutze 'Fest' für eine genaue Anzahl oder 'Wahrscheinlichkeit' für mehr Rätselspaß.",
            step3Title: "3. Themen",
            step3Desc: "Wähle eine Kategorie. Jedes Thema hat Hunderte von Geheimwörtern!",
            step4Title: "4. Die Enthüllung",
            step4Desc: "Folge den Anweisungen. Gib das Handy weiter und halte die Karte gedrückt, um deine Rolle zu sehen.",
            step5Title: "5. Spielverlauf",
            step5Desc: "Die App sagt dir, wer anfängt und in welche Richtung es geht. Nicht den Faden verlieren!",
            step6Title: "6. Auswahl",
            step6Desc: "Wenn es Zeit zum Abstimmen ist, tippe einfach auf den Namen des Spielers, den du eliminieren willst.",
            finish: "Verstanden!"
        }
    },
    it: {
        common: {
            back: "Indietro",
            confirm: "Conferma",
            next: "Avanti",
            loading: "Caricamento...",
            ready: "Pronto?",
            passPhoneFirst: "Premi il pulsante 'Inizia Gioco' e passa il telefono al primo giocatore."
        },
        home: {
            title: "L'Impostore",
            subtitle: "Trova chi non conosce la parola",
            play: "Gioca",
            howToPlay: "Come Giocare",
            appGuideButton: "Guida all'App"
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
            mode: "Modalità",
            prob: "Probabilità",
            continue: "Continua",
            modeExplained: "Come funzionano le modalità?",
            modeProbLimit: "La modalità Probabilità richiede almeno 4 giocatori.",
            helpFixedTitle: "Modalità Fissa",
            helpFixedDesc: "Nessuna sorpresa! Il numero di impostori sarà esattamente quello scelto da te. Se imposti 1 impostore, ce ne sarà 1. Se ne imposti 2, ce ne saranno 2.\n\nQuesta è la modalità ideale per partite equilibrate in cui tutti sanno quanti nemici stanno affrontando.",
            helpProbTitle: "Modalità Probabilità",
            helpProbDesc: "Pura incertezza!\n\nIn questa modalità ci sarà sempre almeno un impostore, ma c'è la possibilità che ne appaiano altri.\n\nPrima di iniziare la partita, si definisce il numero massimo possibile di impostori aggiuntivi e la probabilità che appaiano.\n\nSe la fortuna è dalla tua parte, la partita avrà la quantità di impostori definita. Altrimenti, continuerà con solo 1.\n\nNessuno sa con certezza se ci saranno uno o più nemici nascosti, e questo dubbio costante aumenta la tensione e la sfiducia tra i giocatori."
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
            poolSize: "Numero parole",
            addWord: "Aggiungi parola",
            noWordsAdded: "Nessuna parola aggiunta",
            ideasButton: "Idee per temi",
            ideas: {
                title: "Idee per Temi",
                playerNames: {
                    title: "Nomi dei Giocatori",
                    desc: "Usa i nomi dei giocatori! La parola segreta sarà uno di voi. Riuscirete a descrivervi senza dire il nome?"
                },
                themeMix: {
                    title: "Mix di Temi",
                    desc: "Mescola parole di diverse categorie: sport, animali, film... Tutto mescolato per maggiore difficoltà!"
                },
                knownPeople: {
                    title: "Persone Conosciute",
                    desc: "Amici in comune, familiari, professori, colleghi... Persone fuori dal gioco che tutti conoscono!"
                },
                beCreative: {
                    title: "Siate Creativi!",
                    desc: "Battute interne, luoghi preferiti, ricordi, parole inventate... Nessun limite! Pensate a qualcosa di divertente e unico per il vostro gruppo."
                }
            }
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
            passPhone: "Passa il telefono a este giocatore",
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
            title: "Who is the Impostor?",
            subtitle: "Discuss and select the player to eliminate",
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
            seeResults: "Risultati",
            nextRound: "Prossimo Round"
        },
        victory: {
            impostorsWin: "VINCONO GLI\nIMPOSTORI",
            civiliansWin: "VINCONO I\nCIVILI",
            reasonImpostor: "Gli impostori sono in maggioranza!",
            reasonImpostorGuess: "Gli impostori hanno indovinato la parola!",
            reasonCivilian: "Tutti gli impostori eliminati!",
            secretWordWas: "LA PALABRA ERA",
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
            step4Desc: "I civili vincono se eliminano tutti gli impostori. Gli impostori vincono se eguagliano o superano in numero i civili, o se indovinano la parola."
        },
        appGuide: {
            title: "Guida all'App",
            step1Title: "1. Aggiungi Giocatori",
            step1Desc: "Inserisci i nomi dei partecipanti. Ne servono almeno 3. Puoi riordinarli trascinandoli!",
            step2Title: "2. Configurazione",
            step2Desc: "Scegli quanti impostori vuoi. Usa 'Fisso' per un numero esatto, o 'Probabilità' per più mistero.",
            step3Title: "3. Temi",
            step3Desc: "Seleziona una categoria. Ogni tema ha centinaia di parole segrete!",
            step4Title: "4. La Rivelazione",
            step4Desc: "Segui le istruzioni. Passa il telefono al giocatore indicato e tieni premuta la carta per vedere il tuo ruolo.",
            step5Title: "5. In Gioco",
            step5Desc: "L'app ti dirà chi inizia e in che direzione. Non perderti!",
            step6Title: "6. Selezione",
            step6Desc: "Quando è il momento di votare, tocca semplicemente il nome del giocatore che vuoi eliminare.",
            finish: "Capito!"
        }
    }
};

export const useI18n = () => {
    const { language } = useSettingsStore();
    return TRANSLATIONS[language];
};
