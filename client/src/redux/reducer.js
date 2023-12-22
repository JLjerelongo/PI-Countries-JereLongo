import {
    DELETE_ACTIVITIES,
    GET_ACTIVITIES,
    GET_COUNTRIES,
    ORDER,
    FILTER_CONTINENT,
    SEARCH_COUNTRY,
    NEXT,
    REFRESHCOUNTRIES,
    PREV,
    FILTER_ACTIVITY,
    PAGENUMBER
} from "./action-types";

const initialState = {
    allCountries: [],
    countries: [],
    countriesName: [],
    activities: [],
    resetCountries: [],
    numPage: 1
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COUNTRIES:
            return {
                ...state,
                allCountries: action.payload,
                countries: action.payload,
                reset: action.payload,
                countriesName: action.payload
            };

        case GET_ACTIVITIES:
            return {
                ...state,
                activities: action.payload
            };

        case DELETE_ACTIVITIES:
            return {
                ...state,
                activities: action.payload
            };

        case ORDER:
            const countriesOrdered = () => {
                if (action.payload === 'Ascendente') return [...state.countries].sort((a, b) => a.name.localeCompare(b.name));
                if (action.payload === 'Descendente') return [...state.countries].sort((a, b) => b.name.localeCompare(a.name));
                if (action.payload === 'PopulationA') return [...state.countries].sort((a, b) => b.population - a.population);
                if (action.payload === 'PopulationD') return [...state.countries].sort((a, b) => a.population - b.population);
            }
            return {
                ...state,
                countries: countriesOrdered(),
                numPage: 1
            };

        case FILTER_CONTINENT:
            const countriesFiltered = () => {
                if (action.payload === 'africa') return [...state.allCountries].filter((country) => country.continent.toLowerCase() === action.payload);
                if (action.payload === 'asia') return [...state.allCountries].filter((country) => country.continent.toLowerCase() === action.payload);
                if (action.payload === 'europe') return [...state.allCountries].filter((country) => country.continent.toLowerCase() === action.payload);
                if (action.payload === 'oceania') return [...state.allCountries].filter((country) => country.continent.toLowerCase() === action.payload);
                if (action.payload === 'south america') return [...state.allCountries].filter((country) => country.continent.toLowerCase() === action.payload);
                if (action.payload === 'north america') return [...state.allCountries].filter((country) => country.continent.toLowerCase() === action.payload);
                if (action.payload === 'antarctica') return [...state.allCountries].filter((country) => country.continent.toLowerCase() === action.payload);
            };

            return {
                ...state,
                countries: countriesFiltered(),
                numPage: 1
            };

        case FILTER_ACTIVITY:

            // Filtrar directamente sobre los países originales
            const filteredCountries = [...state.allCountries].filter((country) => {

                for (const activity of country.Activities) {

                    if (activity.name !== undefined && activity.name === action.payload) {
                        return activity.name;
                    }
                }
            });

            return {
                ...state,
                countries: filteredCountries,
                numPage: 1,
            };


        case SEARCH_COUNTRY:
            return {
                ...state,
                countries: action.payload,
                numPage: 1
            }

        case NEXT:
            return {
                ...state,
                numPage: state.numPage + 1
            }

        case PREV:
            return {
                ...state,
                numPage: state.numPage - 1
            }

        case PAGENUMBER:
            return{
                ...state,
                numPage: action.payload
            }

        case REFRESHCOUNTRIES:
            return {
                ...state,
                countries: [...state.allCountries],
                allCountries: [...state.allCountries],
                numPage: 1
            }

        default:
            return { ...state };
    }
}

export default reducer;