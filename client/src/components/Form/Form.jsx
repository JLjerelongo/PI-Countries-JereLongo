//Hooks
import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect, useState } from "react";
import axios from 'axios';
//Components
import validations from './validations';
import SelectCountries from "./SelectCountries/SelectCountries";
import { myContext } from "./SelectCountries/Contexto";
//Actions
import { getAllActivities, getCountries } from "../../redux/actions";
//CSS
import './CSS/Form.css';

const Form = ({ modal, closeModal }) => {

    if (!modal) return null;

    const { countriesId, setCountriesId } = useContext(myContext);

    //!Estado Global
    const allCountries = useSelector(state => state.allCountries);
    const countriesName = useSelector(state => state.countriesName);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCountries());
    }, [])


    const [activity, setActivity] = useState({
        name: '',
        myDificulty: '',
        season: '',
    });

    const [errors, setErrors] = useState({
        name: '',
        dificulty: '',
        season: '',
        countries: ''
    })

    const [openSelect, setOpenSelect] = useState(false);

    const handleChange = (event) => {
        setActivity({
            ...activity,
            [event.target.name]: event.target.value
        }),
            setErrors(validations({
                ...activity,
                [event.target.name]: event.target.value
            }))
    }

    const URL = 'http://localhost:3001/activities';

    const activityCreated = async () => {
        try {

            const { name, myDificulty, season } = activity;

            const dificulty = Number(myDificulty);

            const { data } = await axios.post(URL, {
                name,
                dificulty,
                season,
                countriesId
            })

            if (data.status) {
                dispatch(getAllActivities());
                setCountriesId([]);
                closeModal();
            }
            else window.alert(data.data.message);

        } catch (error) {
            throw Error(error.message);
        }
    }

    const activityCanceled = () => {
        setCountriesId([]);
        closeModal();
    }

    return (
        <>
            <div className="backgroundModal">

                <div className="containerForm">
                    <div className="labelAndEvent">
                        <label className="activityName" htmlFor="name">Activity name:</label>
                        <input
                            className="inputsActivities"
                            type="text"
                            name="name"
                            onChange={handleChange} />

                        {errors.name ? <p className="errors">{errors.name}</p> : null}
                    </div>

                    <div className="labelAndEvent">
                        <label className="dificulty" htmlFor="myDificulty">Dificulty:</label>
                        <select
                            className="inputsActivities"
                            type="text"
                            name="myDificulty"
                            onChange={handleChange}
                        >
                            <option value="">Select</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>

                    <div className="selectContainer">
                        <SelectCountries
                            openSelect={openSelect}
                            setOpenSelect={setOpenSelect}
                            allCountries={allCountries}
                        />
                        {!countriesId.length ? <p className="errorsCountries">{errors.countries = 'You cannot create an activity without a country!'}</p> : null}

                        {countriesId && (
                            <div className="countriesNameContainer">
                                {countriesId.map((countryId) => {
                                    let countryName = countriesName.find(country => country.id === countryId);
                                    return (
                                        <div key={countryName.id}>
                                            <p className="countriesName">{countryName.name}</p>
                                            <hr className="hr3" />
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>


                    <div className="labelAndEvent">
                        <label className="season" htmlFor="season">Season:</label>
                        <select
                            className="inputsActivities"
                            name="season"
                            onChange={handleChange}
                        >
                            <option value="">Select</option>
                            <option value="summer">Summer</option>
                            <option value="winter">Winter</option>
                            <option value="autumn">Autumn</option>
                            <option value="spring">Spring</option>
                        </select>

                        {errors.season ? <p className="errors">{errors.season}</p> : null}
                    </div>

                    <div className="buttonsContain">
                        <button className="botonCancelar" onClick={activityCanceled}>Cancel</button>
                        <button
                            className="botonCreateForm"
                            onClick={activityCreated}
                            disabled={
                                errors.name ||
                                errors.dificulty ||
                                !countriesId.length ||
                                activity.myDificulty.length === 0 ||
                                errors.season
                            }>
                            Create Activity
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Form;