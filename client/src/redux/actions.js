import {GET_COUNTRIES,
    GET_ACTIVITIES,
    DELETE_ACTIVITIES,
    FILTER_CONTINENT,
    ORDER,
    SEARCH_COUNTRY,
    NEXT,
    PREV,
    REFRESHCOUNTRIES,
    FILTER_ACTIVITY,
    PAGENUMBER}from './action-types';

import axios from 'axios';

const URL_COUNTRIES = 'http://localhost:3001/countries';

export const getCountries = () => {
    return async(dispatch) => {
        try {
            const {data} = await axios.get(URL_COUNTRIES);
            return dispatch({
                type: GET_COUNTRIES,
                payload: data
            })
            
        } catch (error) {
            throw Error(error.message);
        }
    }
}

const URL_GET_ACTIVITIES = 'http://localhost:3001/activities';

export const getAllActivities = () => {
    return async(dispatch) => {
        try {
            const {data} = await axios.get(URL_GET_ACTIVITIES);
            if(data.status){
                return dispatch({
                    type: GET_ACTIVITIES,
                    payload: data.allActivities
                })
            }           

        } catch (error) {
            throw Error(error.message);
        }
    }
}

export const deleteActivities = (id) => {
    return async(dispatch) => {
        try {
            const URL_DELETE_ACTIVITIES = `http://localhost:3001/activities/${id}`;
            const {data} = await axios.delete(URL_DELETE_ACTIVITIES);
            
            if(data.status){
                const dataGet = (await axios.get(URL_GET_ACTIVITIES)).data;
                
                if(dataGet.status){
                    return dispatch({
                        type: DELETE_ACTIVITIES,
                        payload: dataGet.allActivities
                    })
                }
            }

        } catch (error) {
            throw Error(error.message);
        }
    }
}

export const filterCountriesByContinent = (continent) => {
    return{
        type: FILTER_CONTINENT,
        payload: continent
    }
}

export const filterCountriesByActivity = (activity) => {
    return{
        type: FILTER_ACTIVITY,
        payload: activity
    }
}

export const orderCountries = (order) => {
    return{
        type: ORDER,
        payload: order
    }
}

export const searchCountryByName = (name) => {
    return{
        type: SEARCH_COUNTRY,
        payload: name
    }
}

export const next = () => {
    return{
        type: NEXT
    }
}

export const prev = () => {
    return{
        type: PREV
    }
}

export const pageNumber = (i) => {
    return{
        type: PAGENUMBER,
        payload: i
    }
}

export const resetCountries = () => {
    return{
        type: REFRESHCOUNTRIES
    }
}