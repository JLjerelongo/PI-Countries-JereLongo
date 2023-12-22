//Hooks
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
//Actions
import { searchCountryByName } from "../../redux/actions";
//CSS
import './CSS/SearchBar.css';

const SearchBar = () => {

    const allCountries = useSelector(state => state.allCountries);

    const [countryName, setCountryName] = useState('');
    let [countryNotFound, setCountryNotFound] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClickSearch = async (name) => {
        name.toLowerCase();
        try {
            const { data } = await axios(`http://localhost:3001/countries?name=${name}`);

            navigate(`/detail/${data.countryFound.id}`);

            return data;

        } catch (error) {
            throw Error(error.message);
        }
    }

    const searchByCoincidence = (event) => {

        const countrySubString = event.target.value.trim().toLowerCase();
        setCountryName(countrySubString);

        let filteredCountry = [];

        if (countrySubString === "") filteredCountry = allCountries;
        else {
            filteredCountry = allCountries.filter((country) => {
                return country.name.toLowerCase().startsWith(countrySubString);
            })
            if(!filteredCountry.length) setCountryNotFound(true);
            else setCountryNotFound(false);
        }
        dispatch(searchCountryByName(filteredCountry));
    }

    return (
        <div>
            <input
                className="input"
                type="text"
                placeholder="🔍Search a country..."
                onChange={searchByCoincidence}
                value={countryName}
            />
            <button className="botonSearch" onClick={() => handleClickSearch(countryName)}>🔍</button>
            {countryNotFound && <h3 className="countryNotFound">This country does not exist...!</h3>}
        </div>
    )
}

export default SearchBar;