//CSS
import './CSS/Home.css';
import homeVideo from '../../assets/Home/homeVideo.mp4';
//Hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
//Actions
import { getCountries } from "../../redux/actions";
//Components
import Card from "../Cards/Card";
import Navigation from '../Navigation/Navigation';
import Pagination from './Pagination';

const Home = () => {
    const allCountries = useSelector(state => state.countries);
    const actualPage = useSelector(state => state.numPage);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCountries());
    }, [])

    //Paginado
    const countriesPerPage = 10;
    //Índice inicial y final
    const lastCountry = actualPage * countriesPerPage;
    const firstCountry = lastCountry - countriesPerPage;
    const actualCountries = allCountries?.slice(firstCountry, lastCountry);
    const totalPages = Math.ceil(allCountries.length / countriesPerPage);

    return (
        <div>
            <div className="home-container">

                <video autoPlay loop muted className='homeVideo'>
                    <source src={homeVideo} type='video/mp4' />
                </video>

                <h1 className='welcome'>Bienvenido!</h1>
                <p className='text'>Podes explorar cualquier país tocando en su bandera.</p>
                <p className='text2'>Tambien podes crear actividades para cada país!</p>

                <Navigation className='navBar' />


                <Link to='/activities'>
                    <button className="botonActivity">Create Activity🏂🏻</button>
                </Link>
                <div className="cardsContainer">
                    {actualCountries?.map((country) => (
                        <Card
                        className='oneCard'
                        key={country.id}
                        id={country.id}
                        name={country.name}
                        continent={country.continent}
                        image={country.image}
                        />
                        ))}
                </div>
                <div className='filter2'></div>
                <Pagination lastCountry={lastCountry} actualPage={actualPage} totalPages={totalPages}/>
            </div>
        </div>
    );
}

export default Home;