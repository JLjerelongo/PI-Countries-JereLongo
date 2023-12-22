import './CSS/Card.css';
import {Link} from 'react-router-dom';

const Card = ({id, name, image, continent, capital, population, subregion, area}) => {

    return(
        <>
            <div className='card'>
                    
                <h2 className='countryName'>{name}</h2>
                <p className='continent'>{continent}</p>
                <p>{capital}</p>
                <p>{population}</p>
                <p>{subregion}</p>
                <p>{area}</p>
                <Link to={`/detail/${id}`}>
                <img src={image} alt={name} />
                    </Link>
            </div>
        </>
    )
}

export default Card;