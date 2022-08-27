import { configureStore } from '@reduxjs/toolkit';
import {
    SELECT_HERO,
    SET_CURRENT_TEAM,
    RESET_HEROES,
    RESET_TEAMS,
    SHUFFLE_HEROES,
    SHUFFLE_TEAMS,
    LOAD_SAVED_STATE,
    TOGGLE_DRAFT
} from './actions';

export const preloadedState = {
    draftDirection: "forward",
    draftUnderway: false,
    teams: [
        {
            order: 1,
            name: "Justice League",
            members: []
        },
        {
            order: 2,
            name: "Legion of Doom",
            members: []
        },
        {
            order: 3,
            name: "The Light",
            members: []
        },
        {
            order: 4,
            name: "Justice Society",
            members: []
        },
        {
            order: 5,
            name: "Outsiders",
            members: []
        },
        {
            order: 6,
            name: "Suicide Squad",
            members: []
        },
        {
            order: 7,
            name: "League of Shadows",
            members: []
        },
        {
            order: 8,
            name: "Super Friends",
            members: []
        }
    ],
    availableHeroes: [
        {
            name: "Batman",
            rank: 1
        },
        {
            name: "Wonder Woman",
            rank: 2
        },
        {
            name: "Flash",
            rank: 3
        },
        {
            name: "Green Lantern (John Stewart)",
            rank: 4
        },
        {
            name: "Superman",
            rank: 5
        },
        {
            name: "Vandal Savage",
            rank: 6
        },
        {
            name: "Aquaman",
            rank: 7
        },
        {
            name: "Hawkgirl",
            rank: 8
        },
        {
            name: "Lex Luthor",
            rank: 9
        },
        {
            name: "Harley Quinn",
            rank: 10
        },
        {
            name: "Phantom Stranger",
            rank: 11
        },
        {
            name: "Red Claw",
            rank: 12
        },
        {
            name: "Joker",
            rank: 13
        },
        {
            name: "Poison Ivy",
            rank: 14
        },
        {
            name: "Mr. Freeze",
            rank: 15
        },
        {
            name: "Nightwing",
            rank: 16
        },
        {
            name: "Orion",
            rank: 17
        },
        {
            name: "The Spectre",
            rank: 18
        },
        {
            name: "Doctor Fate",
            rank: 19
        },
        {
            name: "Green Arrow",
            rank: 20
        },
        {
            name: "Bizarro",
            rank: 21
        },
        {
            name: "Sinestro",
            rank: 22
        },
        {
            name: "Star Girl",
            rank: 23
        },
        {
            name: "Metallo",
            rank: 24
        },
        {
            name: "Supergirl",
            rank: 25
        },
        {
            name: "Lady Shiva",
            rank: 26
        },
        {
            name: "Katana",
            rank: 27
        },
        {
            name: "Green Lantern (Hal Jordan)",
            rank: 28
        },
        {
            name: "J'onn J'onzz",
            rank: 29
        },
        {
            name: "Robin",
            rank: 30
        },
        {
            name: "Catwoman",
            rank: 31
        },
        {
            name: "Blue Beetle",
            rank: 32
        },
        {
            name: "Zatanna",
            rank: 33
        },
        {
            name: "Sportsmaster",
            rank: 34
        },
        {
            name: "Ra's al Ghul",
            rank: 35
        },
        {
            name: "Klarion",
            rank: 36
        },
        {
            name: "Mxyzptlk",
            rank: 37
        },
        {
            name: "Bat-Mite",
            rank: 38
        },
        {
            name: "Superboy",
            rank: 39
        },
        {
            name: "Grodd",
            rank: 40
        },
        {
            name: "Darkseid",
            rank: 41
        },
        {
            name: "Infinity Man",
            rank: 42
        },
        {
            name: "Razer",
            rank: 43
        },
        {
            name: "Metron",
            rank: 44
        },
        {
            name: "Granny Goodness",
            rank: 45
        },
        {
            name: "Mister Miracle",
            rank: 46
        },
        {
            name: "Barda",
            rank: 47
        },
        {
            name: "Kalibak",
            rank: 48
        },
        {
            name: "Brainiac",
            rank: 49
        },
        {
            name: "Zodd",
            rank: 50
        },
        {
            name: "Emerald Empress",
            rank: 51
        },
        {
            name: "Lightray",
            rank: 52
        },
        {
            name: "Black Canary",
            rank: 53
        },
        {
            name: "Solomon Grundy",
            rank: 54
        },
        {
            name: "Amazo",
            rank: 55
        },
        {
            name: "Black Adam",
            rank: 56
        },
        {
            name: "Captain Marvel",
            rank: 57
        },
        {
            name: "Mary Marvel",
            rank: 58
        },
        {
            name: "Clayface",
            rank: 59
        },
        {
            name: "Riddler",
            rank: 60
        },
        {
            name: "Black Manta",
            rank: 61
        },
        {
            name: "Bruno Mannheim",
            rank: 62
        },
        {
            name: "Count Vertigo",
            rank: 63
        },
        {
            name: "Red Tornado",
            rank: 64
        }
    ],
    currentTeam: null,
    lastTeam: null
}

const reducer = (state, action) => {
    let newHeroes, newTeams;
    switch(action.type) {
        case RESET_HEROES:
            //Clear out the members from each team
            newTeams = state.teams.map(t => {
                return {
                    order: t.order,
                    name: t.name,
                    members: []
                }
            });
            newHeroes = preloadedState.availableHeroes;
            return {
                teams: newTeams,
                availableHeroes: newHeroes,
                currentTeam: null
            };
        case RESET_TEAMS:
            return preloadedState;
        case SET_CURRENT_TEAM:
            return {
                ...state,
                currentTeam: action.currentTeam
            }
        case SELECT_HERO:
            const remainingHeroes = state.availableHeroes.filter(h => h.name !== action.selectedHero.name);
            const updatedCurrent = { ...state.currentTeam };
            updatedCurrent.members.push(action.selectedHero);
            const updatedTeams = [...state.teams];
            for(let i = 0; i < updatedTeams.length; i++) {
                if(updatedTeams[i].name === updatedCurrent.name) {
                    updatedTeams[i] = updatedCurrent;
                    break;
                }
            }
            return {
                teams: updatedTeams,
                availableHeroes: remainingHeroes,
                currentTeam: updatedCurrent
            }
        case SHUFFLE_HEROES:
            return {
                ...action.updatedState
            }
        case SHUFFLE_TEAMS:
            console.log("Trying to shuffle teams");
            
            return {
                ...action.updatedState
            }
        case LOAD_SAVED_STATE:
            return {
                ...action.savedState
            }
        case TOGGLE_DRAFT:
            console.log("Toggling Draft");
            const newStatus = !state.draftUnderway;
            let newCurrent
            if(!state.currentTeam) {
                newCurrent = { ...state.teams[0] };
            } else {
                newCurrent = { ...state.currentTeam };
            }
            console.log("The current tema is ")
            console.log(newCurrent);
            return {
                ...state,
                currentTeam: newCurrent,
                draftUnderway: newStatus
            }
        default:
            return state;
    }
}

const store = configureStore({ reducer, preloadedState });

export default store;