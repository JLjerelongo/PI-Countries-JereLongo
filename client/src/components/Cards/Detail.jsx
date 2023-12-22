//Hooks
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
//CSS
import './CSS/Detail.css';
import detailVideo from '../../assets/Detail/detailVideo.mp4';

const Detail = () => {

    const { id } = useParams();

    const [country, setCountry] = useState({});

    useEffect(() => {
        const getDetail = async () => {
            try {
                const { data } = await axios(`http://localhost:3001/countries/${id}`);

                if (data) setCountry(data);

            } catch (error) {
                throw Error(error.message);
            }
        }
        getDetail();

    }, [id])

    return (
        <>
            <div>

                <video autoPlay loop muted className='detailVideo'>
                    <source src={detailVideo} type='video/mp4' />
                </video>

                {
                    country ? (
                        <div >
                            <div className='flagContainer'>
                                <img src={country.image} alt={country.name} />
                            </div>

                            <div className='info'>
                                <h3>Name: {country.name}</h3>
                                <h3>Country Code: {country.id} </h3>
                                <h3>Continent: {country.continent}</h3>
                                <h3>Capital: {country.capital}</h3>
                                <h3>Population: {country.population}</h3>
                                <h3>SubRegion: {country.subregion}</h3>
                                <h3>Area: {country.area}</h3>
                            </div>

                            <div className='activity'>
                                {country.Activities?.length > 0 ? (
                                    <h2>
                                        {country.Activities.map((activity) => (
                                            <div key={activity.id}>
                                                <h3>Activity: {activity.name}</h3>
                                                <h3>Dificulty: {activity.dificulty}</h3>
                                                <h3>Season: {activity.season}</h3>
                                                <hr className='hr2' />
                                            </div>
                                        ))}
                                    </h2>
                                ) : (
                                    <p className='notActivity'>This country does not have an activity yet!</p>
                                )}
                            </div>
                        </div>
                    ) : (
                        'This country does not have an activity yet!'
                    )
                }
                <Link to='/home'>
                    <button className='botonBack'>◀ Back</button>
                </Link>
            </div>
        </>
    );
};

export default Detail;