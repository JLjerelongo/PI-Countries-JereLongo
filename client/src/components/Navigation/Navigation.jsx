//Components
import SearchBar from "./SearchBar";
//Hooks
import { useState } from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
//Actions
import { filterCountriesByActivity, filterCountriesByContinent, orderCountries, resetCountries } from "../../redux/actions";
//CSS
import './CSS/Navigation.css';

const Navigation = () => {

    const allActivities = useSelector(state => state.activities);

    const [aux, setAux] = useState(false);
    const dispatch = useDispatch();

    const handleOrder = (event) => {
        dispatch(orderCountries(event.target.value));
        setAux(true);
    }

    const handleFilterContinent = (event) => {
        dispatch(filterCountriesByContinent(event.target.value));
        setAux(true);
    }

    const handleFilterActivity = (event) => {
        dispatch(filterCountriesByActivity(event.target.value));
        setAux(true);
    }

    const refresh = () => {
            dispatch(resetCountries());
    }

    return (
        <nav>
            <SearchBar className='searchBar' />

            <Link to='/activities'>
                <button className="botonActivity">Create new Activity!</button>
            </Link>

            <select className="filter" onChange={handleFilterContinent}>
                <option value=''>Filter:</option>
                <optgroup label="Continents:">
                    <option value="africa">Africa</option>
                    <option value="asia">Asia</option>
                    <option value="europe">Europe</option>
                    <option value="oceania">Oceania</option>
                    <option value="south america">South America</option>
                    <option value="north america">North America</option>
                    <option value="antarctica">Antarctica</option>
                </optgroup>
            </select>

            <select className="filterActivities" onChange={handleFilterActivity}>
                <option value='activities'>Activities</option>

                    {allActivities?.map((activity) => {
                        return(
                        <option value={activity.name} key={activity.id}>
                            {activity.name}
                        </option>

                        )

                    })}
            </select>

            <select className="order" onChange={handleOrder}>Order
                <option value=''>Order:</option>
                <option value="Ascendente">A - Z</option>
                <option value="Descendente">Z - A</option>
                <option value="PopulationA">Population+</option>
                <option value="PopulationD">Population-</option>
            </select>

            <Link to='/home'>
                <button className="botonRefresh" onClick={refresh}>Refresh🔁</button>
            </Link>

        </nav>
    )
}

export default Navigation;